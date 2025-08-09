'use client'
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { money } from "@/lib/format"

type Item = { id:string, slug:string, name:string, priceCents:number, qty:number, subscribe?:boolean, interval?:'monthly'|'quarterly' }

export default function CartPage(){
  const [items,setItems] = useState<Item[]>([])
  useEffect(()=>{
    const load = ()=> setItems(JSON.parse(localStorage.getItem("cart") || "[]"))
    load(); window.addEventListener("cart-updated", load); return ()=> window.removeEventListener("cart-updated", load)
  },[])

  const oneTime = items.filter(i=>!i.subscribe)
  const subs = items.filter(i=>i.subscribe)
  const total = useMemo(()=> oneTime.reduce((s,i)=> s + i.priceCents*i.qty, 0), [items])

  function remove(idx:number){
    const next = items.slice(); next.splice(idx,1); setItems(next); localStorage.setItem("cart", JSON.stringify(next))
  }

  async function checkout(){
    const res = await fetch("/api/checkout",{method:"POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify({ items })})
    const { url, error } = await res.json(); if(error) alert(error); else if(url) window.location.href = url
  }

  if(!items.length) return <p>Your cart is empty.</p>

  return <section>
    <h1>Cart</h1>
    {items.map((i,idx)=> (
      <div key={idx} style={{display:'flex',justifyContent:'space-between',padding:'.4rem 0'}}>
        <div>{i.name} × {i.qty} {i.subscribe ? `• ${i.interval}` : ''}</div>
        <div style={{display:'flex',gap:'.6rem',alignItems:'center'}}>
          <strong>{i.subscribe ? 'Subscription' : money(i.priceCents*i.qty)}</strong>
          <button className="cta" onClick={()=>remove(idx)}>Remove</button>
        </div>
      </div>
    ))}
    <hr/>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <strong>One‑time total</strong><strong>{money(total)}</strong>
    </div>
    <br/>
    <button className="cta" onClick={checkout}>Checkout</button>{" "}
    <Link className="cta" href="/products" style={{background:'#fff',color:'var(--green)'}}>Continue shopping</Link>
  </section>
}

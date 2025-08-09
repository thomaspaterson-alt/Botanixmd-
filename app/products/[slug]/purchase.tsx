'use client'
import { useState } from "react"

export default function Purchase({ id, slug, name, priceCents, canSub }:{ id:string, slug:string, name:string, priceCents:number, canSub:boolean }){
  const [loading,setLoading] = useState(false)
  const [subscribe,setSubscribe] = useState(false)
  const [interval,setInterval] = useState<'monthly'|'quarterly'>('monthly')

  function add(){
    setLoading(true)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    cart.push({ id, slug, name, priceCents, qty: 1, subscribe, interval })
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
    setLoading(false)
  }

  return <div>
    {canSub && <>
      <label className="switch"><input type="checkbox" checked={subscribe} onChange={e=>setSubscribe(e.target.checked)}/> Subscribe & save 15%</label>
      {subscribe && <label className="switch">Interval
        <select value={interval} onChange={e=>setInterval(e.target.value as any)}>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Every 3 Months</option>
        </select>
      </label>}
    </>}
    <button className="cta" onClick={add} disabled={loading}>{loading?'Adding…':'Add to cart'}</button>
  </div>
}

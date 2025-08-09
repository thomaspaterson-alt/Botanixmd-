'use client'
import { useState } from "react"

export default function Account(){
  const [email,setEmail] = useState('')
  async function openPortal(){
    const res = await fetch('/api/portal', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email })})
    const data = await res.json(); if(data.url) window.location.href = data.url; else alert(data.error||'Error')
  }
  return <section className="section">
    <h1>Manage your subscription</h1>
    <p>Enter the email used at checkout to manage your subscription in the secure customer portal.</p>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{padding:'.6rem',border:'1px solid #ddd',borderRadius:'8px'}}/>{" "}
    <button className="cta" onClick={openPortal}>Open portal</button>
  </section>
}

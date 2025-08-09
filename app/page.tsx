import Link from "next/link"
export default function Home(){
  return <section className="hero">
    <div>
      <div className="badges"><span className="badge">Botanical science</span><span className="badge">Full transparency</span></div>
      <h1>Clinically crafted, plant‑powered wellness.</h1>
      <p>CBD + adaptogens for Calm, Sleep, Focus, Recovery — with subscriptions and lab-verified quality.</p>
      <div style={{display:'flex',gap:'1rem',marginTop:'1rem'}}>
        <Link className="cta" href="/products">Shop formulas</Link>
        <Link className="cta" href="/learn" style={{background:'#fff',color:'var(--green)'}}>Learn</Link>
      </div>
    </div>
    <div></div>
  </section>
}

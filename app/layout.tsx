import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "BotanixMD — Clinically Crafted Botanicals",
  description: "Plant-powered formulas backed by science. Subscriptions supported.",
  openGraph: { title: "BotanixMD", description: "Clinically crafted, plant-powered wellness." }
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return <html lang="en"><body>
    <header className="container header">
      <Link href="/" className="brand"><span>BotanixMD</span></Link>
      <nav className="nav">
        <Link href="/products">Shop</Link>
        <Link href="/science">Science</Link>
        <Link href="/learn">Learn</Link>
        <Link href="/about">About</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
    <main className="container">{children}</main>
    <footer className="container footer">
      <div className="badges"><span className="badge">Doctor‑informed</span><span className="badge">Lab‑tested</span><span className="badge">THC‑free</span></div>
      <p>© {new Date().getFullYear()} BotanixMD • <Link href="/privacy">Privacy</Link> • <Link href="/terms">Terms</Link></p>
      <p style={{fontSize:'.8rem'}}>FDA Disclaimer: These statements have not been evaluated by the Food and Drug Administration.</p>
    </footer>
  </body></html>
}

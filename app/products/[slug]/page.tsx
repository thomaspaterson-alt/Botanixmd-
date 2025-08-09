import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { money } from "@/lib/format"
import Purchase from "./purchase"

export default async function ProductPage({ params }: { params: { slug: string } }){
  const p = await prisma.product.findUnique({ where: { slug: params.slug } })
  if(!p) return notFound()
  return <section className="section">
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div>{p.imageUrl && <Image src={p.imageUrl} alt={p.name} width={720} height={480}/>}</div>
      <div>
        <h1>{p.name}</h1>
        <p><strong>Benefit:</strong> {p.benefit}</p>
        <p>{p.description}</p>
        <p className="price">{money(p.priceCents)}</p>
        <Purchase id={p.id} slug={p.slug} name={p.name} priceCents={p.priceCents} canSub={p.subscriptionEligible} />
        <hr/><p style={{fontSize:'.9rem',opacity:.8}}>COA available on request.</p>
      </div>
    </div>
  </section>
}

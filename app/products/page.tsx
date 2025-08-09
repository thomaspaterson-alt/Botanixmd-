import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { money } from "@/lib/format"

export const revalidate = 60

export default async function ProductsPage(){
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } })
  return <section>
    <h1>Shop</h1>
    <div className="grid">
      {products.map(p => (
        <article key={p.id} className="card">
          {p.imageUrl && <Image src={p.imageUrl} alt={p.name} width={600} height={400}/>}
          <h3>{p.name}</h3>
          <p style={{opacity:.8}}>{p.benefit} {p.subscriptionEligible ? "• Subscribe & save 15%" : ""}</p>
          <p className="price">{money(p.priceCents)}</p>
          <Link className="cta" href={`/products/${p.slug}`}>View</Link>
        </article>
      ))}
    </div>
  </section>
}

import Link from "next/link"
import { sanity } from "@/lib/sanity"

export const revalidate = 60

export default async function Learn(){
  const posts = await sanity.fetch(`*[_type=="post"]|order(publishedAt desc)[0...20]{title, "slug": slug.current, excerpt, publishedAt}`)
  return <section className="section">
    <h1>Learn</h1>
    <div className="grid">
      {posts?.map((p:any)=> (
        <article key={p.slug} className="card">
          <h3>{p.title}</h3>
          <p style={{opacity:.8}}>{p.excerpt}</p>
          <Link className="cta" href={`/learn/${p.slug}`}>Read</Link>
        </article>
      )) || <p>No posts yet.</p>}
    </div>
  </section>
}

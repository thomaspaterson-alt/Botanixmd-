import { sanity } from "@/lib/sanity"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function PostPage({ params }: { params: { slug: string } }){
  const post = await sanity.fetch(`*[_type=="post" && slug.current==$slug][0]{title, body}`, { slug: params.slug })
  if(!post) return notFound()
  return <section className="section">
    <h1>{post.title}</h1>
    <div>{Array.isArray(post.body) ? post.body.map((b:any, i:number)=> <p key={i}>{b.children?.map((c:any)=>c.text).join(' ')}</p>) : null}</div>
  </section>
}

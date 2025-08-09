import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { z } from "zod"
import { getSubPriceId } from "@/lib/products"

const Item = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  priceCents: z.number().int().positive(),
  qty: z.number().int().positive(),
  subscribe: z.boolean().optional(),
  interval: z.enum(['monthly','quarterly']).optional()
})

export async function POST(req: NextRequest){
  try{
    const body = await req.json()
    const items = z.array(Item).parse(body.items)

    const hasSub = items.some(i => i.subscribe)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    for(const i of items){
      if(i.subscribe){
        const priceId = getSubPriceId(i.slug, i.interval || 'monthly')
        if(!priceId) throw new Error(`Missing Stripe price for ${i.slug} (${i.interval})`)
        line_items.push({ price: priceId, quantity: i.qty })
      } else {
        line_items.push({
          price_data: { currency: "usd", product_data: { name: i.name }, unit_amount: i.priceCents },
          quantity: i.qty
        })
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: hasSub && line_items.length === items.length ? "subscription" : hasSub ? "subscription" : "payment",
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      line_items
    })

    return NextResponse.json({ url: session.url })
  } catch (e:any) {
    console.error(e)
    return NextResponse.json({ error: e.message || "Checkout error" }, { status: 400 })
  }
}

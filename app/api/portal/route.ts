import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: NextRequest){
  const { email } = await req.json()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })
  const customers = await stripe.customers.list({ email, limit: 1 })
  const customerId = customers.data[0]?.id
  if(!customerId) return NextResponse.json({ error: "No customer found for that email." }, { status: 404 })
  const session = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: `${req.nextUrl.origin}/account` })
  return NextResponse.json({ url: session.url })
}

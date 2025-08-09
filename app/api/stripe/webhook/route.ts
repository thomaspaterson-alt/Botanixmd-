import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest){
  const secret = process.env.STRIPE_WEBHOOK_SECRET!
  const buf = Buffer.from(await req.arrayBuffer())
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })
  let event: Stripe.Event
  try {
    const sig = req.headers.get("stripe-signature")!
    event = stripe.webhooks.constructEvent(buf, sig, secret)
  } catch (err:any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  switch(event.type){
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session
      const email = s.customer_details?.email || "unknown"
      if(s.mode === "subscription" && s.subscription){
        const sub = await stripe.subscriptions.retrieve(s.subscription as string)
        await prisma.subscription.upsert({
          where: { stripeSubId: sub.id },
          update: { status: sub.status, email },
          create: { stripeSubId: sub.id, status: sub.status, email, productSlug: "unknown", interval: (sub.items.data[0]?.plan?.interval || "month") }
        })
      } else {
        await prisma.order.create({ data: { email, totalCents: s.amount_total ?? 0, stripeSession: s.id } })
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      await prisma.subscription.update({ where: { stripeSubId: sub.id }, data: { status: sub.status, canceledAt: new Date() } })
      break;
    }
  }

  return NextResponse.json({ received: true })
}
export const dynamic = "force-dynamic"

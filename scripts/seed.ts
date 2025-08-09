import { prisma } from "../lib/db"

async function main(){
  const count = await prisma.product.count()
  if(count>0){ console.log("Products exist"); process.exit(0) }
  await prisma.product.createMany({ data: [
    { slug:"calm-gummies", name:"Calm Gummies", description:"CBD + ashwagandha for stress support.", benefit:"Calm", priceCents: 3900, imageUrl:"https://images.unsplash.com/photo-1600271886742-f049cd451bba", subscriptionEligible: true },
    { slug:"sleep-tincture", name:"Sleep Tincture", description:"CBD + melatonin + lavender for restful sleep.", benefit:"Sleep", priceCents: 4900, imageUrl:"https://images.unsplash.com/photo-1611078489935-0cb9649c0b9a", subscriptionEligible: true },
    { slug:"focus-capsules", name:"Focus Capsules", description:"CBD + L-theanine + bacopa for clarity.", benefit:"Focus", priceCents: 4200, imageUrl:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", subscriptionEligible: false },
    { slug:"recovery-balm", name:"Recovery Balm", description:"Topical CBD with arnica and menthol.", benefit:"Recovery", priceCents: 3500, imageUrl:"https://images.unsplash.com/photo-1601597111158-2fceffab1b93", subscriptionEligible: false }
  ]})
  console.log("Seeded BotanixMD products.")
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)})

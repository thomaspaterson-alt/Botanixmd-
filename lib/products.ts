// Helper to retrieve subscription price IDs by slug and interval
export function getSubPriceId(slug: string, interval: 'monthly'|'quarterly'){
  const map: Record<string, any> = {
    'sleep-tincture': {
      monthly: process.env.SUB_PRICE_SLEEP_TINCTURE_MONTHLY,
      quarterly: process.env.SUB_PRICE_SLEEP_TINCTURE_QUARTERLY
    },
    'calm-gummies': {
      monthly: process.env.SUB_PRICE_CALM_GUMMIES_MONTHLY,
      quarterly: process.env.SUB_PRICE_CALM_GUMMIES_QUARTERLY
    }
  }
  return map[slug]?.[interval]
}

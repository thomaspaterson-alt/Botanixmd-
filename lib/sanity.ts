import sanityClient from "@sanity/client"

export const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2023-10-01",
  token: process.env.SANITY_READ_TOKEN,
  useCdn: true
})

export const groq = String

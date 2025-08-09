import { createClient } from "@sanity/client"

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || "production"
const apiVersion = process.env.SANITY_API_VERSION || "2023-10-01"
const token = process.env.SANITY_READ_TOKEN

// If SANITY env vars aren’t set, export a no-op client so the site still builds.
export const sanity = projectId
  ? createClient({ projectId, dataset, apiVersion, token, useCdn: true })
  : { fetch: async () => [] as any[] }

export const groq = String

import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"
import { buildProblemUrl } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://peerfix.dev"

  const problems = await prisma.problem.findMany({
    select: { problemNumber: true, slug: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
    take: 1000,
  })

  const problemUrls = problems.map((p) => ({
    url: `${baseUrl}${buildProblemUrl(p.problemNumber, p.slug)}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/problems`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/expert/apply`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...problemUrls,
  ]
}

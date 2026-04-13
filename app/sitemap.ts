import { MetadataRoute } from 'next'
import toolsData from '@/data/tools.json'

interface Tool {
  id: number;
  name: string;
  category: string;
}

const allTools: Tool[] = (toolsData as any).tools || toolsData;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aitoolsdirectory.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Tool detail pages
  const toolPages = allTools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Comparison pages
  const comparisonPages = [
    '/compare/writing-tools',
    '/compare/image-tools',
    '/compare/video-tools',
    '/compare/coding-tools',
    '/compare/audio-tools',
    '/compare/design-tools',
    '/compare/education-tools',
    '/compare/productivity-tools',
    '/compare/research-tools',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...toolPages, ...comparisonPages]
}
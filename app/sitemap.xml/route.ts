'use server'

import { NextResponse } from 'next/server'
import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

export async function GET() {
  // Fetch dynamic routes from Sanity
  const allRoutes = await getDynamicRoutesFromSanity()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map((route) => {
        return `
          <url>
            <loc>${`${process.env.SITE_URL}${route.path}`}</loc>
            <lastmod>${route.lastmod}</lastmod>
            <changefreq>${route.changefreq}</changefreq>
            <priority>${route.priority}</priority>
          </url>
        `
      })
      .join('')}
  </urlset>
`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

function createSitemapUrlEntity(
  lastmod,
  priority,
  path = '/',
  changefreq = 'monthly',
) {
  return {
    path,
    lastmod,
    changefreq,
    priority,
  }
}

async function getDynamicRoutesFromSanity() {
  const data = await client.withConfig({ token }).fetch(groq`
    {
      "pages": *[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "projects": *[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
      "home": *[_type == "home"]{ _updatedAt }
    }
  `)

  const { pages, projects, home } = data

  // Generate static routes based on the fetched data
  const pageRoutes = pages.map((page) =>
    createSitemapUrlEntity(page._updatedAt, '0.7', `/${page.slug}`),
  )
  const projectRoutes = projects.map((project) =>
    createSitemapUrlEntity(project._updatedAt, '0.8', `/cases/${project.slug}`),
  )
  const homeRoute = home.map((home) =>
    createSitemapUrlEntity(home._updatedAt, '1.0'),
  )

  return [...pageRoutes, ...projectRoutes, ...homeRoute]
}

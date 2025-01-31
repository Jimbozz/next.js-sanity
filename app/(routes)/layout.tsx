import '@/styles/index.css'

import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { Suspense } from 'react'

import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage } from '@/sanity/loader/loadQuery'

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

export async function generateMetadata(): Promise<Metadata> {
  const { data: homePage } = await loadHomePage()

  const ogImage = urlForOpenGraphImage(homePage?.metaData?.openGraphImage)

  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Olavstoppen',
        }
      : undefined,
    description: homePage?.metaData?.metaDescription
      ? toPlainText(homePage.metaData.metaDescription)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="mt-40 flex-grow px-4 md:mt-80">
        <Suspense>{children}</Suspense>
      </main>
      {draftMode().isEnabled && <LiveVisualEditing />}
    </>
  )
}

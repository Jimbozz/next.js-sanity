import './globals.css'

import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google'
import Script from 'next/script'
import PlausibleProvider from 'next-plausible'

import { Footer } from '@/components/global/Footer'
import { Header } from '@/components/global/Header'

const serif = IBM_Plex_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = IBM_Plex_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '500', '700'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ''}>
      <html
        lang="en"
        className={`${mono.variable} ${sans.variable} ${serif.variable}`}
      >
        <head>
          <Script
            async
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/plausible.js"
            strategy="afterInteractive"
          />
        </head>
        <body className="bg-ot-background">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </PlausibleProvider>
  )
}

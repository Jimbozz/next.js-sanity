'use client'
import Elevator from 'elevator.js'
import { type PortableTextBlock } from 'next-sanity'
import { useEffect, useRef } from 'react'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer({ data = {} as SettingsPayload }: FooterProps) {
  const {
    footerInfo = [] as PortableTextBlock[],
    footerSocialLinks = [] as PortableTextBlock[],
    footerLinks = [] as PortableTextBlock[],
  } = data

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (buttonRef.current) {
      // Initialize Elevator.js and pass the button element as the trigger
      new Elevator({
        element: buttonRef.current,
        mainAudio: '/audio/elevatormusic.mp3',
        endAudio: '/audio/elevatormusic-end.mp3',
        duration: 5000,
      })
    }
  }, [])

  return (
    <footer className="mt-16 grid w-full grid-cols-2 gap-6 gap-y-10 px-4 pb-4 text-lg font-light md:mt-60 md:grid-cols-9 md:text-2xl lg:grid-cols-12">
      {footerInfo && (
        <address className="col-span-2 flex flex-col gap-1 not-italic md:order-3 md:col-span-3 md:col-start-6 md:justify-end lg:col-span-2 lg:col-start-9 xl:col-start-10">
          <CustomPortableText value={footerInfo} />
        </address>
      )}
      {footerLinks && (
        <nav
          aria-label="Site Links"
          className="col-span-2 flex flex-col justify-end gap-1 md:order-2 md:col-span-3 md:col-start-3 lg:col-span-3 lg:col-start-5 xl:col-span-2 xl:col-start-8"
        >
          <CustomPortableText value={footerLinks} />
        </nav>
      )}
      {footerSocialLinks && (
        <nav
          aria-label="Social Media Links"
          className="col-span-1 flex flex-col justify-end gap-1 md:order-1 md:col-span-2 lg:col-span-2"
        >
          <CustomPortableText value={footerSocialLinks} />
        </nav>
      )}
      <div className="col-span-1 flex items-end justify-end text-4xl md:order-4 md:col-start-9 md:flex lg:col-start-12">
        <button
          className="flex items-center gap-1"
          ref={buttonRef}
          aria-label="Scroll to top"
        >
          &#8593;
        </button>
      </div>
    </footer>
  )
}

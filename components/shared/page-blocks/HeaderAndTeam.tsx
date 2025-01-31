'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

import {
  getSpacingClasses,
  imagePositionFromHotspot,
  urlForImage,
} from '@/sanity/lib/utils'
import type { SpacingSettings } from '@/types'

import { ImageSquircle } from '../image-squircle'

interface TeamMember {
  name: string
  role: string
  email?: string
  phone?: string
  teamMemberImage?: any
}

interface HeaderAndTeamProps {
  header?: string
  teamMembers: TeamMember[]
  spacingSettings?: SpacingSettings
}

const isMobileViewport = () => window.innerWidth <= 768

export function HeaderAndTeam({
  header,
  teamMembers,
  spacingSettings,
}: HeaderAndTeamProps) {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [copiedEmail, setCopiedEmail] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const spacingClasses = getSpacingClasses(spacingSettings)

  const handleMouseEnter = useCallback((index: number) => {
    if (!isMobileViewport()) {
      setHoveredMember(index)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!isMobileViewport()) {
      setHoveredMember(null)
    }
  }, [])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>, index: number) => {
      if (!isMobileViewport()) {
        const rect = (
          event.currentTarget as HTMLDivElement
        ).getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setTooltipPosition({ x, y })
      }
    },
    [],
  )

  const handleEmailClick = useCallback((email: string, index: number) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(index)
      setTimeout(() => {
        setCopiedEmail(null)
      }, 2000)
    })
  }, [])

  return (
    <section className={`grid grid-cols-1 lg:grid-cols-12 ${spacingClasses}`}>
      {header && (
        <h2 className="heading-base mb-4 font-light md:col-span-3">{header}</h2>
      )}
      <div className="grid grid-cols-1 gap-y-9 md:grid-cols-2 md:gap-4 md:gap-y-16 lg:col-span-9 lg:grid-cols-3">
        {teamMembers.map((member, index) => {
          const imageUrl =
            member.teamMemberImage &&
            urlForImage(member.teamMemberImage)?.fit('crop').url()

          if (!imageUrl) {
            return null
          }
          const objectPosition = imagePositionFromHotspot(
            member.teamMemberImage?.hotspot,
          )

          return (
            <figure
              key={index}
              className={`group relative aspect-[30/34] w-full md:aspect-square ${hoveredMember === index ? 'cursor-none' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={(event) => handleMouseMove(event, index)} // Track mouse position
              onClick={() => handleEmailClick(member.email!, index)} // Handle click anywhere on image
            >
              <ImageSquircle className="relative h-full w-full">
                <Image
                  src={imageUrl}
                  alt={member.name}
                  className="layout-fill h-full w-full object-cover"
                  style={{ objectPosition }}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </ImageSquircle>

              {/* Tooltip (only show for the hovered member) */}
              {hoveredMember === index && (
                <div
                  style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    transform: 'translate(-50%, -100%)',
                  }}
                  className="absolute z-10 hidden text-nowrap rounded-full bg-ot-blue px-3 py-[2px] shadow-lg md:block"
                >
                  <span className="text-xl font-light text-white">
                    {copiedEmail === index
                      ? 'EMAIL COPIED!'
                      : `COPY ${member.name.toUpperCase()}'S EMAIL ↗`}
                  </span>
                </div>
              )}
              <figcaption className="card-title mt-2 flex flex-col gap-1 md:mt-5">
                <h3>{member.name}</h3>
                <span className="leading-tight">{member.role}</span>
                <span className="md:hidden">{member.email}</span>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}

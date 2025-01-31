import Image from 'next/image'
import type { Image as SanityImage } from 'sanity'

import {
  getSpacingClasses,
  imagePositionFromHotspot,
  urlForImage,
} from '@/sanity/lib/utils'
import type { SpacingSettings } from '@/types'

import { FigureSquircle } from '../figure-squircle'

type MediaItem =
  | (SanityImage & { alt?: string })
  | {
      _type: 'uploadedVideo'
      videoUrl: string
      alt: string
    }

interface MasonryGridProps {
  media: MediaItem[]
  gridType: string
  spacingSettings?: SpacingSettings
}

export function MasonryGrid({
  media = [] as MediaItem[],
  gridType,
  spacingSettings,
}: MasonryGridProps) {
  if (!media.length) return
  const tailwindClasses = masonaryGridLayout.get(gridType) || []
  const spacingClasses = getSpacingClasses(spacingSettings)
  return (
    <section
      className={`grid h-[90vh] grid-cols-2 gap-6 md:grid-cols-12 md:grid-rows-6 ${spacingClasses}`}
    >
      {media.map((item, index) => (
        <MasonryGridItem
          item={item}
          className={tailwindClasses[index % tailwindClasses.length]}
          key={index}
        />
      ))}
    </section>
  )
}
interface MasonryGridItemProps {
  item: MediaItem
  className: string
  alt?: string
}

function MasonryGridItem({ item, className, alt }: MasonryGridItemProps) {
  if (item._type === 'image') {
    const imageUrl = item && urlForImage(item)?.url()

    if (!imageUrl) {
      return
    }
    const objectPosition =
      'hotspot' in item && item.hotspot
        ? imagePositionFromHotspot(item.hotspot)
        : undefined

    return (
      <FigureSquircle className={`${className} relative h-full w-full`}>
        <Image
          src={imageUrl}
          fill
          sizes="auto"
          style={{ objectPosition }}
          alt={alt || item.alt || ''}
          className="object-cover"
        />
        {item.alt && <figcaption className="sr-only">{item.alt}</figcaption>}
      </FigureSquircle>
    )
  } else if (item._type === 'uploadedVideo') {
    const { alt, videoUrl } = item
    if (!videoUrl) {
      return
    }
    return (
      <FigureSquircle
        className={`${className} relative h-full w-full overflow-hidden`}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          src={videoUrl as string}
          className="h-full w-full object-cover"
          aria-describedby={alt}
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>

        {item.alt && <figcaption className="sr-only">{item.alt}</figcaption>}
      </FigureSquircle>
    )
  }
  return null
}

const masonaryGridLayout = new Map<string, string[]>([
  ['gridOne', ['col-span-12 md:row-span-6']],
  [
    'gridTwo',
    [
      'col-span-2 md:col-span-6 md:row-span-6',
      'col-span-2 md:col-span-6 md:row-span-6',
    ],
  ],
  [
    'gridFour',
    [
      'col-span-2 md:col-span-6 md:row-span-6',
      'col-span-2 md:col-span-6 md:row-span-3',
      'md:col-span-3 md:col-start-7 md:row-span-3',
      'md:col-span-3 md:col-start-10 md:row-span-3',
    ],
  ],
  [
    'gridFive',
    [
      'col-span-2 md:col-span-7 md:row-span-4',
      'col-span-2 md:col-span-5 md:row-span-4',
      'md:col-span-4 md:col-start-1 md:row-span-2',
      'md:col-span-4 md:col-start-5 md:row-span-2',
      'md:col-span-4 md:col-start-9 md:row-span-2',
    ],
  ],
  [
    'gridSix',
    [
      'col-span-2 md:col-span-6 md:row-span-6',
      'col-span-2 md:col-span-3 md:row-span-3',
      'md:col-span-3 md:col-start-10 md:row-span-2',
      'md:col-span-3 md:col-start-7 md:row-span-3',
      'md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-3',
      'md:col-span-3 md:col-start-10 md:row-span-2',
    ],
  ],
  [
    'gridEight',
    [
      'col-span-2 md:col-span-6 md:row-span-3',
      'col-span-2 md:col-span-3 md:row-span-3',
      'md:col-span-3 md:col-start-10 md:row-span-2',
      'md:col-span-3  md:row-span-2',
      'md:col-span-3  md:row-span-3',
      'md:col-span-3 md:col-start-4 md:row-span-3',
      'md:col-span-3 md:col-start-7 md:row-span-3',
      'md:col-span-3 md:col-start-10 md:row-span-2',
    ],
  ],
  [
    'gridTen',
    [
      'col-span-2 md:col-span-6 md:row-span-2',
      'col-span-2 md:col-span-3 md:row-span-3',
      'md:col-span-3 md:col-start-10 md:row-span-2',
      'md:col-span-3  md:row-span-2',
      'md:col-span-3  md:row-span-2',
      'md:col-span-3 md:col-start-7 md:row-span-3',
      'md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-3',
      'md:col-span-3 md:col-start-10 md:row-span-2',
      'md:col-span-3  md:row-span-2 md:row-start-5',
      'md:col-span-3 md:col-start-4  md:row-span-2 md:row-start-5',
    ],
  ],
])

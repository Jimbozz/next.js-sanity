import Image from 'next/image'
import type { Image as SanityImage } from 'sanity'

import {
  getSpacingClasses,
  imagePositionFromHotspot,
  urlForImage,
} from '@/sanity/lib/utils'
import type { SpacingSettings } from '@/types'

import { FigureSquircle } from '../figure-squircle'

type ImageAlt = SanityImage & { alt: string }

interface ImagesGridProps {
  images: ImageAlt[]
  spacingSettings?: SpacingSettings
}

const tailwindClasses = [
  'aspect-[16/20] md:col-span-3',
  'flex aspect-[3/2] self-center md:col-span-3 md:col-start-6',
  'aspect-[16/23] md:col-span-3 md:col-start-10',

  'flex self-center aspect-[3/2] md:col-span-4 md:col-start-3',
  'aspect-[16/20] md:col-span-3 md:col-start-8',

  'aspect-[16/20] md:col-span-3',
  'aspect-[16/23] md:col-span-3 md:col-start-6 md:mt-80',
  'aspect-[3/2] md:col-span-3 md:col-start-10',

  'aspect-[16/20] md:col-span-3',
  'flex aspect-[3/2] self-center md:col-span-3 md:col-start-6',
  'aspect-[16/23] md:col-span-3 md:col-start-10',

  'flex self-center aspect-[3/2] md:col-span-4 md:col-start-3',
  'aspect-[16/20] md:col-span-3 md:col-start-8',

  'aspect-[16/20] md:col-span-3',
  'aspect-[16/23] md:col-span-3 md:col-start-6 md:mt-80',
  'aspect-[3/2] md:col-span-3 md:col-start-10',
]

// Component to display grid of images

export function ImagesGrid({ images, spacingSettings }: ImagesGridProps) {
  const spacingClasses = getSpacingClasses(spacingSettings)

  return (
    <section
      className={`grid grid-cols-1 gap-y-3 md:grid-cols-12 md:gap-y-52 ${spacingClasses}`}
    >
      {images.map((image, index) => (
        <GridImageItem
          image={image}
          key={image.asset?._key || index}
          className={tailwindClasses[index % tailwindClasses.length]}
        />
      ))}
    </section>
  )
}

//Component for single image

interface GridImageItemProps {
  image: ImageAlt
  className: string
}

function GridImageItem({ image, className }: GridImageItemProps) {
  const imageUrl = image && urlForImage(image)?.url()

  if (!imageUrl) {
    return null
  }
  const objectPosition = imagePositionFromHotspot(image.hotspot)
  return (
    <FigureSquircle className={`relative ${className}`}>
      <Image
        src={imageUrl}
        style={{ objectPosition }}
        alt={image.alt}
        className="layout-fill object-cover"
        sizes="auto"
        fill
      />
    </FigureSquircle>
  )
}

import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import type { Image as SanityImage } from 'sanity'

import { getSpacingClasses, urlForImage } from '@/sanity/lib/utils'
import type { SpacingSettings } from '@/types'

type ImageAlt = SanityImage & { alt: string; mimeType?: string }
interface CarouselImageItemProps {
  image: ImageAlt
}
interface ClientLogoCarouselProps {
  images: ImageAlt[]
  spacingSettings?: SpacingSettings
}
export function ClientLogoCarousel({
  images,
  spacingSettings,
}: ClientLogoCarouselProps) {
  const spacingClasses = getSpacingClasses(spacingSettings)

  return (
    <section className={`mx-[-1rem] ${spacingClasses}`}>
      <Marquee autoFill={true}>
        {images.map((image, index) => (
          <div key={index} className="px-4">
            <CarouselImageItem image={image} />
          </div>
        ))}
      </Marquee>
    </section>
  )
}

function CarouselImageItem({ image }: CarouselImageItemProps) {
  const imageUrl = image && urlForImage(image)?.fit('crop').url()

  if (!imageUrl || !image?.mimeType) {
    return null
  }

  const isSvg = image.mimeType === 'image/svg+xml'

  return (
    <figure className="relative h-8 w-auto overflow-hidden md:h-10">
      {isSvg ? (
        // Directly use the img tag for SVGs
        <img
          src={imageUrl}
          alt={image.alt}
          className="h-full w-auto object-contain"
        />
      ) : (
        // Use next/image for other image formats
        <Image
          src={imageUrl}
          alt={image.alt}
          className="layout-fill object-contain"
          sizes="auto"
          fill
        />
      )}
    </figure>
  )
}

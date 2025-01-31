import createImageUrlBuilder from '@sanity/image-url'
import type { Image, ImageHotspot } from 'sanity'

import { dataset, projectId } from '@/sanity/lib/api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).format('webp').fit('crop')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'project':
      return slug ? `/cases/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export function imagePositionFromHotspot(hotspot?: ImageHotspot) {
  if (!hotspot) return '50% 50%'
  function axisPosition(coordinate: number = 0.5, distance: number = 1) {
    if (distance === 1) return 0.5
    return (coordinate - distance / 2) / (1 - distance)
  }
  const { height, width, x, y } = hotspot
  const imagePositionX = axisPosition(x, width)
  const imagePositionY = axisPosition(y, height)

  return `${imagePositionX * 100}% ${imagePositionY * 100}%`
}

// Helper function to check if a color is dark or light
export const isBackgroundDark = (color: string | null): boolean => {
  if (!color) return false
  const rgbValues = color.match(/\d+/g)
  if (!rgbValues) return false

  const [r, g, b] = rgbValues.map(Number)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

//Helper function  to get spacing between components. Values are fetched from Snaity

type SpacingOption = 'small' | 'medium' | 'large'

interface SpacingSettings {
  spacingTop?: SpacingOption
  spacingBottom?: SpacingOption
}
type SpacingValues = 'spacingTop' | 'spacingBottom'
interface Spacing {
  small: string
  medium: string
  large: string
}
export const getSpacingClasses = (
  spacingSettings?: SpacingSettings,
): string => {
  //add further spacing values here if needed. Defualt spacing is 'small'.
  const spacingStyles: Record<SpacingValues, Spacing> = {
    spacingTop: {
      small: 'mt-4',
      medium: 'mt-16 md:mt-44',
      large: 'mt-20 md:mt-96',
    },
    spacingBottom: {
      small: 'mb-4',
      medium: 'mb-16 md:mb-44',
      large: 'mb-20 md:mb-96',
    },
  }

  const topSpacing = spacingSettings?.spacingTop || 'small'
  const bottomSpacing = spacingSettings?.spacingBottom || 'small'

  return `${spacingStyles.spacingTop[topSpacing]} ${spacingStyles.spacingBottom[bottomSpacing]}`
}

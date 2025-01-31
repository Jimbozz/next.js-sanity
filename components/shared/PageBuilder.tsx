import Image from 'next/image'
import Link from 'next/link'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image as SanityImage } from 'sanity'

import {
  getSpacingClasses,
  imagePositionFromHotspot,
  resolveHref,
  urlForImage,
} from '@/sanity/lib/utils'
import type { SpacingSettings } from '@/types'

import { CustomPortableText } from './CustomPortableText'
import { FigureSquircle } from './figure-squircle'
import Accordion from './page-blocks/Accordion'
import { ClientLogoCarousel } from './page-blocks/clientLogoCarousel'
import EmbeddedIframe from './page-blocks/EmbeddedIframe'
import { HeaderAndTeam } from './page-blocks/HeaderAndTeam'
import { ImagesGrid } from './page-blocks/ImagesGrid'
import { MasonryGrid } from './page-blocks/MasonryGrid'
import { ProjectShowcase } from './page-blocks/project-showcase'
import { TitleWithTags } from './page-blocks/TitleWithTags'

type ImageAlt = SanityImage & { alt: string }
type ImageBundleLayout = 'portrait-first' | 'square-first'
interface ImageBundle {
  images: ImageAlt[]
  layout: ImageBundleLayout
  spacingSettings?: SpacingSettings
}
interface ImageBundleItemProps {
  image: ImageAlt
  span: string
  aspectRatio: string
}

export function PageBuilder({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children, value }) => {
        const alignmentMarks = value.children?.[0]?.marks ?? []
        let alignClass = ''

        switch (alignmentMarks[0]) {
          case 'center':
            alignClass = 'text-center'
            break
          case 'right':
            alignClass = 'text-right'
            break
          default:
            alignClass = 'text-left'
        }
        return <p className={`${alignClass} ${paragraphClasses}`}>{children}</p>
      },
    },
    hardBreak: () => {
      return <span className="mb-4 block" />
    },
    list: {
      bullet: ({ children }) => (
        <ul className="m-0 my-0 list-none space-y-2 pl-0 md:col-span-6 md:col-start-4">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 list-decimal space-y-2 pl-5">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children, index }) => {
        return (
          <div
            className={`!m-0 border-b-2 border-black/20 py-4 ${index === 0 ? 'border-t-2' : ''}`}
          >
            <li className="text-base">{children}</li>
          </div>
        )
      },
      number: ({ children }) => <li className="pl-1">{children}</li>,
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
      internalLink: ({ children, value }) => {
        const slug = value?.slug
        const href = resolveHref('page', slug)

        if (!href) {
          return null
        }

        return (
          <Link
            className="decoration-2 underline-offset-8 hover:underline"
            href={href}
          >
            {children}
          </Link>
        )
      },
    },
    types: {
      heroBlock: ({ value }) => {
        const { content, spacingSettings } = value
        const spacingClasses = getSpacingClasses(spacingSettings)

        const textStyle = content?.[0]?.style || 'normal'
        const heroTextStyles: Record<string, string> = {
          h2: 'text-4xl font-light  md:text-[10rem] leading-snug', // used for hero text above hero image on project pages
          h3: 'text-4xl font-light md:text-6xl', // used for text under hero image eg: project specific page hero image
          normal: 'text-2xl md:text-[40px] leading-9 md:leading-[56px]', // Default text style in hero section above hero image
          small: 'text-base md:text-[32px] leading-normal', // small text size used for hero text above image
          large: 'text-3xl md:text-[50px] leading-9 md:leading-[1.2]', //large text size used for hero text above image
        }

        const alignments: Record<string, string> = {
          center: 'justify-center',
          right: 'justify-end',
          left: 'justify-start', // Default alignment
        }
        const alignmentMarks = content?.[0]?.children?.[0]?.marks ?? []
        const alignBlock = alignments[alignmentMarks[0]] || alignments.left
        const maxWidthClass =
          alignmentMarks[0] === 'center'
            ? 'max-w-screen-sm md:max-w-screen-md'
            : 'md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'

        return (
          <section
            className={`${alignBlock} ${heroTextStyles[textStyle]} ${spacingClasses} flex text-pretty font-light`}
          >
            <CustomPortableText
              value={content}
              paragraphClasses={maxWidthClass}
            />
          </section>
        )
      },
      headerAndBlock: ({ value }) => {
        const { header, content, layout, spacingSettings } = value
        const spacingClasses = getSpacingClasses(spacingSettings)

        if (!header) {
          const isCentered =
            layout === 'left-aligned'
              ? 'lg:col-span-8'
              : 'lg:col-span-6 lg:col-start-4'

          return (
            <section className={`grid grid-cols-12 ${spacingClasses}`}>
              <div
                className={`col-span-12 text-base font-light md:leading-[45px] ${isCentered}`}
              >
                <PortableText value={content} components={components} />
              </div>
            </section>
          )
        }

        return (
          <section
            className={`grid grid-cols-1 lg:grid-cols-12 ${spacingClasses}`}
          >
            <h2 className="heading-base mb-4 font-light lg:col-span-2">
              {header}
            </h2>
            <div className="text-base font-light md:leading-[45px] lg:col-span-6 lg:col-start-4">
              <PortableText value={content} components={components} />
            </div>
          </section>
        )
      },
      headerAndResults: ({ value }) => {
        const { header, resultsSection, spacingSettings } = value
        const spacingClasses = getSpacingClasses(spacingSettings)

        return (
          <section
            className={`grid grid-cols-1 gap-8 md:grid-cols-12 ${spacingClasses}`}
          >
            <h2 className="heading-base font-light md:col-span-2">{header}</h2>
            <div className="grid gap-x-8 gap-y-6 md:col-span-8 md:col-start-4 md:grid-cols-2 md:gap-y-28">
              {resultsSection.map((section, index) => (
                <div key={index} className="flex flex-col md:gap-4">
                  <div className="large-number font-light">
                    {section.percentage}%
                  </div>
                  <div className="text-base font-light text-black/60">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      },
      headerAndTeam: ({ value }) => {
        return <HeaderAndTeam {...value} />
      },
      accordion: ({ value }) => {
        return <Accordion {...value} />
      },
      clientLogoCarousel: ({ value }) => {
        const { carouselItems, spacingSettings } = value
        return (
          <ClientLogoCarousel
            images={carouselItems}
            spacingSettings={spacingSettings}
          />
        )
      },
      textAndImage: ({ value }) => {
        const { content, image, spacingSettings } = value
        const imageUrl = image && urlForImage(image)?.fit('crop').url()
        const spacingClasses = getSpacingClasses(spacingSettings)

        if (!imageUrl) {
          return null
        }
        const objectPosition = imagePositionFromHotspot(image?.hotspot)
        return (
          <section
            className={`grid grid-cols-1 md:grid-cols-12 ${spacingClasses}`}
          >
            <div className="order-last mt-5 max-w-[41rem] text-base font-light md:order-none md:col-span-5 md:mt-0 md:leading-[44px]">
              <CustomPortableText value={content} />
            </div>
            <FigureSquircle className="relative col-span-1 flex aspect-square flex-col items-baseline justify-between p-5 md:col-span-5 md:col-start-8">
              <Image
                src={imageUrl}
                alt={image.alt}
                className="layout-fill h-full w-full object-cover"
                style={{ objectPosition }}
                sizes="auto"
                fill
              />
            </FigureSquircle>
          </section>
        )
      },
      headerAndColumns: ({ value }) => {
        const { header, columns, spacingSettings } = value
        const compactLayout = columns.length <= 2
        const spacingClasses = getSpacingClasses(spacingSettings)

        return (
          <section
            className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 ${spacingClasses}`}
          >
            <h2 className="heading-base mb-4 font-light md:col-span-2">
              {header}
            </h2>
            <div
              className={`flex flex-wrap gap-8 lg:col-span-9 ${compactLayout ? 'lg:col-start-8' : 'justify-between lg:col-start-4'}`}
            >
              {columns.map((column, index) => {
                return (
                  <div
                    key={index}
                    className={`min-w-56 ${compactLayout ? 'max-w-96' : 'md:max-w-[21rem]'} flex-auto text-base font-light md:leading-[44px]`}
                  >
                    <CustomPortableText value={column.columnContent} />
                  </div>
                )
              })}
            </div>
          </section>
        )
      },
      projectShowcase: ({ value }) => {
        const { projects, layoutPreview, spacingSettings } = value

        return (
          <ProjectShowcase
            projects={projects}
            projectLayout={layoutPreview}
            spacingSettings={spacingSettings}
          />
        )
      },
      imagesGrid: ({ value }) => {
        const { images, spacingSettings } = value
        return <ImagesGrid images={images} spacingSettings={spacingSettings} />
      },
      masonryGrid: ({ value }) => {
        const { media, layout, spacingSettings } = value
        return (
          <MasonryGrid
            media={media}
            spacingSettings={spacingSettings}
            gridType={layout}
          />
        )
      },
      iframe: ({ value }) => {
        const { iframeLink, header } = value
        return <EmbeddedIframe iframeLink={iframeLink} header={header} />
      },
      images: ({ value }: { value?: ImageBundle }) => {
        const {
          images = [],
          layout = 'portrait-first',
          spacingSettings,
        } = value || ({} as ImageBundle)
        const { length: amount } = images
        const spacingClasses = getSpacingClasses(spacingSettings)

        if (amount === 0) return null

        const ratios =
          layout === 'portrait-first'
            ? {
                0: 'md:aspect-[31/36]',
                1: 'md:aspect-[93/80]',
                2: 'md:aspect-[47/27]',
              }
            : {
                0: 'md:aspect-[93/80]',
                1: 'md:aspect-[31/36]',
                2: 'md:aspect-[47/27]',
              }

        return (
          <section
            className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-40 ${spacingClasses}`}
          >
            {images.map((project, key) => {
              const span =
                key === amount - 1 && key % 2 === 0
                  ? 'col-span-2'
                  : 'col-span-1'
              return (
                <ImageBundleItem
                  key={key}
                  image={project}
                  span={span}
                  aspectRatio={amount > 1 ? ratios[key % 3] : ratios[2]}
                />
              )
            })}
          </section>
        )
      },
      titleWithTags: ({ value }) => {
        return <TitleWithTags {...value} />
      },

      fallback: ({ value }) => {
        console.warn('Unknown block type', value._type)
        return null
      },
    },
  }

  return <PortableText components={components} value={value} />
}

function ImageBundleItem({ image, span, aspectRatio }: ImageBundleItemProps) {
  const imageUrl = image && urlForImage(image)?.fit('crop').url()
  if (!imageUrl) {
    return null
  }
  const objectPosition = imagePositionFromHotspot(image?.hotspot)
  return (
    <FigureSquircle
      className={`relative aspect-[30/40] ${aspectRatio} col-span-1 flex flex-col items-baseline justify-between p-5 md:${span}`}
    >
      <Image
        src={imageUrl}
        alt={image.alt}
        className="object-cover"
        style={{ objectPosition }}
        fill
        sizes="auto"
      />
    </FigureSquircle>
  )
}

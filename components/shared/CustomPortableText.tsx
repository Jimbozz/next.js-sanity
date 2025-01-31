import Link from 'next/link'
import type { PortableTextComponentProps } from 'next-sanity'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'
import { resolveHref } from '@/sanity/lib/utils'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const getAlignmentClass = (marks: string[] = []): string => {
    switch (marks[0]) {
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-left'
    }
  }
  const renderBlock = ({
    children,
    value,
  }: PortableTextComponentProps<PortableTextBlock>) => {
    const alignmentMarks = value.children?.[0]?.marks ?? []
    const alignClass = getAlignmentClass(alignmentMarks)
    return <p className={`${paragraphClasses} ${alignClass}`}>{children}</p>
  }
  const components: PortableTextComponents = {
    block: {
      normal: renderBlock,
      small: renderBlock,
      large: renderBlock,
    },
    hardBreak: () => {
      return <span className="mb-4 block" />
    },
    list: {
      bullet: ({ children }) => (
        <ul className="m-0 my-0 list-none space-y-2 pl-0">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 list-decimal space-y-2 pl-5">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => {
        return (
          <div className="border-b-2 border-black py-5">
            <li className="text-5xl">{children}</li>
          </div>
        )
      },
      number: ({ children }) => <li className="pl-1">{children}</li>,
    },
    marks: {
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
      link: ({ children, value }) => {
        return (
          <a
            className="decoration-2 underline-offset-8 hover:underline"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
      fallback: ({ value }) => {
        console.warn('Unknown block type', value._type)
        return null
      },
    },
  }
  return <PortableText components={components} value={value} />
}

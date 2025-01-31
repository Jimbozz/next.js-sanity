import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Image from 'next/image'
import Link from 'next/link'

import {
  getSpacingClasses,
  imagePositionFromHotspot,
  resolveHref,
} from '@/sanity/lib/utils'
import type { ShowcaseProject, SpacingSettings } from '@/types'

import { FigureSquircle } from '../figure-squircle'
import { PillSquircle } from '../pill-squircle'

interface ProjectShowcaseItemProps {
  project: ShowcaseProject
  span: string
  aspectRatio: string
  dataSanity?: string
  client?: string
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[]
  encodeDataAttribute?: EncodeDataAttributeCallback
  projectLayout: string
  spacingSettings?: SpacingSettings
}
export function ProjectShowcase({
  projects,
  encodeDataAttribute,
  projectLayout = 'shortFirst',
  spacingSettings,
}: ProjectShowcaseProps) {
  const spacingClasses = getSpacingClasses(spacingSettings)

  const layoutConfigs = {
    fullWidth: {
      ratios: ['md:aspect-[16/9]'], // Full-width
      spans: ['md:col-span-12'], // Single column
    },
    shortFirst: {
      ratios: ['md:aspect-square', 'md:aspect-[4/5]'], // Short then tall
      spans: ['md:col-span-5', 'md:col-span-5 md:col-start-8'], // Two column layout
    },
    shortLast: {
      ratios: ['md:aspect-[4/5]', 'md:aspect-square'], // Tall then short
      spans: ['md:col-span-5', 'md:col-span-5 md:col-start-8'], // Two column layout
    },
  }

  const { ratios, spans } = layoutConfigs[projectLayout]

  return (
    <section
      className={`grid grid-cols-1 items-end gap-8 md:grid-cols-12 ${spacingClasses}`}
    >
      {projects.map((project, key) => {
        const aspectRatio = ratios[key]
        const span = spans[key]

        return (
          <ProjectShowcaseItem
            project={project}
            span={span}
            aspectRatio={aspectRatio}
            key={key}
            dataSanity={encodeDataAttribute?.([
              'showcaseProjects',
              key,
              'slug',
            ])}
            client={project.client}
          />
        )
      })}
    </section>
  )
}

function ProjectShowcaseItem({
  project,
  span,
  aspectRatio,
  dataSanity,
}: ProjectShowcaseItemProps) {
  const href = resolveHref(project._type, project.slug)
  const imageUrl = project.featuredImage?.imageUrl
  const videoUrl = project.featuredVideo?.videoUrl

  if (!href || (!imageUrl && !videoUrl)) {
    return
  }

  const objectPosition = imagePositionFromHotspot(
    project.featuredImage?.hotspot,
  )
  return (
    <Link
      href={href}
      className={`col-span-1 ${span}`}
      data-sanity={dataSanity}
      aria-label={`View project: ${project.title}`}
    >
      <FigureSquircle
        className={`relative aspect-[31/36] ${aspectRatio} flex flex-col justify-between p-3`}
      >
        {videoUrl ? (
          <div
            aria-label={project.featuredVideo?.alt}
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src={videoUrl as string}
              className="absolute left-0 top-0 h-full w-full object-cover"
              aria-describedby={project.featuredVideo?.alt}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <Image
            src={imageUrl ?? ''}
            alt={`Featured image for ${project.title}`}
            className="object-cover"
            style={{ objectPosition }}
            fill
            sizes="100vw"
          />
        )}
        {project.tags && (
          <div className="z-10 flex flex-wrap gap-1 md:gap-x-2">
            {project.tags?.labels?.slice(0, 3).map((tag) => (
              <PillSquircle
                tagType={'div'}
                key={tag}
                className={`bottom-0 px-3 py-[6px]`}
                style={{
                  backgroundColor:
                    project.tags?.showcaseProjectTags?.tagBackgroundColor ??
                    '#00000046',
                }}
              >
                <div
                  className="tag-text"
                  style={{
                    color:
                      project.tags?.showcaseProjectTags?.tagFontColor ??
                      '#FFFFFF',
                  }}
                >
                  {tag}
                </div>
              </PillSquircle>
            ))}
          </div>
        )}
      </FigureSquircle>
      {project.title && project.client && (
        <figcaption className="card-title mt-2 flex flex-col md:mt-5 md:gap-2">
          <h3>{project.title}</h3>
          <span>{project.client}</span>
        </figcaption>
      )}
    </Link>
  )
}

import { getSpacingClasses } from '@/sanity/lib/utils'
import type { SpacingSettings } from '@/types'

import { PillSquircle } from '../pill-squircle'

interface TitleWithTagsPayload {
  title?: string
  tagBackgroundColor?: string
  tagFontColor?: string

  listOfTags?: string[]
  spacingSettings?: SpacingSettings
}

export function TitleWithTags({
  title,
  tagBackgroundColor,
  tagFontColor,
  listOfTags,
  spacingSettings,
}: TitleWithTagsPayload) {
  const spacingClasses = getSpacingClasses(spacingSettings)

  return (
    <div className={`flex flex-col gap-2 ${spacingClasses}`}>
      <h3 className="text-lg font-normal">{title}</h3>
      <div className="flex flex-wrap gap-x-2 gap-y-2 md:max-w-3xl">
        {listOfTags &&
          [...new Set(listOfTags)].map((tag, index) => (
            <PillSquircle
              tagType={'div'}
              key={index}
              className="flex items-center px-3 py-[6px]"
              style={{
                backgroundColor: tagBackgroundColor ?? '#00000046',
              }}
            >
              <div
                className="tag-text"
                style={{ color: tagFontColor ?? '#FFFFFF' }}
              >
                {tag}
              </div>
            </PillSquircle>
          ))}
      </div>
    </div>
  )
}

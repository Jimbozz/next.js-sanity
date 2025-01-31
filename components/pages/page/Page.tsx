import PageTransition from '@/components/animations/page-transition'
import { BackgroundContainer } from '@/components/background-container'
import { PageBuilder } from '@/components/shared/PageBuilder'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload
}

export function Page({ data = {} as PagePayload }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, content, backgroundColor } = data

  return (
    <PageTransition>
      <BackgroundContainer hexCode={backgroundColor}>
        {title && <h1 className="sr-only">{title}</h1>}
        {content && <PageBuilder value={content} />}
      </BackgroundContainer>
    </PageTransition>
  )
}

export default Page

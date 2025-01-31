import PageTransition from '@/components/animations/page-transition'
import { BackgroundContainer } from '@/components/background-container'
import { PageBuilder } from '@/components/shared/PageBuilder'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title = '', backgroundColor, content } = data ?? {}

  return (
    <PageTransition>
      <BackgroundContainer hexCode={backgroundColor}>
        {/* Hidden title for screenreaders */}
        {title && <h1 className="sr-only">{title}</h1>}
        {content && <PageBuilder value={content} />}
      </BackgroundContainer>
    </PageTransition>
  )
}

export default HomePage

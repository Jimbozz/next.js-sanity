import PageTransition from '@/components/animations/page-transition'
import { BackgroundContainer } from '@/components/background-container'
import { PageBuilder } from '@/components/shared/PageBuilder'
import type { ProjectPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
}

export function ProjectPage({ data }: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, content, backgroundColor } = data ?? {}

  return (
    <PageTransition>
      <BackgroundContainer hexCode={backgroundColor}>
        {title && <h1 className="sr-only">{title}</h1>}
        {/*Page builder custom content*/}
        {content && <PageBuilder value={content} />}
      </BackgroundContainer>
    </PageTransition>
  )
}

export default ProjectPage

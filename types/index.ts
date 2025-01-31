import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface SpacingSettings {
  spacingTop?: 'small' | 'medium' | 'large'
  spacingBottom?: 'small' | 'medium' | 'large'
}

interface MetaData {
  metaDescription?: PortableTextBlock[]
  openGraphImage?: Image & { alt: string }
}

export interface PageReference {
  _type: string
  slug: string
  title: string
}

export interface MenuCallToAction {
  page: PageReference
  buttonText: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  featuredImage?: Image & {
    imageUrl: string
    alt: string
  }
  featuredVideo?: {
    videoUrl: string
    alt: string
  }
  slug?: string
  tags?: {
    labels: string[]
    tagBackgroundColor: string
    tagFontColor: string
    title: string
    showcaseProjectTags?: {
      tagBackgroundColor: string
      tagFontColor: string
    }
  }
  title?: string
  client?: string
  layoutPreview?: string
}

// Page payloads

export interface HomePagePayload {
  title?: string
  backgroundColor?: string
  metaData?: MetaData
  content?: PortableTextBlock[]
}

export interface PagePayload {
  backgroundColor: string
  title?: string
  slug?: string
  metaData?: MetaData
  content?: PortableTextBlock[]
}

export interface ProjectPayload {
  client?: string
  featuredImage?: Image
  backgroundColor: string
  site?: string
  metaData?: MetaData
  slug: string
  title?: string
  content?: PortableTextBlock[]
}

export interface SettingsPayload {
  footerSocialLinks?: PortableTextBlock[]
  footerLinks?: PortableTextBlock[]
  footerInfo?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
  menuCallToAction?: MenuCallToAction
}

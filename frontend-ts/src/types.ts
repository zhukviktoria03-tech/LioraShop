// 2.3.1. Type Aliases
export type PageSlug = string
export type UrlString = string
export type CurrencyUAH = number

export type ImageSize = {
  url: UrlString
  width?: number | null
  height?: number | null
}

export type MediaRef = {
  id: string | number
  alt: string
  url: UrlString
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: ImageSize
    tablet?: ImageSize
  }
}

// 2.3.2. Intersection Types
export type BaseBlock = {
  id?: string | null
  blockName?: string | null
}

export type HeroBlock = BaseBlock & {
  blockType: 'hero'
  badge?: string | null
  heading: string
  subheading?: string | null
  image?: MediaRef | null
  ctaText: string
  ctaLink: UrlString
}

export type PhilosophyFeature = {
  id?: string | null
  title: string
  text: string
}

export type PhilosophyBlock = BaseBlock & {
  blockType: 'philosophy'
  title: string
  description: string
  features: PhilosophyFeature[]
}

export type BestsellersBlock = BaseBlock & {
  blockType: 'bestsellers'
  title: string
  subtitle?: string | null
  limit: number
}

export type RoutineStep = {
  id?: string | null
  stepNumber: string
  name: string
  tip: string
}

export type RoutineBlock = BaseBlock & {
  blockType: 'routine'
  title: string
  steps: RoutineStep[]
}

export type CtaBlock = BaseBlock & {
  blockType: 'cta'
  headline: string
  caption?: string | null
  buttonLabel: string
  targetUrl: UrlString
}

// 2.3.3. Union Types (Discriminated Unions)
export type Block =
  | HeroBlock
  | PhilosophyBlock
  | BestsellersBlock
  | RoutineBlock
  | CtaBlock

// 2.3.4. Objects & Page State Types
export type ProductItem = {
  id: number | string
  title: string
  tagline?: string | null
  category: string
  price: CurrencyUAH
  volume: string
  image?: MediaRef | null
  isBestseller: boolean
  djangoUrl: UrlString
}

export type Page = {
  id: string | number
  title: string
  slug: PageSlug
  layout: Block[]
}

export type PageState =
  | { status: 'loading' }
  | { status: 'success'; data: Page; bestsellers: ProductItem[] }
  | { status: 'notFound' }
  | { status: 'error'; message: string }

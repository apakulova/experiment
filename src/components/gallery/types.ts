export type GalleryCardSize = 'S' | 'M' | 'L'

export type GalleryLayoutScheme =
  | 'L'
  | 'S+S'
  | 'M+S+S'
  | 'S+S+M'
  | 'M+S+S+M'
  | 'S+M+M+S'
  | 'M+S+S+S'
  | 'S+S+S+M'
  | 'S+M+M|M+S+M'

export type GalleryClickTarget = 'product' | 'content'

type GalleryItemBase = {
  id: string
  title: string
  categories: string[]
}

export type GalleryProductItem = GalleryItemBase & {
  kind: 'product'
  description?: string
  imageSrc?: string
  ctaLabel?: string
  clickTarget?: GalleryClickTarget
  lImagePreset?: 'default' | 'offerContentOsago'
}

export type GalleryContentItem = GalleryItemBase & {
  kind: 'content'
  tag?: string
}

export type GalleryItem = GalleryProductItem | GalleryContentItem

export type GalleryBlockConfig = {
  id: string
  layout: GalleryLayoutScheme
  itemIds: string[]
}

import type { GalleryCardSize, GalleryLayoutScheme } from '@/components/gallery/types'

const schemaColumns: Record<Exclude<GalleryLayoutScheme, 'L'>, GalleryCardSize[][]> = {
  'S+S': [['S'], ['S']],
  'M+S+S': [['M'], ['S', 'S']],
  'S+S+M': [['S', 'S'], ['M']],
  'M+S+S+M': [['M', 'S'], ['S', 'M']],
  'S+M+M+S': [['S', 'M'], ['M', 'S']],
  'M+S+S+S': [['M', 'S'], ['S', 'S', 'S']],
  'S+S+S+M': [['S', 'S', 'S'], ['M', 'S']],
  'S+M+M|M+S+M': [['S', 'M', 'M'], ['M', 'S', 'M']],
}

export function getLayoutColumns(layout: GalleryLayoutScheme) {
  if (layout === 'L') return null
  return schemaColumns[layout]
}

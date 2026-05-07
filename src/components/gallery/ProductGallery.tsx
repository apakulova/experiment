import { ContentItem } from '@/components/gallery/ContentItem'
import { ProductItem } from '@/components/gallery/ProductItem'
import { getLayoutColumns } from '@/components/gallery/layoutEngine'
import type { GalleryBlockConfig, GalleryCardSize, GalleryItem, GalleryProductItem } from '@/components/gallery/types'

type ProductGalleryProps = {
  activeTab: string
  blocks: GalleryBlockConfig[]
  itemsById: Record<string, GalleryItem>
  onOpenProduct: (id: string) => void
  onOpenContent: (id: string) => void
}

function isVisibleForTab(item: GalleryItem, activeTab: string) {
  if (activeTab === 'all') return true
  return item.categories.includes(activeTab)
}

function getClickHandler(
  item: GalleryItem,
  onOpenProduct: (id: string) => void,
  onOpenContent: (id: string) => void,
) {
  if (item.kind === 'product' && item.clickTarget !== 'content') {
    return () => onOpenProduct(item.id)
  }
  return () => onOpenContent(item.id)
}

function renderCard(
  item: GalleryItem,
  size: GalleryCardSize,
  onOpenProduct: (id: string) => void,
  onOpenContent: (id: string) => void,
) {
  const onClick = getClickHandler(item, onOpenProduct, onOpenContent)
  if (item.kind === 'product') {
    return <ProductItem item={item as GalleryProductItem} size={size} onClick={onClick} />
  }
  return <ContentItem item={item} onClick={onClick} />
}

export function ProductGallery({ activeTab, blocks, itemsById, onOpenProduct, onOpenContent }: ProductGalleryProps) {
  return (
    <section className="flex flex-col gap-[6px] px-[10px]">
      {blocks.map((block) => {
        if (block.layout === 'L') {
          const firstVisible = block.itemIds
            .map((id) => itemsById[id])
            .find((item) => item && isVisibleForTab(item, activeTab))
          if (!firstVisible) return null
          return <div key={block.id}>{renderCard(firstVisible, 'L', onOpenProduct, onOpenContent)}</div>
        }

        const columns = getLayoutColumns(block.layout)
        if (!columns) return null

        const totalSlots = columns.reduce((sum, column) => sum + column.length, 0)
        const rawItems: Array<GalleryItem | null> = block.itemIds
          .slice(0, totalSlots)
          .map((id) => {
            const item = itemsById[id]
            if (!item) return null
            return isVisibleForTab(item, activeTab) ? item : null
          })

        while (rawItems.length < totalSlots) rawItems.push(null)

        let cursor = 0
        const columnsData = columns.map((column) => {
          const chunk = rawItems.slice(cursor, cursor + column.length)
          cursor += column.length

          const compact: Array<{ item: GalleryItem; size: GalleryCardSize }> = []
          column.forEach((size, index) => {
            const item = chunk[index]
            if (item) compact.push({ item, size })
          })
          return compact
        })

        const hasAnyCards = columnsData.some((column) => column.length > 0)
        if (!hasAnyCards) return null

        return (
          <div key={block.id} className="flex items-start gap-[6px]">
            {columnsData.map((column, columnIndex) => (
              <div key={`${block.id}-col-${columnIndex}`} className="flex w-[174.5px] flex-col gap-[6px]">
                {column.map(({ item, size }) => (
                  <div key={`${block.id}-${item.id}-${size}`}>{renderCard(item, size, onOpenProduct, onOpenContent)}</div>
                ))}
              </div>
            ))}
          </div>
        )
      })}
    </section>
  )
}

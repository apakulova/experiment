import type { GalleryContentItem } from '@/components/gallery/types'
import { typographRu } from '@/lib/typography'

type ContentItemProps = {
  item: GalleryContentItem
  onClick: () => void
}

const t = typographRu

export function ContentItem({ item, onClick }: ContentItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-40 w-full flex-col justify-between rounded-[20px] bg-[#f2f1f0] px-4 pb-4 pt-4 text-left transition-transform active:scale-[0.985]"
    >
      <h3 className="text-[15px] font-medium leading-5 tracking-[0] text-black">{t(item.title)}</h3>
      <span className="text-[13px] font-medium leading-[18px] text-[#757575]">{item.tag ? t(item.tag) : ''}</span>
    </button>
  )
}

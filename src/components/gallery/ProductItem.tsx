import type { GalleryCardSize, GalleryProductItem } from '@/components/gallery/types'
import { typographRu } from '@/lib/typography'

type ProductItemProps = {
  item: GalleryProductItem
  size: GalleryCardSize
  onClick: () => void
}

const t = typographRu

export function ProductItem({ item, size, onClick }: ProductItemProps) {
  if (size === 'L') {
    const isOfferContentOsago = item.lImagePreset === 'offerContentOsago'

    return (
      <button
        type="button"
        onClick={onClick}
        className="relative flex min-h-[188px] w-full overflow-hidden rounded-[20px] bg-[linear-gradient(90deg,#e2ffd6_10%,#f4eefe_90%)] text-left transition-transform active:scale-[0.99]"
      >
        <div className="flex w-[218px] flex-col gap-4 pb-5 pl-5 pr-0 pt-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-extrabold leading-[22px] text-black">{t(item.title)}</h3>
            <p className="text-[15px] font-medium leading-5 text-black">{item.description ? t(item.description) : ''}</p>
          </div>
          <div className="inline-flex h-11 w-fit items-center rounded-[12px] bg-[#141414] px-4 text-[15px] font-medium text-white">
            {t(item.ctaLabel ?? 'Подробнее')}
          </div>
        </div>
        {item.imageSrc ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[137px] overflow-hidden">
            <img
              alt=""
              className={
                isOfferContentOsago
                  ? 'absolute left-[-35.56%] top-[-1.65%] h-[114.23%] w-[156.75%] max-w-none'
                  : 'absolute right-0 top-0 h-[188px] w-auto max-w-none'
              }
              src={item.imageSrc}
            />
          </div>
        ) : null}
      </button>
    )
  }

  if (size === 'S') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-40 w-full flex-col justify-between overflow-hidden rounded-[20px] bg-[#f2f1f0] px-4 pb-4 pt-4 text-left transition-transform active:scale-[0.985]"
      >
        <h3 className="text-[16px] font-extrabold leading-5 text-black">{t(item.title)}</h3>
        {item.imageSrc ? <img alt="" className="h-[72px] w-full object-contain object-right-bottom" src={item.imageSrc} /> : null}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[326px] w-full flex-col overflow-hidden rounded-[20px] bg-[#f2f1f0] text-left transition-transform active:scale-[0.985]"
    >
      <div className="flex h-[152px] flex-col gap-3 px-4 pt-4 text-black">
        <h3 className="text-[18px] font-extrabold leading-[22px] tracking-[0] whitespace-pre-line">{t(item.title)}</h3>
        <p className="text-[15px] font-medium leading-5 text-black whitespace-pre-line">{item.description ? t(item.description) : ''}</p>
      </div>
      <div className="relative h-[174px] w-full overflow-hidden">
        {item.imageSrc ? <img alt="" className="h-full w-full object-contain object-center" src={item.imageSrc} /> : null}
      </div>
    </button>
  )
}

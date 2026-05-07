import depositsBannerSvg from '@/assets/banners/Offer-Content/deposits-banner.svg'
import bonusTileSvg from '@/assets/tiles/ProductItem/bonus-tile.svg'
import depositsTileSvg from '@/assets/tiles/ProductItem/deposits-tile.svg'
import walletTileSvg from '@/assets/tiles/ProductItem/wallet-tile.svg'
import accountTileSvg from '@/assets/tiles/ProductItem/account-tile.svg'

export const illustrationAssets = {
  banners: {
    deposits: depositsBannerSvg,
  },
  tiles: {
    deposits: depositsTileSvg,
    wallet: walletTileSvg,
    account: accountTileSvg,
    bonus: bonusTileSvg,
  },
} as const

export type BannerIllustrationKey = keyof typeof illustrationAssets.banners
export type TileIllustrationKey = keyof typeof illustrationAssets.tiles

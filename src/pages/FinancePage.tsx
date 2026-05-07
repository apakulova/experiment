import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRightLeft,
  CircleHelp,
  Coins,
  CreditCard,
  Gift,
  MapPin,
  Percent,
  PiggyBank,
  RotateCcw,
  Signal,
  Sparkles,
  Wifi,
  X,
} from 'lucide-react'
import { illustrationAssets } from '@/assets/illustrations'
import { typographRu } from '@/lib/typography'

const imgBonus = 'https://www.figma.com/api/mcp/asset/0077f567-b5e4-4243-a484-6e4f91b7375d'
const imgRuble = 'https://www.figma.com/api/mcp/asset/f8004ce5-2cae-4ef6-b631-e93e8c926a9a'

type TabKey = 'save' | 'borrow' | 'protect' | 'economy' | 'all'
type TileKind = 'content' | 'product'
type ProductTileId = 'deposits' | 'account' | 'bonus' | 'wallet'

type Tile = {
  id: string
  kind: TileKind
  title: string
  description?: string
  tag?: string
  image?: 'deposits' | 'account' | 'bonus' | 'wallet'
  category: TabKey[]
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'save', label: 'Накопить' },
  { key: 'borrow', label: 'Взять деньги' },
  { key: 'protect', label: 'Застраховать' },
  { key: 'economy', label: 'Сэкономить' },
  { key: 'all', label: 'Всё и сразу' },
]

const tilesLeft: Tile[] = [
  {
    id: 'gosuslugi',
    kind: 'content',
    title: 'Зачем Авито нужны Госуслуги',
    tag: '#безопасность',
    category: ['save', 'all'],
  },
  {
    id: 'deposits',
    kind: 'product',
    title: 'Вклады до 17% годовых',
    description: 'Посмотрите, что предлагают крупные банки',
    image: 'deposits',
    category: ['save', 'economy', 'all'],
  },
  {
    id: 'bonus',
    kind: 'product',
    title: 'Бонусы',
    description: 'Пользуйтесь Авито с выгодой: 1 бонус = 1 ₽',
    image: 'bonus',
    category: ['save', 'economy', 'all'],
  },
]

const tilesRight: Tile[] = [
  {
    id: 'account',
    kind: 'product',
    title: 'Накопитель-\nный счёт',
    description: 'Можно снимать и класть деньги в любой момент',
    image: 'account',
    category: ['save', 'all'],
  },
  {
    id: 'credit',
    kind: 'content',
    title: 'Как улучшить кредитную историю',
    tag: '#кредиты',
    category: ['save', 'borrow', 'all'],
  },
  {
    id: 'wallet',
    kind: 'product',
    title: 'Кошелёк',
    description: 'Он даёт скидки, а сэкономил — считай заработал',
    image: 'wallet',
    category: ['save', 'economy', 'all'],
  },
]

type DetailSection =
  | { type: 'lead'; text: string }
  | { type: 'bullet'; strong: string; text: string }

type DetailContent = {
  title: string
  action: string
  sections: DetailSection[]
}

type BenefitTone = 'coral' | 'green' | 'violet' | 'blue'
type BenefitIcon = 'percent' | 'cross' | 'refund' | 'transfer' | 'coins' | 'card' | 'gift' | 'sparkles' | 'piggy'

type OnboardingBenefit = {
  title: string
  description: string
  tone: BenefitTone
  icon: BenefitIcon
}

type ProductOnboardingContent = {
  title: string
  subtitle: string
  footer: string
  footerLinks?: [string, string]
  action: string
  illustration: ProductTileId
  benefits: OnboardingBenefit[]
}

const details: Record<string, DetailContent> = {
  gosuslugi: {
    title: 'Зачем Авито нужны Госуслуги',
    action: 'Узнать подробнее',
    sections: [
      {
        type: 'lead',
        text: 'Госуслуги помогают подтвердить личность и показать другим пользователям, что профилю можно доверять.',
      },
      {
        type: 'bullet',
        strong: 'Повышается доверие к аккаунту',
        text: ' Проверенный профиль выглядит надежнее для покупателей и продавцов.',
      },
      {
        type: 'bullet',
        strong: 'Проще проходить проверки',
        text: ' В некоторых сценариях подтверждённые данные ускоряют доступ к функциям и сервисам.',
      },
      {
        type: 'bullet',
        strong: 'Меньше риска мошенничества',
        text: ' Подтверждение личности снижает количество анонимных и подозрительных действий.',
      },
    ],
  },
  deposits: {
    title: 'Вклады',
    action: 'Подобрать вклад',
    sections: [
      {
        type: 'lead',
        text: 'Сравните предложения банков, ставки, сроки и условия пополнения, чтобы подобрать вклад под свои цели.',
      },
      {
        type: 'bullet',
        strong: 'Смотрите реальные ставки',
        text: ' Можно быстро оценить доходность и выбрать комфортный срок.',
      },
      {
        type: 'bullet',
        strong: 'Сравнивайте условия',
        text: ' Учитывайте пополнение, частичное снятие и требования к минимальной сумме.',
      },
    ],
  },
  bonus: {
    title: 'Бонусы',
    action: 'Посмотреть бонусы',
    sections: [
      {
        type: 'lead',
        text: 'Бонусы помогают получать выгоду внутри сервиса и превращают активность на Авито в ощутимую экономию.',
      },
      {
        type: 'bullet',
        strong: '1 бонус = 1 ₽',
        text: ' Бонусами можно компенсировать часть стоимости в поддерживаемых сценариях.',
      },
      {
        type: 'bullet',
        strong: 'Копите постепенно',
        text: ' Вознаграждения накапливаются за действия в сервисе и специальные предложения.',
      },
    ],
  },
  account: {
    title: 'Накопительный счёт',
    action: 'Открыть счёт',
    sections: [
      {
        type: 'lead',
        text: 'Накопительный счёт подойдёт тем, кто хочет хранить деньги с процентами, но без жёсткой фиксации срока.',
      },
      {
        type: 'bullet',
        strong: 'Можно снимать и класть деньги',
        text: ' В любой момент без сложного переоформления продукта.',
      },
      {
        type: 'bullet',
        strong: 'Проценты на остаток',
        text: ' Доход начисляется на сумму, которая лежит на счёте.',
      },
    ],
  },
  credit: {
    title: 'Как улучшить кредитную историю',
    action: 'Самое время взять рассрочку',
    sections: [
      {
        type: 'lead',
        text: 'Просрочки из кредитной истории уже никак не убрать. Но есть способы показать банкам, что вам снова можно доверять ↓',
      },
      {
        type: 'bullet',
        strong: 'Погасить долги',
        text: '. Если нельзя закрыть сразу, главное вовремя вносить платежи.',
      },
      {
        type: 'bullet',
        strong: 'Рефинансировать кредиты',
        text: '. Так и вам проще гасить один кредит вместо нескольких, и в кредитной истории будет только один активный договор.',
      },
      {
        type: 'bullet',
        strong: 'Переводить все деньги на дебетовую карту',
        text: '. Важно, чтобы банк видел регулярные пополнения на ваше имя.',
      },
      {
        type: 'bullet',
        strong: 'Взять товар в рассрочку',
        text: '. На небольшую сумму проще получить одобрение, а дальше с каждым платежом банк будет видеть, что вы справляетесь и соблюдаете условия.',
      },
    ],
  },
  wallet: {
    title: 'Кошелёк',
    action: 'Открыть кошелёк',
    sections: [
      {
        type: 'lead',
        text: 'Кошелёк помогает быстрее платить внутри Авито и не терять выгоду в сценариях, где важна скорость и простота оплаты.',
      },
      {
        type: 'bullet',
        strong: 'Меньше шагов при оплате',
        text: ' Платёжный сценарий короче, чем с вводом карты каждый раз.',
      },
      {
        type: 'bullet',
        strong: 'Больше скидок и выгод',
        text: ' В отдельных сценариях кошелёк даёт дополнительную экономию.',
      },
    ],
  },
  promo: {
    title: 'Подбор вкладов',
    action: 'Давайте',
    sections: [
      {
        type: 'lead',
        text: 'Интерактивный промо-блок можно использовать как вход в сценарий сравнения вкладов. Дальше пользователь уходит в подбор предложения.',
      },
    ],
  },
}

const productOnboarding: Record<ProductTileId, ProductOnboardingContent> = {
  wallet: {
    title: 'Получайте скидки при оплате кошельком',
    subtitle: 'Чтобы начать, понадобится меньше минуты',
    footer: 'Партнёр откроет электронное средство платежа на номер +7 977 777-30-30.',
    footerLinks: ['Условия', 'оферта партнёра'],
    action: 'Хочу попробовать',
    illustration: 'wallet',
    benefits: [
      {
        title: 'Экономия на Авито Доставке',
        description: 'С кошельком бывают скидки',
        tone: 'coral',
        icon: 'percent',
      },
      {
        title: 'Мы не берём комиссий',
        description: 'Ни за пополнение, ни за вывод денег',
        tone: 'green',
        icon: 'cross',
      },
      {
        title: 'Мгновенный возврат в кошелёк',
        description: 'Ни дня ожидания, если заказ отменится',
        tone: 'violet',
        icon: 'refund',
      },
      {
        title: 'Можно вывести деньги через СБП',
        description: 'На ваш счёт в любом банке',
        tone: 'blue',
        icon: 'transfer',
      },
    ],
  },
  deposits: {
    title: 'Сравните вклады и выбирайте лучший',
    subtitle: 'Подходящие предложения можно найти за пару минут',
    footer: 'Сервис помогает сравнивать банковские условия, ставки и сроки. Итоговые условия зависят от выбранного банка.',
    action: 'Подобрать вклад',
    illustration: 'deposits',
    benefits: [
      {
        title: 'Доходность наглядно',
        description: 'Сразу видно ставку и срок',
        tone: 'coral',
        icon: 'coins',
      },
      {
        title: 'Условия без скрытых шагов',
        description: 'Пополнение, снятие и лимиты в одном месте',
        tone: 'green',
        icon: 'card',
      },
      {
        title: 'Выбор под цель',
        description: 'Копите на отпуск, подушку или крупную покупку',
        tone: 'violet',
        icon: 'sparkles',
      },
      {
        title: 'Быстрый старт',
        description: 'Переходите к заявке в банк в пару кликов',
        tone: 'blue',
        icon: 'transfer',
      },
    ],
  },
  account: {
    title: 'Накопительный счёт с гибкими условиями',
    subtitle: 'Храните деньги с процентами и свободным доступом',
    footer: 'Условия начисления процентов и доступность продукта зависят от банка-партнёра и выбранного тарифа.',
    action: 'Открыть счёт',
    illustration: 'account',
    benefits: [
      {
        title: 'Пополнение в любое время',
        description: 'Добавляйте деньги без сложных ограничений',
        tone: 'coral',
        icon: 'coins',
      },
      {
        title: 'Проценты на остаток',
        description: 'Доход начисляется на сумму на счёте',
        tone: 'green',
        icon: 'sparkles',
      },
      {
        title: 'Удобно для ежедневного резерва',
        description: 'Деньги доступны, когда они нужны',
        tone: 'violet',
        icon: 'piggy',
      },
      {
        title: 'Оформление онлайн',
        description: 'Без длинной бумажной анкеты',
        tone: 'blue',
        icon: 'card',
      },
    ],
  },
  bonus: {
    title: 'Бонусы помогают экономить на сервисе',
    subtitle: 'Собирайте бонусы и используйте их с выгодой',
    footer: 'Правила начисления и списания бонусов зависят от сценария использования и активных акций.',
    action: 'Посмотреть бонусы',
    illustration: 'bonus',
    benefits: [
      {
        title: '1 бонус = 1 ₽',
        description: 'Часть стоимости можно компенсировать бонусами',
        tone: 'coral',
        icon: 'gift',
      },
      {
        title: 'Бонусы копятся постепенно',
        description: 'За действия в сервисе и спецпредложения',
        tone: 'green',
        icon: 'coins',
      },
      {
        title: 'Выгода в привычных сценариях',
        description: 'Оплата и продвижение с дополнительной экономией',
        tone: 'violet',
        icon: 'sparkles',
      },
      {
        title: 'Прозрачный баланс',
        description: 'Видно, сколько начислено и доступно к списанию',
        tone: 'blue',
        icon: 'card',
      },
    ],
  },
}

const t = typographRu

function StatusBar() {
  return (
    <div className="flex h-11 items-center justify-between px-4">
      <div className="flex items-center gap-1 text-[15px] font-semibold text-black">
        <span>12:22</span>
        <MapPin className="h-3 w-3 fill-black text-black" strokeWidth={2.2} />
      </div>
      <div className="flex items-center gap-[3px] text-black">
        <Signal className="h-[14px] w-[14px]" strokeWidth={2.1} />
        <Wifi className="h-[14px] w-[14px]" strokeWidth={2.1} />
        <div className="relative h-[12px] w-[24px] rounded-[3px] border-[1.5px] border-black">
          <div className="absolute inset-[1.5px] right-[5px] rounded-[2px] bg-black" />
          <div className="absolute right-[-3px] top-[3px] h-[4px] w-[2px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}

function PromoArtwork() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[137px] overflow-hidden">
      <img alt="" className="absolute left-0 top-0 h-[188px] w-[137px]" src={illustrationAssets.banners.deposits} />
    </div>
  )
}

function DepositArtwork() {
  const depositsSvg = illustrationAssets.tiles.deposits
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 h-[174px] w-[174px] overflow-hidden">
      {depositsSvg ? <img alt="" className="absolute left-0 top-0 h-[174px] w-[174px]" src={depositsSvg} /> : null}
    </div>
  )
}

function AccountArtwork() {
  const accountSvg = illustrationAssets.tiles.account
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 h-[174px] w-[174px] overflow-hidden">
      {accountSvg ? (
        <img alt="" className="absolute left-0 top-0 h-[174px] w-[174px]" src={accountSvg} />
      ) : (
        <img alt="" className="absolute left-[-35px] top-[-14px] h-[257px] w-[257px] max-w-none" src={imgRuble} />
      )}
    </div>
  )
}

function BonusArtwork() {
  const bonusSvg = illustrationAssets.tiles.bonus
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 h-[174px] w-[174px] overflow-hidden">
      {bonusSvg ? (
        <img alt="" className="absolute left-0 top-0 h-[174px] w-[174px]" src={bonusSvg} />
      ) : (
        <img alt="" className="absolute left-[-72px] top-[-111px] h-[403px] w-[403px] max-w-none" src={imgBonus} />
      )}
    </div>
  )
}

function WalletArtwork() {
  const walletSvg = illustrationAssets.tiles.wallet
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 h-[174px] w-[174px] overflow-hidden">
      {walletSvg ? <img alt="" className="absolute left-0 top-0 h-[174px] w-[174px]" src={walletSvg} /> : null}
    </div>
  )
}

function TileImage({ image }: { image?: Tile['image'] }) {
  if (image === 'deposits') return <DepositArtwork />
  if (image === 'account') return <AccountArtwork />
  if (image === 'bonus') return <BonusArtwork />
  if (image === 'wallet') return <WalletArtwork />
  return null
}

function ProductTile({ tile, onOpen }: { tile: Tile; onOpen: (id: ProductTileId) => void }) {
  const productId = tile.id as ProductTileId
  return (
    <button
      type="button"
      onClick={() => {
        if (productId in productOnboarding) onOpen(productId)
      }}
      className="flex h-[326px] w-full flex-col overflow-hidden rounded-[20px] bg-[#f2f1f0] text-left transition-transform active:scale-[0.985]"
    >
      <div className="flex h-[152px] flex-col gap-3 px-4 pt-4 text-black">
        <h3 className="text-[18px] font-extrabold leading-[22px] tracking-[0] whitespace-pre-line">{t(tile.title)}</h3>
        <p className="text-[15px] font-medium leading-5 text-black whitespace-pre-line">{tile.description ? t(tile.description) : ''}</p>
      </div>
      <div className="relative h-[174px] w-full">
        <TileImage image={tile.image} />
      </div>
    </button>
  )
}

function ContentTile({ tile, onOpen }: { tile: Tile; onOpen: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(tile.id)}
      className="flex h-40 w-full flex-col justify-between rounded-[20px] bg-[#f2f1f0] px-4 pb-4 pt-4 text-left transition-transform active:scale-[0.985]"
    >
      <h3 className="text-[15px] font-medium leading-5 tracking-[0] text-black">{t(tile.title)}</h3>
      <span className="text-[13px] font-medium leading-[18px] text-[#757575]">{tile.tag ? t(tile.tag) : ''}</span>
    </button>
  )
}

function TileCard({
  tile,
  onOpenProduct,
  onOpenContent,
}: {
  tile: Tile
  onOpenProduct: (id: ProductTileId) => void
  onOpenContent: (id: string) => void
}) {
  return tile.kind === 'product' ? <ProductTile tile={tile} onOpen={onOpenProduct} /> : <ContentTile tile={tile} onOpen={onOpenContent} />
}

function BenefitIconBadge({ tone, icon }: { tone: BenefitTone; icon: BenefitIcon }) {
  const toneClass: Record<BenefitTone, string> = {
    coral: 'bg-[linear-gradient(140deg,#f9b6bd_0%,#ff595d_90%)] text-[#61121d]',
    green: 'bg-[linear-gradient(140deg,#b6eec8_0%,#2fdd66_90%)] text-[#08571e]',
    violet: 'bg-[linear-gradient(140deg,#ddcdf5_0%,#b66ef0_90%)] text-[#472266]',
    blue: 'bg-[linear-gradient(140deg,#b8e2f2_0%,#32aae5_90%)] text-[#114b72]',
  }

  const iconNode =
    icon === 'percent' ? (
      <Percent className="h-[22px] w-[22px]" strokeWidth={2.5} />
    ) : icon === 'cross' ? (
      <X className="h-[22px] w-[22px]" strokeWidth={2.5} />
    ) : icon === 'refund' ? (
      <RotateCcw className="h-[22px] w-[22px]" strokeWidth={2.4} />
    ) : icon === 'transfer' ? (
      <ArrowRightLeft className="h-[22px] w-[22px]" strokeWidth={2.4} />
    ) : icon === 'coins' ? (
      <Coins className="h-[22px] w-[22px]" strokeWidth={2.4} />
    ) : icon === 'card' ? (
      <CreditCard className="h-[22px] w-[22px]" strokeWidth={2.4} />
    ) : icon === 'gift' ? (
      <Gift className="h-[22px] w-[22px]" strokeWidth={2.4} />
    ) : icon === 'piggy' ? (
      <PiggyBank className="h-[22px] w-[22px]" strokeWidth={2.4} />
    ) : (
      <Sparkles className="h-[22px] w-[22px]" strokeWidth={2.4} />
    )

  return <div className={`flex h-[60px] w-[60px] items-center justify-center rounded-[18px] ${toneClass[tone]}`}>{iconNode}</div>
}

function ProductOnboardingHero({ illustration }: { illustration: ProductTileId }) {
  const hero = illustration === 'wallet' ? illustrationAssets.onboarding.wallet : illustrationAssets.tiles[illustration]
  return (
    <div className="relative mt-2 h-[174px] w-full overflow-hidden">
      {hero ? <img alt="" className="h-full w-full object-contain object-center" src={hero} /> : null}
    </div>
  )
}

function ProductOnboarding({
  tileId,
  onClose,
}: {
  tileId: ProductTileId | null
  onClose: () => void
}) {
  if (!tileId) return null
  const onboarding = productOnboarding[tileId]

  return (
    <div className="fixed inset-0 z-[60] animate-sheet-overlay">
      <div className="relative mx-auto h-[min(812px,100dvh)] w-full max-w-[375px]">
        <button
          type="button"
          aria-label="Закрыть шторку"
          className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"
          onClick={onClose}
        />
        <div
          className="absolute bottom-0 left-1/2 flex w-full max-w-[375px] max-h-[calc(100%-60px)] -translate-x-1/2 flex-col overflow-hidden rounded-tl-[28px] rounded-tr-[28px] bg-[#ececec] animate-sheet-up"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="pt-2">
            <div className="mx-auto h-1 w-[39px] rounded-[3px] bg-[#dcdcdc]" />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-5">
            <ProductOnboardingHero illustration={onboarding.illustration} />

            <div className="px-2 text-center">
              <h2 className="text-[24px] font-extrabold leading-[30px] text-black">{t(onboarding.title)}</h2>
              <p className="mt-3 text-[15px] font-medium leading-[22px]">{t(onboarding.subtitle)}</p>
            </div>

            <div className="mt-7 flex flex-col gap-5">
              {onboarding.benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-center gap-3">
                  <BenefitIconBadge tone={benefit.tone} icon={benefit.icon} />
                  <div className="flex-1">
                    <p className="text-[15px] font-medium leading-5 text-black">{t(benefit.title)}</p>
                    <p className="mt-1 text-[13px] font-medium leading-4 text-[#767676]">{t(benefit.description)}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-7 pb-8 text-[13px] font-medium leading-[18px] text-[#7d7d7d]">
              {t(onboarding.footer)}{' '}
              {onboarding.footerLinks ? (
                <>
                  <a
                    href="#"
                    className="underline [text-decoration-skip-ink:none] [text-underline-position:from-font]"
                    onClick={(event) => event.preventDefault()}
                  >
                    {t(onboarding.footerLinks[0])}
                  </a>
                  {', '}
                  <a
                    href="#"
                    className="underline [text-decoration-skip-ink:none] [text-underline-position:from-font]"
                    onClick={(event) => event.preventDefault()}
                  >
                    {t(onboarding.footerLinks[1])}
                  </a>
                  .
                </>
              ) : null}
            </p>
          </div>

          <div className="relative shrink-0 px-4 pb-3 pt-4">
            <div className="pointer-events-none absolute inset-x-0 -top-14 h-14 bg-[linear-gradient(180deg,rgba(236,236,236,0)_0%,#ececec_100%)]" />
            <button type="button" className="h-[52px] w-full rounded-[16px] bg-[#0d0e12] text-[15px] font-medium text-white">
              {t(onboarding.action)}
            </button>
            <div className="mx-auto mt-6 h-[5px] w-[135px] rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BottomSheet({
  tileId,
  onClose,
}: {
  tileId: string | null
  onClose: () => void
}) {
  if (!tileId) return null

  const detail = details[tileId]
  if (!detail) return null

  return (
    <div className="fixed inset-0 z-50 animate-sheet-overlay">
      <div className="relative mx-auto h-[min(812px,100dvh)] w-full max-w-[375px]">
        <button
          type="button"
          aria-label="Закрыть шторку"
          className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"
          onClick={onClose}
        />
        <div
          className="absolute bottom-0 left-1/2 flex w-full max-w-[375px] max-h-[calc(100%-60px)] -translate-x-1/2 flex-col overflow-hidden rounded-tl-[28px] rounded-tr-[28px] bg-white animate-sheet-up"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col items-center bg-white py-2">
            <div className="h-1 w-[39px] rounded-[3px] bg-[#ebeae8]" />
          </div>
          <div className="bg-white pl-4 pr-12">
            <div className="w-10">
              <div className="h-[6px]" />
            </div>
            <h3 className="text-[24px] font-extrabold leading-7 text-black">{t(detail.title)}</h3>
            <div className="w-10">
              <div className="h-[6px]" />
            </div>
          </div>
          <div className="min-h-0 overflow-y-auto bg-white px-4 pb-10 pt-[6px]">
            <div className="w-full text-[15px] font-medium leading-[22px] text-black">
              {detail.sections.map((section, index) =>
                section.type === 'lead' ? (
                  <p key={index} className={index === detail.sections.length - 1 ? '' : 'mb-3'}>
                    {t(section.text)}
                  </p>
                ) : (
                  <p key={index} className={index === detail.sections.length - 1 ? '' : 'mb-3'}>
                    <span className="font-medium">{'✦ '}</span>
                    <span className="font-extrabold">{t(section.strong)}</span>
                    <span>{t(section.text)}</span>
                  </p>
                ),
              )}
            </div>
            <button type="button" className="mt-6 h-12 w-full rounded-[16px] bg-[#171717] px-4 text-[15px] font-medium text-white" onClick={onClose}>
              {t(detail.action)}
            </button>
            <div className="flex justify-center pt-2">
              <div className="h-[5px] w-[135px] rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FinancePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('save')
  const [openedContentTile, setOpenedContentTile] = useState<string | null>(null)
  const [openedProductTile, setOpenedProductTile] = useState<ProductTileId | null>(null)

  const filteredLeft = useMemo(
    () => tilesLeft.filter((tile) => activeTab === 'all' || tile.category.includes(activeTab)),
    [activeTab],
  )
  const filteredRight = useMemo(
    () => tilesRight.filter((tile) => activeTab === 'all' || tile.category.includes(activeTab)),
    [activeTab],
  )

  return (
    <>
      <main className="min-h-screen bg-[#d9d9d9] text-black">
        <div className="mx-auto h-[min(812px,100dvh)] w-full max-w-[375px] overflow-hidden bg-white">
          <StatusBar />

          <div className="h-[calc(100%-44px)] overflow-y-auto pb-10">
            <div className="sticky top-0 z-30 h-[52px] bg-white px-[6px]">
              <div className="relative flex h-full items-center justify-between">
                <button type="button" className="flex h-10 w-10 items-center justify-center text-black">
                  <ArrowLeft className="h-6 w-6" strokeWidth={2.2} />
                </button>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-[2px] text-center text-[16px] font-extrabold leading-5 text-black">
                  {t('Финансы')}
                </div>
                <button type="button" className="ml-auto flex h-10 w-10 items-center justify-center text-black">
                  <CircleHelp className="h-6 w-6 fill-black text-white" strokeWidth={2.2} />
                </button>
              </div>
            </div>

            <section className="flex flex-col gap-10 pt-[10px]">
              <div className="px-4">
                <div className="flex flex-col gap-[11px]">
                  <h1 className="text-[32px] font-extrabold leading-9 text-black">{t('Тут всё про деньги')}</h1>
                  <p className="max-w-[312px] text-[15px] font-medium leading-5 text-black">{t('На Авито найдётся решение любой финансовой задачи')}</p>
                </div>
              </div>

              <div className="overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max gap-[6px]">
                  {tabs.map((tab) => {
                    const isActive = tab.key === activeTab
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex h-9 items-center justify-center rounded-[12px] px-[14px] pb-[11px] pt-[9px] text-[13px] font-medium leading-4 shadow-[0_1px_1.5px_rgba(0,0,0,0),0_4px_15px_rgba(0,0,0,0)] transition-colors ${
                          isActive ? 'bg-[#141414] text-white' : 'bg-[#f2f1f0] text-black'
                        }`}
                      >
                        {t(tab.label)}
                      </button>
                    )
                  })}
                </div>
              </div>
            </section>

            <div className="px-[10px] pb-[6px] pt-6">
              <button
                type="button"
                onClick={() => setOpenedContentTile('promo')}
                className="relative flex w-full overflow-hidden rounded-[20px] bg-[linear-gradient(90deg,#e2ffd6_10%,#f4eefe_90%)] text-left transition-transform active:scale-[0.99]"
              >
                <div className="flex w-[218px] flex-col gap-4 px-5 py-5">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[18px] font-extrabold leading-[22px] text-black">{t('Вклады до 17% годовых')}</h2>
                    <p className="text-[15px] font-medium leading-5 text-black">{t('Посмотрите, что предлагают крупные банки')}</p>
                  </div>
                  <div className="inline-flex h-11 w-fit items-center rounded-[12px] bg-[#141414] px-4 text-[15px] font-medium text-white">
                    {t('Давайте')}
                  </div>
                </div>
                <PromoArtwork />
              </button>
            </div>

            <section className="px-[10px]">
              <div className="flex items-start gap-[6px]">
                <div className="flex w-[174.5px] flex-col gap-[6px]">
                  {filteredLeft.map((tile) => (
                    <TileCard key={tile.id} tile={tile} onOpenProduct={setOpenedProductTile} onOpenContent={setOpenedContentTile} />
                  ))}
                </div>
                <div className="flex w-[174.5px] flex-col gap-[6px]">
                  {filteredRight.map((tile) => (
                    <TileCard key={tile.id} tile={tile} onOpenProduct={setOpenedProductTile} onOpenContent={setOpenedContentTile} />
                  ))}
                </div>
              </div>
            </section>

            <section className="flex flex-col items-center gap-5 px-[10px] pt-[60px]">
              <p className="w-[343px] text-center text-[18px] font-extrabold leading-[22px] text-black">{t('Здесь нет того, что я хочу')} 👀</p>
              <button
                type="button"
                onClick={() => setOpenedContentTile('promo')}
                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#f2f1f0] px-4 text-[15px] font-medium text-black"
              >
                {t('Расскажите нам')}
              </button>
            </section>
          </div>
        </div>
      </main>

      <BottomSheet tileId={openedContentTile} onClose={() => setOpenedContentTile(null)} />
      <ProductOnboarding tileId={openedProductTile} onClose={() => setOpenedProductTile(null)} />
    </>
  )
}

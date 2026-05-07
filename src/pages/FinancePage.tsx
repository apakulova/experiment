import { useState } from 'react'
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
import { ProductGallery } from '@/components/gallery/ProductGallery'
import type { GalleryBlockConfig, GalleryItem } from '@/components/gallery/types'
import { typographRu } from '@/lib/typography'

type TabKey = 'save' | 'borrow' | 'protect' | 'economy' | 'all'
type ProductTileId = 'deposits' | 'account' | 'bonus' | 'wallet'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'save', label: 'Накопить' },
  { key: 'borrow', label: 'Взять деньги' },
  { key: 'protect', label: 'Застраховать' },
  { key: 'economy', label: 'Сэкономить' },
  { key: 'all', label: 'Всё и сразу' },
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
  'osago-payout': {
    title: 'Сколько можно получить по полису ОСАГО',
    action: 'Прицениться к ОСАГО',
    sections: [
      {
        type: 'lead',
        text: 'Если у виновника аварии было ОСАГО, страховая компенсирует пострадавшему:',
      },
      {
        type: 'bullet',
        strong: 'до 500 000 ₽',
        text: ' за вред жизни и здоровью;',
      },
      {
        type: 'bullet',
        strong: 'до 400 000 ₽',
        text: ' за ущерб автомобилю и другому имуществу.',
      },
      {
        type: 'lead',
        text: 'Для этого нужно оформить ДТП через ГИБДД.',
      },
      {
        type: 'lead',
        text: 'При оформлении аварии по европротоколу страховые компенсируют только расходы на ремонт машины пострадавшего.',
      },
      {
        type: 'lead',
        text: 'Виновник ДТП выплаты по ОСАГО не получает.',
      },
    ],
  },
  'mortgage-life': {
    title: 'Зачем страховать жизнь при ипотеке',
    action: 'Мне такое надо',
    sections: [
      {
        type: 'lead',
        text: 'Есть как минимум две причины:',
      },
      {
        type: 'lead',
        text: '✦ Так дешевле. С такой страховкой банки часто снижают ставку на 0,5–1% — выгоднее оформить, чем переплачивать.',
      },
      {
        type: 'lead',
        text: '✦ В случае чего не придётся переживать за жильё. Если заёмщик получит инвалидность или погибнет, страховая разом погасит долг.',
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
  'promo-osago': {
    title: 'ОСАГО',
    action: 'Ну-ка, что там',
    sections: [
      {
        type: 'lead',
        text: 'Сравнить цены в 17 страховых и выбрать самую выгодную.',
      },
    ],
  },
}

const galleryItems: Record<string, GalleryItem> = {
  promo: {
    id: 'promo',
    kind: 'product',
    title: 'Вклады до 17% годовых',
    description: 'Посмотрите, что предлагают крупные банки',
    ctaLabel: 'Давайте',
    imageSrc: illustrationAssets.banners.deposits,
    clickTarget: 'content',
    categories: ['save', 'borrow', 'protect', 'economy', 'all'],
  },
  'promo-osago': {
    id: 'promo-osago',
    kind: 'product',
    title: 'ОСАГО',
    description: 'Сравнить цены в 17 страховых и выбрать самую выгодную',
    ctaLabel: 'Ну-ка, что там',
    imageSrc: illustrationAssets.banners.osago,
    lImagePreset: 'offerContentOsago',
    clickTarget: 'content',
    categories: ['protect', 'all'],
  },
  gosuslugi: {
    id: 'gosuslugi',
    kind: 'content',
    title: 'Зачем Авито нужны Госуслуги',
    tag: '#безопасность',
    categories: ['save', 'protect', 'all'],
  },
  deposits: {
    id: 'deposits',
    kind: 'product',
    title: 'Вклады до 17% годовых',
    description: 'Посмотрите, что предлагают крупные банки',
    imageSrc: illustrationAssets.tiles.deposits,
    categories: ['save', 'economy', 'all'],
  },
  bonus: {
    id: 'bonus',
    kind: 'product',
    title: 'Бонусы',
    description: 'Пользуйтесь Авито с выгодой: 1 бонус = 1 ₽',
    imageSrc: illustrationAssets.tiles.bonus,
    categories: ['save', 'economy', 'all'],
  },
  account: {
    id: 'account',
    kind: 'product',
    title: 'Накопитель-\nный счёт',
    description: 'Можно снимать и класть деньги в любой момент',
    imageSrc: illustrationAssets.tiles.account,
    categories: ['save', 'protect', 'all'],
  },
  credit: {
    id: 'credit',
    kind: 'content',
    title: 'Как улучшить кредитную историю',
    tag: '#кредиты',
    categories: ['save', 'borrow', 'protect', 'all'],
  },
  'osago-payout': {
    id: 'osago-payout',
    kind: 'content',
    title: 'Сколько можно получить по полису ОСАГО',
    tag: '#страховки',
    categories: ['protect', 'all'],
  },
  'mortgage-life': {
    id: 'mortgage-life',
    kind: 'content',
    title: 'Зачем страховать жизнь при ипотеке',
    tag: '#страховки',
    categories: ['protect', 'all'],
  },
  wallet: {
    id: 'wallet',
    kind: 'product',
    title: 'Кошелёк',
    description: 'Он даёт скидки, а сэкономил — считай заработал',
    imageSrc: illustrationAssets.tiles.wallet,
    categories: ['save', 'economy', 'all'],
  },
}

const defaultGalleryBlocks: GalleryBlockConfig[] = [
  {
    id: 'promo-banner',
    layout: 'L',
    itemIds: ['promo'],
  },
  {
    id: 'main-grid',
    layout: 'S+M+M|M+S+M',
    itemIds: ['gosuslugi', 'deposits', 'bonus', 'account', 'credit', 'wallet'],
  },
]

const galleryBlocksByTab: Record<TabKey, GalleryBlockConfig[]> = {
  save: defaultGalleryBlocks,
  borrow: defaultGalleryBlocks,
  protect: [
    {
      id: 'protect-promo-banner',
      layout: 'L',
      itemIds: ['promo-osago'],
    },
    {
      id: 'protect-grid',
      layout: 'S+S+M',
      itemIds: ['osago-payout', 'mortgage-life', 'account'],
    },
  ],
  economy: defaultGalleryBlocks,
  all: defaultGalleryBlocks,
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
          className="absolute bottom-0 left-1/2 flex w-full max-w-[375px] max-h-[calc(100%-60px)] -translate-x-1/2 flex-col overflow-hidden rounded-tl-[28px] rounded-tr-[28px] bg-white animate-sheet-up"
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
            <div className="pointer-events-none absolute inset-x-0 -top-14 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_100%)]" />
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

            <div className="pt-6">
              <ProductGallery
                activeTab={activeTab}
                blocks={galleryBlocksByTab[activeTab]}
                itemsById={galleryItems}
                onOpenProduct={(id) => {
                  if (id in productOnboarding) setOpenedProductTile(id as ProductTileId)
                }}
                onOpenContent={setOpenedContentTile}
              />
            </div>

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

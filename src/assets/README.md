## Banner Assets

Сюда складываем экспортированные из Figma ассеты для баннеров и карточек.

### Куда загружать

- Баннеры: `src/assets/banners/`
- Карточки/плитки: `src/assets/tiles/`
- Временные или тестовые экспорты: `src/assets/inbox/`

### Формат

- Предпочтительно: `SVG`
- `PNG` только если исходник растровый

### Именование

Используй короткие стабильные имена в kebab-case:

- `deposits-offer.svg`
- `wallet-card.svg`
- `bonus-tile.svg`

Для текущего экрана `Финансы` лучше придерживаться такой структуры:

- `src/assets/banners/Offer-Content/deposits-banner.svg`
- `src/assets/banners/Offer-Content/installments-banner.svg`
- `src/assets/tiles/ProductItem/deposits-tile.svg`
- `src/assets/tiles/ProductItem/wallet-tile.svg`
- `src/assets/tiles/ProductItem/account-tile.svg`
- `src/assets/tiles/ProductItem/bonus-tile.svg`

Если есть несколько версий:

- `deposits-offer-v2.svg`
- `deposits-offer-dark.svg`

### Как будем работать

1. Ты кладешь экспорт сюда.
2. Пишешь мне имя файла.
3. Я подключаю его в нужный экран и подгоняю позиционирование по макету.

Важно: лучше использовать ASCII-имена файлов без пробелов и спецсимволов. Это снижает шанс ошибок на GitHub Actions и Linux.

### Как подключено сейчас

Центральный реестр иллюстраций лежит в:

- `src/assets/illustrations.ts`

Дальше я беру SVG оттуда, а не импортирую по проекту хаотично.

# React + TailwindCSS + shadcn/ui

Проект подготовлен на базе Vite (React + TypeScript) c подключенными:

- TailwindCSS
- конфигом `components.json` для shadcn/ui
- базовыми компонентами `Button` и `Card` из shadcn-подхода

## Запуск

```bash
npm install
npm run dev
```

## Deploy

После пуша в `main` сайт автоматически деплоится на GitHub Pages через workflow:

- `.github/workflows/deploy-pages.yml`

## Добавление компонентов shadcn/ui

После установки зависимостей можно использовать CLI shadcn:

```bash
npx shadcn@latest add button
```

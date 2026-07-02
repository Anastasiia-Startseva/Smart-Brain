# SmartBrain

**SmartBrain** — портфолио-проект: AI-приложение для заметок с rich-text редактором, чатом и быстрыми командами редактирования.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)

## Demo

> Добавьте ссылку на деплой после публикации на Vercel.

## Возможности

- **Rich-text редактор** на базе TipTap (StarterKit)
- **AI-чат** с контекстом текущей заметки
- **AI-команды**: исправление, саммари, профессиональный стиль
- **Поиск** по заголовку и содержимому заметок
- **Локальное хранение** через Zustand + localStorage
- **Тёмная тема** и адаптивная вёрстка (desktop / mobile)
- **Горячие клавиши**: `Ctrl+N` — новая заметка, `Ctrl+K` — поиск

## Стек

| Категория | Технологии |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| State | Zustand (persist) |
| Editor | TipTap |
| AI | Vercel AI SDK, OpenAI API |
| Language | TypeScript |

## Быстрый старт

```bash
git clone https://github.com/Anastasiia-Startseva/Smart-Brain.git
cd Smart-Brain
npm install
cp .env.example .env.local
# добавьте OPENAI_API_KEY в .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| `OPENAI_API_KEY` | API-ключ OpenAI для AI-чата и команд |

## Скрипты

```bash
npm run dev      # dev-сервер
npm run build    # production-сборка
npm run start    # запуск production
npm run lint     # ESLint
npm run typecheck # проверка TypeScript
```

## Структура проекта

```
src/
├── app/                 # App Router, API routes, стили
├── components/
│   ├── features/        # Editor, AI Chat, AI Toolbar
│   └── shared/          # Sidebar, dialogs, mobile header
├── hooks/               # theme, shortcuts, mobile sidebar
├── lib/                 # утилиты для заметок
└── store/               # Zustand store
components/ui/           # shadcn/ui компоненты
```

## Автор

**Anastasiia Startseva** — Frontend Developer (Junior+)

- GitHub: [@Anastasiia-Startseva](https://github.com/Anastasiia-Startseva)

## Лицензия

MIT

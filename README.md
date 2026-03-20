# React Dummy JSON Project

Веб-приложение (каталог и авторизация) на Next.js 15, Zustand, TypeScript типизация, Docker контейнеризации.
Использует [API DummyJSON](https://dummyjson.com/)

## 🚀 Стек технологий

- Next.js 15 (App Router), TypeScript
- Zustand
- Axios
- SCSS / CSS Modules
- _Linting:_ ESLint 9+ (Flat Config) + simple-import-sort, Prettier, Stylelint
- _Infrastructure:_ Docker (Multi-stage build)

## 🛠 Настройка окружения

Клонируйте репозиторий

```bash
git clone https://github.com/lazenyuk-dmitry/react_dummy_json.git
cd react_dummy_json
```

Настройте переменные окружения (скопируйте и переименуйте .env.example -> .env)

Можно создать копию командой в терминале

```bash
# Linux / macOS / Git Bash
cp .env.example .env
# В Windows (PowerShell)
copy .env.example .env
```

Заполните .env

```bash
NEXT_PUBLIC_BASE_API_URL='https://dummyjson.com'
```

## 🐳 Docker (Production)

Проект оптимизирован для работы в Docker. Используется Standalone режим Next.js, что уменьшает размер образа до ~120MB.

### Сборка и запуск через Docker Compose

```bash
docker-compose up --build
```

### Особенности Dockerfile

- Multi-stage build: Разделение на этапы deps, builder и runner.
- Security: Запуск от имени не-root пользователя (nextjs с UID 1001).
- Optimization: Копируются только необходимые артефакты (standalone и static).

## 📦 Команды для разработки

### Локальный запуск

```bash
npm install
npm run dev
```

### Линтинг и форматирование

```bash
npm run lint -- --fix
```

## 📝 Правила импортов

В проекте настроена автоматическая сортировка импортов по следующим группам:

- React и внешние библиотеки.
- Внутренние алиасы (@/components, @/lib и т.д.).
- Относительные пути (../).
- Локальные файлы (./).
- Типы.
- Стили (.scss, .css).

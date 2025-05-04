# Описание

Frontend приложение для [конфигуратора](https://github.com/vikovaro/ConfiguratorBackend).


## Используемые технологии
- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **ESLint**

## Запуск проекта

### 1. Установка зависимостей
```
npm install
```

### 2. Запуск в режиме разработки (порт 3002)
```
npm run dev
```

### 3. Сборка и запуск production-версии
```
npm run build
npm start
```

### 4. Порт

По умолчанию используется порт **3002**. Порт изменяется в `package.json`.

## Структура
- `/app` — основные страницы и компоненты
- `/app/components` — переиспользуемые компоненты (модальные окна, список сборок и т.д.)
- `/app/types.ts` — типы данных


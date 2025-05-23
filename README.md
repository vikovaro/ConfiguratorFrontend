# Описание

Frontend приложение для [конфигуратора](https://github.com/vikovaro/ConfiguratorBackend).

<p align="center">
    <img src="https://raw.githubusercontent.com/vikovaro/ConfiguratorFrontend/refs/heads/main/project-images/1.jpg"/>
    <img src="https://raw.githubusercontent.com/vikovaro/ConfiguratorFrontend/refs/heads/main/project-images/2.jpg"/>
    <img src="https://raw.githubusercontent.com/vikovaro/ConfiguratorFrontend/refs/heads/main/project-images/3.jpg"/>
</p>

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


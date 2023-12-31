**Задача:**
* Создать бекенд на NestJS.
* Добавить Swager.
* Добавить метод на загрузку файлов большого объема.
* Убрать CORS.
* Добавить документацию на использование.

**Решение:** \
Разработано mini backend приложение, которое имеет следующие апи:
1. POST /files - Загрузка файла
2. GET /files - Получение списка ранее загруженных файлов
3. GET /files/:id - Получение информации о файле

Для сохранения информации о файлах была реализована импровизированная база данных,
которая состоит из основного файла базы данных (database.txt) и папки files (
в ней сохраняются загруженные файлы (сопутствующая информация о файле и буфер файла))

Для документирования API использовался Swagger, для тестирования можно
использовать его же или POSTMAN

**Основные URL проекта:** \
* URL API: http://localhost:3000/files
* Документация API: http://localhost:3000/api

**Структура проекта** \
![База данных -Страница — 2.drawio.png](%D0%91%D0%B0%D0%B7%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20-%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0%20%E2%80%94%202.drawio.png) 

**Запуск проекта:**
1. Произвести клонирование проекта с репозитория
2. Установить все зависимости (npm install)
3. Запустить проект (npm run start)

**Требования**
node v19.8.1

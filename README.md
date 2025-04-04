# TaskFlow 🚀

**Умный менеджер задач с интеграцией в календарь и совместной работой**  

---

## 🌟 Особенности

### Основной функционал
- 📝 **Создание/Редактирование/Удаление задач** с детальным описанием  
- 🚦 **Статусы задач**: Новая, В процессе, Завершена, Архивная  
- ⏰ **Умные напоминания** 
- 📅 **Интеграция с Google Calendar и Outlook**  
- 🔐 **Аутентификация** через JWT и OAuth2 (Google, GitHub)  

### Дополнительные возможности
- 🏷️ **Теги и фильтры** для быстрого поиска (цветовые метки + категории)  
- 👥 **Совместная работа**:  
  - Приглашение пользователей по email  
  - Комментарии и история изменений  
  - Ролевой доступ (владелец, редактор, наблюдатель)  
- 📊 **Статистика продуктивности** (графики выполнения задач)  

---

## 🛠️ Технологии

- **Backend**: JavaScript
- **Frontend**: React + Redux Toolkit + Material-UI  


---

## ⚡ Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/Denis-Mist/front7

# Установить зависимости
cd backend
npm init -y
npm install express jsonwebtoken body-parser cors
node server.js


cd frontend
npm init -y
npm install express
node server.js


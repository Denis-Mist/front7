const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const secretKey = 'your_secret_key'; // секрет для подписи JWT

// Массив для хранения пользователей
const users = [];

// Middleware для разбора JSON
app.use(bodyParser.json());
app.use(cors());

// Middleware для проверки JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // формат: Bearer token

  if (!token) return res.status(401).json({ message: 'Токен не найден' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Неверный токен' });
    req.user = user;
    next();
  });
}

// Маршрут регистрации
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Проверка на существование пользователя
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  // Добавляем пользователя в память
  users.push({ username, password });
  res.json({ message: 'Регистрация прошла успешно' });
});

// Маршрут входа (аутентификации)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Ищем пользователя
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
  }
  // Генерируем JWT
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  res.json({ message: 'Успешный вход', token });
});

// Защищённый маршрут
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Это защищённые данные', user: req.user });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

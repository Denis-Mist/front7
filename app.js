// Элементы авторизации и приложения
const authSection = document.getElementById('auth');
const appSection = document.getElementById('app');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const usernameInput = document.getElementById('username');

// Переменные для хранения текущего пользователя и задач
let currentUser = '';
let tasks = [];
let taskId = 0;

// Функция сохранения задач в localStorage для текущего пользователя
function saveTasks() {
  localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
}

// Функция загрузки задач из localStorage для текущего пользователя
function loadTasks() {
  const savedTasks = localStorage.getItem(`tasks_${currentUser}`);
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
  // Обновляем taskId для предотвращения повторения id (находим максимум по id)
  if (tasks.length > 0) {
    taskId = Math.max(...tasks.map(t => t.id)) + 1;
  } else {
    taskId = 0;
  }
  renderTasks();
}

// Обработка входа пользователя
loginBtn.addEventListener('click', () => {
  if (usernameInput.value.trim() !== '') {
    currentUser = usernameInput.value.trim();
    loadTasks();
    authSection.classList.add('hidden');
    appSection.classList.remove('hidden');
  } else {
    alert('Введите имя пользователя');
  }
});

// Обработка выхода пользователя
logoutBtn.addEventListener('click', () => {
  authSection.classList.remove('hidden');
  appSection.classList.add('hidden');
  currentUser = '';
  tasks = [];
});

// Функция добавления новой задачи
function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDescription').value.trim();
  const status = document.getElementById('taskStatus').value;
  const dueDate = document.getElementById('dueDate').value;
  const tags = document.getElementById('taskTags').value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');

  if (title === '') {
    alert('Заголовок задачи обязателен');
    return;
  }

  const task = {
    id: taskId++,
    title,
    description,
    status,
    dueDate,
    tags,
    collaborators: []
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  clearForm();
}

// Функция очистки формы ввода
function clearForm() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('taskTags').value = '';
  document.getElementById('taskStatus').value = 'новая';
}

// Функция отображения списка задач
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <strong>${task.title}</strong> [${task.status}]<br>
      <em>Срок: ${task.dueDate ? new Date(task.dueDate).toLocaleString() : 'не установлен'}</em><br>
      <p>${task.description}</p>
      <p>Теги: ${task.tags.join(', ')}</p>
      <div class="task-controls">
        <button onclick="editTask(${task.id})">Редактировать</button>
        <button onclick="deleteTask(${task.id})">Удалить</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  renderCalendar();
}

// Функция редактирования задачи
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    // Заполнение формы данными выбранной задачи для редактирования
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('taskTags').value = task.tags.join(', ');
    document.getElementById('taskStatus').value = task.status;

    // Удаляем старую задачу; при сохранении она будет добавлена вновь с обновлёнными данными
    deleteTask(id);
  }
}

// Функция удаления задачи
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Привязка события к кнопке добавления задачи
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Функция отображения календаря задач (список задач с датами)
function renderCalendar() {
  const calendarView = document.getElementById('calendarView');
  calendarView.innerHTML = '<h3>Ближайшие задачи:</h3>';

  const tasksWithDate = tasks
    .filter(task => task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  if (tasksWithDate.length === 0) {
    calendarView.innerHTML += '<p>Нет задач с установленными сроками</p>';
    return;
  }

  const ul = document.createElement('ul');
  tasksWithDate.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.title} – ${new Date(task.dueDate).toLocaleString()}`;
    ul.appendChild(li);
  });
  calendarView.appendChild(ul);
}

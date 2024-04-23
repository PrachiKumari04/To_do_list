document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToList(task));
});

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  
  if (taskText !== '') {
    const task = { id: Date.now(), text: taskText };
    addTaskToList(task);
    saveTask(task);
    taskInput.value = '';
  }
}

function addTaskToList(task) {
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = `
    <span onclick="deleteTask(${task.id})">❌</span>
    <span class="edit" onclick="editTask(${task.id})">✏️</span>
    ${task.text}`;
  taskList.appendChild(li);
}

function deleteTask(id) {
  const taskList = document.getElementById('taskList');
  const taskItem = document.querySelector(`li span[onclick="deleteTask(${id})"]`).parentElement;
  taskList.removeChild(taskItem);
  removeTaskFromStorage(id);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function editTask(id) {
  const newText = prompt("Edit task:", "");
  if (newText !== null && newText.trim() !== "") {
    const taskList = document.getElementById('taskList');
    const taskItem = document.querySelector(`li span[onclick="editTask(${id})"]`).nextSibling;
    taskItem.textContent = newText.trim();
    updateTaskInStorage(id, newText.trim());
  }
}

function updateTaskInStorage(id, newText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.text = newText;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

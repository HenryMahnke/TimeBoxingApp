const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskStart = document.getElementById("task-start");
const taskEnd = document.getElementById("task-end");

const tasks = [];

function createTask(title, start, end) {
  const newTask = { id: Date.now(), title, start, end };
  tasks.push(newTask);
  renderTasks();
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}

function formatTime(time) {
  return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "bg-white p-4 rounded shadow-md mb-4 flex justify-between items-center";
    const titleElement = document.createElement("span");
    titleElement.className = "font-bold";
    titleElement.textContent = task.title;
    const timeElement = document.createElement("span");
    timeElement.textContent = `${formatTime(task.start)} - ${formatTime(task.end)}`;
    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.className = "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600";
    deleteButtonElement.textContent = "Delete";
    deleteButtonElement.addEventListener("click", () => deleteTask(task.id));
    taskElement.appendChild(titleElement);
    taskElement.appendChild(timeElement);
    taskElement.appendChild(deleteButtonElement);
    taskList.appendChild(taskElement);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskTitle.value.trim();
  const start = new Date(`2000-01-01T${taskStart.value}`);
  const end = new Date(`2000-01-01T${taskEnd.value}`);
  if (title && start < end) {
    createTask(title, start, end);
    taskTitle.value = "";
    taskStart.value = "";
    taskEnd.value = "";
  }
});

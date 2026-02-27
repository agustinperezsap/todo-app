export function createTaskView() {

  const taskList = document.getElementById("task-list");
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");

  function bindAddTask(handler) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const title = input.value.trim();
      if (!title) return;

      handler(title);
      input.value = "";
    });
  }

  function bindToggleTask(handler) {
    taskList.addEventListener("click", event => {
      if (event.target.dataset.action === "toggle") {
        const id = Number(event.target.dataset.id);
        handler(id);
      }

      if (event.target.dataset.action === "delete") {
        const id = Number(event.target.dataset.id);
        handler(id);
      }
    });
  }

  function renderTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span style="text-decoration: ${task.completed ? "line-through" : "none"}">
          ${task.title}
        </span>
        <button data-action="toggle" data-id="${task.id}">
          ${task.completed ? "Undo" : "Done"}
        </button>
        <button data-action="delete" data-id="${task.id}">
          Delete
        </button>
      `;

      taskList.appendChild(li);
    });
  }

  return {
    bindAddTask,
    bindToggleTask,
    renderTasks
  };
}
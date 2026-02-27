export function createTaskModel() {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let idCounter = tasks.length > 0 
    ? Math.max(...tasks.map(t => t.id)) + 1 
    : 1;

  function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function create(title) {
    await delay(200);

    const newTask = {
      id: idCounter++,
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    save();
    return newTask;
  }

  async function toggle(id) {
    await delay(200);

    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error("Task not found");

    task.completed = !task.completed;
    save();
    return task;
  }

  async function remove(id) {
    await delay(200);

    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Task not found");

    const deleted = tasks.splice(index, 1)[0];
    save();
    return deleted;
  }

  async function getAll() {
    await delay(100);
    return [...tasks];
  }

  return { create, toggle, remove, getAll };
}
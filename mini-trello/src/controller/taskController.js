export function createTaskController(model, view) {

  async function init() {
    const tasks = await model.getAll();
    view.renderTasks(tasks);
  }

  async function handleAdd(title) {
    await model.create(title);
    const tasks = await model.getAll();
    view.renderTasks(tasks);
  }

  async function handleToggle(id) {
    await model.toggle(id);
    const tasks = await model.getAll();
    view.renderTasks(tasks);
  }

  async function handleDelete(id) {
    await model.remove(id);
    const tasks = await model.getAll();
    view.renderTasks(tasks);
  }

  view.bindAddTask(handleAdd);
  view.bindToggleTask((id) => handleToggle(id));
  view.bindToggleTask((id) => handleDelete(id));

  return { init };
}
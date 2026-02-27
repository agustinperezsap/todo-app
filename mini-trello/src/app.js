import { createTaskModel } from "./model/taskModel.js";
import { createTaskView } from "./view/taskView.js";
import { createTaskController } from "./controller/taskController.js";

const model = createTaskModel();
const view = createTaskView();
const controller = createTaskController(model, view);

controller.init();
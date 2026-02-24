//logica de negocios
import { tasks, idCounter } from "./data.js";
import { delay } from "./utils.js";

export async function createTask(title){
    await delay(300);

    const newTask = {
        id: tasks.length + 1, 
        title,
        completed: falsed,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    return newTask;
}



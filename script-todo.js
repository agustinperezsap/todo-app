// estado de la app
let tareas = [];

let filtroActual = "todas";

const contador = document.getElementById("contador");

const tareasGuardadas = localStorage.getItem("tareas");

const btnLimpiar = document.getElementById("btnLimpiar");




function actualizarContador(){
    const total = tareas.length;
    const pendientes = tareas.filter(t => !t.completada).length;

    contador.textContent = `Pendientes: ${pendientes} / Total: ${total}`;
}

if(tareasGuardadas){
    tareas = JSON.parse(tareasGuardadas);
}

// 📌 JSON.parse:

// texto → array real

// elementos del DOM
const input = document.getElementById("inputTarea");
const boton = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");

// render
// Porque:

// el DOM puede estar mal

// el array no
function render() {
    let tareasFiltradas = tareas;
    
    if (filtroActual === "pendientes") {
        tareasFiltradas = tareas.filter(t => !t.completada);
    }

    if (filtroActual === "completadas") {
        tareasFiltradas = tareas.filter(t => t.completada);
    }

    lista.innerHTML = "";

    tareasFiltradas.forEach(function(tarea, index) {
        const li = document.createElement("li");
        
        const span = document.createElement("span");
        span.textContent = tarea.texto;

        if (tarea.completada) {
            span.classList.add("tarea-completada");
        }

        const btnCheck = document.createElement("button");
        btnCheck.textContent = "✔️";
        btnCheck.style.marginLeft = "10px";

        btnCheck.addEventListener("click", function(){
            toggleCompletada(index);
        });

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "✏️";
        btnEditar.style.marginLeft = "10px";

        btnEditar.addEventListener("click", function(){
            editarTarea(index);
        })

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.style.marginLeft = "5px";

        btnEliminar.addEventListener("click", function () {
            eliminarTarea(index);
        });

        li.appendChild(btnCheck);
        li.appendChild(span);
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
         
        lista.appendChild(li);

    });
    actualizarContador();
}

function editarTarea(indice){
    const nuevoTexto = prompt(
        "Editar tarea", 
        tareas[indice].texto
    );

    if (nuevoTexto == null || nuevoTexto.trim() == "") return;

    tareas[indice].texto = nuevoTexto.trim();
    guardarTareas();
    render();

}

function eliminarTarea(indice){
    tareas.splice(indice, 1);
    guardarTareas();
    render();
}


// logica

function limpiarCompletadas() {
    tareas = tareas.filter(t => !t.completada);
    guardarTareas();
    render();
}


function agregarTarea(){
    const texto = input.value.trim();

    if (texto === "") return;

    tareas.push({
        texto: texto,
        completada: false
    });
    
    input.value = "";
    input.focus();
    
    guardarTareas();
    render();
}

function toggleCompletada(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    guardarTareas();
    render();
}

// Eventos

btnLimpiar.addEventListener("click", limpiarCompletadas);

boton.addEventListener("click", agregarTarea);

document.getElementById("filtro-todas").addEventListener("click",()=>{
    filtroActual = "todas";
    render();
});

document.getElementById("filtro-pendientes").addEventListener("click", ()=>{
    filtroActual = "pendientes";
    render();
});

document.getElementById("filtro-completadas").addEventListener("click", () => {
    filtroActual = "completadas";
    render();
});

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        agregarTarea();
    }
});



// Si el JS no está vinculado → el navegador actúa como si no existiera.

// Guardamos el estado

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// 📌 JSON.stringify:

// convierte arrays/objetos → texto

// porque localStorage solo guarda strings

render();
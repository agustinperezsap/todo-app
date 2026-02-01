// estado de la app
let tareas = [];

let filtroActual = "todas";

const contador = document.getElementById("contador");

const tareasGuardadas = localStorage.getItem("tareas");

const btnLimpiar = document.getElementById("btnLimpiar");

const btnLimpiarHoy = document.getElementById("btnLimpiarHoy");

const btnExportar = document.getElementById("btnExportar");

const btnTema = document.getElementById("btnTema");



function actualizarContador(){
    const total = tareas.length;
    const pendientes = tareas.filter(t => !t.completada).length;

    contador.textContent = `Pendientes: ${pendientes} / Total: ${total}`;
}

if(tareasGuardadas){
    tareas = JSON.parse(tareasGuardadas);
}

//Guarda el modo Oscuro en localStorage 
const temaGuardado = localStorage.getItem("temaOscuro");

if (temaGuardado === "true") {
    document.body.classList.add("dark");
}

// 📌 JSON.parse:

// texto → array real

// elementos del DOM
const input = document.getElementById("inputTarea");
const boton = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const listaHoy = document.getElementById("listaHoy");


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

        setTimeout(() => li.classList.add("mostrar"), 10);

        const span = document.createElement("span");
        span.textContent = tarea.texto;

        if (tarea.completada) {
            span.classList.add("tarea-completada");
        }

        const btnCheck = document.createElement("button");
        btnCheck.textContent = "✔️";

        btnCheck.addEventListener("click", () => toggleCompletada(index));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";

        btnEliminar.addEventListener("click", () => eliminarTarea(index));

        li.appendChild(btnCheck);
        li.appendChild(span);
        li.appendChild(btnEliminar);

        lista.appendChild(li);
    });

    actualizarContador();
    renderCompletadasHoy();
}
function exportarTareasHoy(){
    const hoy = new Date().toISOString().slice(0, 10);

    const tareasHoy = tareas.filter(
        t => t.completada && t.fechaCompletada === hoy
    );

    if (tareasHoy.length === 0){
        alert("No hay tareas completadas hoy. ");
        return;
    }

    let contenido = "tareas completadas hoy\n\n";

    tareasHoy.forEach(t => {
        contenido += "✔️" + t.texto + "\n";
    });

    const blob = new Blob([contenido], { type: "text/plain"});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tareas-hoy.txt";
    a.click();

    URL.revokeObjectURL(url);

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
    const li = lista.children[indice];
    li.classList.add("eliminar")

    setTimeout(() => {
        tareas.splice(indice, 1);
        guardarTareas();
        render();
    }, 300);
    
}


// logica

function limpiarCompletadas() {
    tareas = tareas.filter(t => !t.completada);
    guardarTareas();
    render();
}

function renderCompletadasHoy(){
    const hoy = new Date().toISOString().slice(0,10);

    const tareasHoy = tareas.filter(
        t => t.completada && t.fechaCompletada === hoy
    );

    listaHoy.innerHTML = "";

    tareasHoy.forEach(t =>{
        const li = document.createElement("li");
        li.textContent = t.texto;
        listaHoy.appendChild(li);
    });
}

function limpiarCompletadasHoy() {
    const hoy = new Date().toISOString().slice(0, 10);

    const confirmar = confirm(
        "¿Estás seguro de borrar las tareas realizadas hoy?"
    );

    if (!confirmar) return;

    tareas = tareas.filter(
        t => !(t.completada && t.fechaCompletada === hoy)
    );

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
    const tarea = tareas[indice];

    tarea.completada = !tarea.completada;

    if (tarea.completada) {
        tarea.fechaCompletada = new Date().toISOString().slice(0,10);
    } else{
        tarea.fechaCompletada = null;
    }

    guardarTareas();
    render();

    setTimeout(() => {
        const li = lista.children[indice];
        if (li) {
            li.classList.add("tarea-flahs", "tarea-bounce");
        }
    }, 10);
}

function toggleTema(){
    document.body.classList.toggle("dark");

    const esOscuro = document.body.classList.contains("dark");

    localStorage.setItem("temaOscuro", esOscuro);

    btnTema.textContent = esOscuro ? "☀️ Modo claro" : "🌙 Modo Oscuro";

}



// Eventos

btnTema.addEventListener("click", toggleTema);

btnLimpiar.addEventListener("click", limpiarCompletadas);

btnLimpiarHoy.addEventListener("click", limpiarCompletadasHoy);

boton.addEventListener("click", agregarTarea);

btnExportar.addEventListener("click", exportarTareasHoy);

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
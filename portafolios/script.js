
let tareas = [];
for (let i = 0; i < 3; i++) {
    let tareaNueva = prompt(`${i+1} Ingrese una terea: `);
    tareas.push(tareaNueva);
}
let respuesta = prompt("Quieres agregar una nueva tarea? (si/no)").toLocaleLowerCase();

let deseaAgregar = (respuesta === "si");
if (deseaAgregar) {
    let otra = prompt("Ingrese la nueva tarea: ");
    tareas.push(otra);
}

console.log("La lista de tareas es: ");
console.log(tareas);

// capturando los elementos de HTML
let boton = document.getElementById("boton-saludo");
let mensaje = document.getElementById("mensaje");

// asignar accion al boton 
boton.addEventListener("click", function () {
    let nombre = prompt("Cual es tu nombre?");
    mensaje.textContent = `Hola ${nombre}! lo estas haciendo bien.`;
});

let inputTarea = document.getElementById("nuevaTarea");
let botonAgregar = document.getElementById("agregarTarea");
let listaTareas = document.getElementById("listaTareas");

botonAgregar.addEventListener("click", function(){
    let tarea = inputTarea.value.trim();

    if (tarea === "") {
        alert("Por favor, escribir una tarea antes de agregarla.");
        return;
    }

    let li = document.createElement("li");
    li.textContent = tarea; 

    let botonEliminar =  document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.style.marginLeft = "10px";
    botonEliminar.style.cursor = "pointer";

    botonEliminar.addEventListener("click", function(){
        li.remove();
    });

    li.appendChild(botonEliminar);
 
    listaTareas.appendChild(li);

    inputTarea.value = "";
});

let buscador = document.getElementById("buscador");
let resultado = document.getElementById("resultado");

buscador.addEventListener("input", function(){
    resultado.textContent = buscador.value;
});

let form = document.getElementById("formContacto");

form.addEventListener("submit", function(evento){
    evento.preventDefault(); //evitar que se recarge la pagina ❌
    alert("Formulario enviado (pero sin recargar la pagina)");
});
 

let titulo = document.querySelector("h1");

titulo.classList.add("remarcado"); // agrega clase
titulo.classList.toggle("activo"); // la agrega o la quita
titulo.before("Texto antes del titulo");

//test de local stotage 
// Guardar
localStorage.setItem("nombre", "Agustin");

// Obtener
let nombre = localStorage.getItem("nombre");
console.log(nombre);

// guardar  arrays/objetos (muy importante)
// let tareas = ["correr", "Estudiar"];
localStorage.setItem("tareas", JSON.stringify(tareas));

let tareasGuardar = Jason.parse(localStorage.getItem("tareas"));



// ------------------------------
// VARIABLES Y ELEMENTOS DEL DOM
// ------------------------------
let input = document.getElementById("inputTarea");
let btnAgregar = document.getElementById("btnAgregar");
let lista = document.getElementById("listaTareas");

// let tareas = []; // array que se llenará con localStorage si existe


// ------------------------------
// CARGAR TAREAS DE localStorage AL INICIAR
// ------------------------------
if (localStorage.getItem("tareas")) {
    tareas = JSON.parse(localStorage.getItem("tareas"));
    renderTareas();
}


// ------------------------------
// FUNCIÓN PARA MOSTRAR LAS TAREAS EN PANTALLA
// ------------------------------
function renderTareas() {
    lista.innerHTML = ""; // limpia el UL

    tareas.forEach(function(tarea, index) {
        // Crear li
        let li = document.createElement("li");
        li.textContent = tarea;

        // Si está completada, la marcamos visualmente
        if (tarea.completada) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        btnCompletar.addEventListener("click", function() {
            tareas[index].completada = !tareas[index].completada;
            guardarTareas();
            renderTareas();
        });
        
         // Botón eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.style.marginLeft = "5px";

        btnEliminar.addEventListener("click", function() {
            eliminarTarea(index);
        });

        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}


// ------------------------------
// FUNCIÓN PARA AGREGAR UNA TAREA
// ------------------------------
function agregarTarea() {
    let texto = input.value.trim();

    if (texto === "") {
        alert("Escribí una tarea primero 😅");
        return;
    }

    tareas.push({
        texto: texto,
        completada: false
    });
    input.value = "";

    guardarTareas();
    renderTareas();
}


// ------------------------------
// FUNCIÓN PARA ELIMINAR UNA TAREA
// ------------------------------
function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    guardarTareas();
    renderTareas();
}


// ------------------------------
// GUARDAR EN localStorage
// ------------------------------
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}


// ------------------------------
// EVENTO DEL BOTÓN
// ------------------------------
btnAgregar.addEventListener("click", agregarTarea);

// OPCIONAL: ENTER para agregar tarea
input.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        agregarTarea();
    }
});



const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// 🆕 Contenedor de tareas realizadas
const realizadasContainer = document.createElement("div");
realizadasContainer.innerHTML = "<h3>Tareas Realizadas</h3><ul id='realizadas-list'></ul>";
todoList.parentNode.appendChild(realizadasContainer);
const realizadasList = document.getElementById("realizadas-list");

// 🧠 Recuperar tareas realizadas desde localStorage
let tareasRealizadas = JSON.parse(localStorage.getItem("tareasRealizadas")) || [];
tareasRealizadas.forEach((texto) => {
  const li = document.createElement("li");
  li.textContent = texto;
  li.classList.add("completed");
  realizadasList.appendChild(li);
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const li = crearTarea(taskText);
  todoList.appendChild(li);
  todoInput.value = "";
});

function crearTarea(texto) {
  const li = document.createElement("li");
  li.classList.add("todo-item");

  const span = document.createElement("span");
  span.textContent = texto;

  const acciones = document.createElement("div");
  acciones.classList.add("todo-actions");

  const realizarBtn = document.createElement("button");
  realizarBtn.textContent = "✔️ Realizada";
  realizarBtn.addEventListener("click", () => {
    li.classList.add("completed");
    acciones.remove();
    realizadasList.appendChild(li);

    // Guardar tarea como realizada
    tareasRealizadas.push(span.textContent);
    localStorage.setItem("tareasRealizadas", JSON.stringify(tareasRealizadas));

    if (window.actualizarStatsTareas) {
      window.actualizarStatsTareas();
    }
  });

  const editarBtn = document.createElement("button");
  editarBtn.textContent = "✏️";
  editarBtn.addEventListener("click", () => {
    const nuevoTexto = prompt("Editar tarea:", span.textContent);
    if (nuevoTexto !== null) {
      span.textContent = nuevoTexto.trim();
    }
  });

  const borrarBtn = document.createElement("button");
  borrarBtn.textContent = "🗑️";
  borrarBtn.addEventListener("click", () => {
    li.remove();
  });

  acciones.appendChild(realizarBtn);
  acciones.appendChild(editarBtn);
  acciones.appendChild(borrarBtn);

  li.appendChild(span);
  li.appendChild(acciones);

  return li;
}

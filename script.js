// Variables globales
let currentPage = 1;  // Páginas de la API que estamos mostrando
let isLoading = false; // Para evitar que se haga múltiples solicitudes al mismo tiempo
const API_KEY = "fac5c8b2961a98be95c25dae022aab08"; // Sustituir con tu API Key de TMDB
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// Función para obtener y mostrar películas
async function fetchMovies(query = "") {
  if (isLoading) return;  // Evitar realizar solicitudes si ya estamos cargando

  isLoading = true;
  const url = query 
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}&page=${currentPage}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${currentPage}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
    
    // Incrementar el número de página para la siguiente carga
    currentPage++;
  } catch (error) {
    console.error("Error al obtener las películas:", error);
  } finally {
    isLoading = false;  // Permitimos nuevas solicitudes
  }
}

// Mostrar películas en el grid
function showMovies(movies) {
  const grid = document.getElementById("movie-grid");

  if (movies.length === 0) {
    grid.innerHTML = `<p class="text-center">No se encontraron resultados.</p>`;
  }

  movies.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100";
    card.onclick = () => showModal(movie);

    const img = document.createElement("img");
    img.src = IMAGE_BASE + movie.poster_path;
    img.className = "card-img-top";
    img.alt = movie.title;

    card.appendChild(img);
    col.appendChild(card);
    grid.appendChild(col);
  });
}

// Mostrar modal con detalles de la película
function showModal(movie) {
  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById("modalImage").src = IMAGE_BASE + movie.backdrop_path;
  document.getElementById("modalOverview").textContent = movie.overview;

  // Mostrar duración solo si está disponible
  const runtime = movie.runtime ? `${movie.runtime} minutos` : ''; // Si no hay duración, dejar vacío
  document.getElementById("modalRuntime").textContent = runtime;

  // Mostrar calificación
  const rating = movie.vote_average ? (movie.vote_average / 2).toFixed(1) : 'No disponible'; // Calificación de 5 estrellas
  document.getElementById("modalRating").textContent = `Calificación: ${rating} / 5`;

  // Habilitar el botón de guardar
  const saveBtn = document.getElementById("saveMovieBtn");
  saveBtn.onclick = () => saveMovie(movie);

  const modal = new bootstrap.Modal(document.getElementById("movieModal"));
  modal.show();
}

// Guardar película en localStorage
function saveMovie(movie) {
  let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
  
  // Verificar si ya está guardada
  if (!savedMovies.some(m => m.id === movie.id)) {
    savedMovies.push(movie);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    alert("Película guardada correctamente.");
  } else {
    alert("Esta película ya está en tu lista.");
  }
}

// Mostrar lista de películas guardadas
function showSavedMovies() {
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
  const grid = document.getElementById("movie-grid");
  grid.innerHTML = "";

  if (savedMovies.length === 0) {
    grid.innerHTML = `<p class="text-center">No tienes películas guardadas.</p>`;
  }

  savedMovies.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100";
    card.onclick = () => showModal(movie);

    const img = document.createElement("img");
    img.src = IMAGE_BASE + movie.poster_path;
    img.className = "card-img-top";
    img.alt = movie.title;

    card.appendChild(img);
    col.appendChild(card);
    grid.appendChild(col);
  });
}

// Llamar a fetchMovies al cargar la página
fetchMovies();

// Lógica de búsqueda
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  currentPage = 1;  // Reiniciar la página cuando se haga una nueva búsqueda
  document.getElementById("movie-grid").innerHTML = ""; // Limpiar el grid
  fetchMovies(query);
});

// Lógica para mostrar la lista guardada
const savedMoviesBtn = document.getElementById("savedMoviesBtn");
savedMoviesBtn.onclick = () => {
  showSavedMovies();
};

// Lógica para mostrar el modal de inicio de sesión
const loginBtn = document.getElementById("loginBtn");
loginBtn.onclick = () => {
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
};

// Detectar cuando el usuario llegue al final de la página y cargar más (scroll infinito)
window.onscroll = function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    fetchMovies();
  }
};

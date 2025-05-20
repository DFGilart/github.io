let pomodoroData = JSON.parse(localStorage.getItem("pomodoroData")) || [];
let tareasData = JSON.parse(localStorage.getItem("tareasData")) || [];

let pomodoroChart, tareasChart;

function getFormattedDate() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // formato YYYY-MM-DD
}

function actualizarStatsPomodoro() {
  const today = getFormattedDate();
  const existing = pomodoroData.find(d => d.date === today);
  if (existing) {
    existing.count += 1;
  } else {
    pomodoroData.push({ date: today, count: 1 });
  }
  localStorage.setItem("pomodoroData", JSON.stringify(pomodoroData));
  renderPomodoroChart();
}

function actualizarStatsTareas() {
  const today = getFormattedDate();
  const existing = tareasData.find(d => d.date === today);
  if (existing) {
    existing.count += 1;
  } else {
    tareasData.push({ date: today, count: 1 });
  }
  localStorage.setItem("tareasData", JSON.stringify(tareasData));
  renderTareasChart();
}

function renderPomodoroChart() {
  const ctx = document.getElementById("pomodoroChart").getContext("2d");
  const labels = pomodoroData.map(d => d.date);
  const data = pomodoroData.map(d => d.count);

  if (pomodoroChart) pomodoroChart.destroy();

  pomodoroChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Pomodoros completados",
        data,
        backgroundColor: "#4caf50"
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function renderTareasChart() {
  const ctx = document.getElementById("habitsChart").getContext("2d");
  const labels = tareasData.map(d => d.date);
  const data = tareasData.map(d => d.count);

  if (tareasChart) tareasChart.destroy();

  tareasChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Tareas realizadas",
        data,
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        fill: true
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Hacer las funciones accesibles globalmente
window.actualizarStatsPomodoro = actualizarStatsPomodoro;
window.actualizarStatsTareas = actualizarStatsTareas;

// Inicialización
renderPomodoroChart();
renderTareasChart();

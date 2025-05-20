let isRunning = false;
let isBreak = false;
let timeLeft = 25 * 60;
let timerInterval;

let sessionsCompleted = parseInt(localStorage.getItem("pomodoroSessions")) || 0;

const timeDisplay = document.getElementById("time");
const startPauseBtn = document.getElementById("start-pause");
const resetBtn = document.getElementById("reset");
const sessionsCounter = document.getElementById("sessions");

sessionsCounter.textContent = sessionsCompleted; // Mostrar al cargar

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

function toggleTimer() {
  if (!isRunning) {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        playSound();

        if (!isBreak) {
          sessionsCompleted++;
          localStorage.setItem("pomodoroSessions", sessionsCompleted); // Guardar
          sessionsCounter.textContent = sessionsCompleted;

          if (window.actualizarStatsPomodoro) {
            window.actualizarStatsPomodoro();
          }

          timeLeft = 5 * 60;
          isBreak = true;
          startPauseBtn.textContent = "▶️ Descanso";
        } else {
          timeLeft = 25 * 60;
          isBreak = false;
          startPauseBtn.textContent = "▶️ Iniciar";
        }

        updateDisplay();
      }
    }, 1000);

    isRunning = true;
    startPauseBtn.textContent = "⏸️ Pausar";
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = "▶️ Reanudar";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isBreak = false;
  timeLeft = 25 * 60;
  updateDisplay();
  startPauseBtn.textContent = "▶️ Iniciar";
}

function playSound() {
  const beep = new Audio("assets/sounds/beep.mp3");
  beep.play();
}

startPauseBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
updateDisplay();

const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const habitsContainer = document.getElementById('habits-container');

habitForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const habitText = habitInput.value.trim();
  if (!habitText) return;

  const habitCard = createHabitCard(habitText);
  habitsContainer.appendChild(habitCard);
  habitInput.value = '';
});

function createHabitCard(habitName) {
  const card = document.createElement('div');
  card.className = 'habit';

  const header = document.createElement('div');
  header.className = 'habit-header';

  const title = document.createElement('div');
  title.className = 'habit-title';
  title.textContent = habitName;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.title = 'Eliminar hábito';
  deleteBtn.style.border = 'none';
  deleteBtn.style.background = 'none';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.addEventListener('click', () => {
    card.remove();
  });

  header.append(title, deleteBtn);
  card.appendChild(header);

  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const daysContainer = document.createElement('div');
  daysContainer.className = 'habit-days';

  days.forEach((day, index) => {
    const btn = document.createElement('button');
    btn.textContent = day;
    btn.title = getDayName(index); // Tooltip bonito
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
    daysContainer.appendChild(btn);
  });

  card.appendChild(daysContainer);

  return card;
}

function getDayName(index) {
  return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][index];
}

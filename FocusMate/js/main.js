// Navegación entre secciones
const navItems = document.querySelectorAll('nav li');
const sections = document.querySelectorAll('main section');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.dataset.section;

    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    sections.forEach(sec => {
      sec.classList.remove('active');
      if (sec.id === target) sec.classList.add('active');
    });
  });
});

// Modo oscuro
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

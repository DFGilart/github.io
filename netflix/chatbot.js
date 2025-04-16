// chatbot.js

// Crear el contenedor del chatbot
const chatContainer = document.createElement('div');
chatContainer.style.position = 'fixed';
chatContainer.style.bottom = '20px';
chatContainer.style.right = '20px';
chatContainer.style.width = '300px';
chatContainer.style.maxHeight = '400px';
chatContainer.style.backgroundColor = '#222';
chatContainer.style.borderRadius = '12px';
chatContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
chatContainer.style.overflow = 'hidden';
chatContainer.style.display = 'flex';
chatContainer.style.flexDirection = 'column';
chatContainer.style.fontSize = '14px';
chatContainer.style.zIndex = '9999';

// Crear el botón flotante para abrir/cerrar el chat
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '💬';
toggleBtn.style.position = 'absolute';
toggleBtn.style.bottom = '0';
toggleBtn.style.right = '0';
toggleBtn.style.transform = 'translate(50%, 50%)';
toggleBtn.style.borderRadius = '50%';
toggleBtn.style.width = '50px';
toggleBtn.style.height = '50px';
toggleBtn.style.backgroundColor = '#e50914';
toggleBtn.style.color = 'white';
toggleBtn.style.border = 'none';
toggleBtn.style.fontSize = '24px';
toggleBtn.style.cursor = 'pointer';
toggleBtn.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
toggleBtn.title = "¿Necesitas ayuda para buscar una película?";

let isChatOpen = false;

toggleBtn.onclick = () => {
  isChatOpen = !isChatOpen;
  chatBox.style.display = isChatOpen ? 'flex' : 'none';
};

chatContainer.appendChild(toggleBtn);

// Caja de mensajes
const chatBox = document.createElement('div');
chatBox.style.display = 'none';
chatBox.style.flexDirection = 'column';
chatBox.style.height = '100%';
chatBox.style.padding = '10px';
chatBox.style.overflowY = 'auto';
chatBox.style.color = 'white';
chatBox.style.flexGrow = '1';
chatBox.style.gap = '10px';
chatContainer.appendChild(chatBox);

// Input y botón de enviar
const inputWrapper = document.createElement('div');
inputWrapper.style.display = 'flex';
inputWrapper.style.padding = '10px';
inputWrapper.style.background = '#111';

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Buscar por género o palabra clave...';
input.style.flex = '1';
input.style.padding = '6px 10px';
input.style.borderRadius = '20px';
input.style.border = 'none';
input.style.background = '#333';
input.style.color = 'white';

const sendBtn = document.createElement('button');
sendBtn.textContent = 'Enviar';
sendBtn.style.marginLeft = '5px';
sendBtn.style.border = 'none';
sendBtn.style.background = '#e50914';
sendBtn.style.color = 'white';
sendBtn.style.borderRadius = '20px';
sendBtn.style.padding = '6px 12px';
sendBtn.style.cursor = 'pointer';

inputWrapper.appendChild(input);
inputWrapper.appendChild(sendBtn);
chatContainer.appendChild(inputWrapper);

// Agregar chatbot a la página
document.body.appendChild(chatContainer);

// IA simple: analizar género o palabras clave
sendBtn.onclick = () => {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  addChatMessage('user', userMsg);
  input.value = '';

  // Responder
  const genreKeywords = {
    'acción': 'action',
    'comedia': 'comedy',
    'drama': 'drama',
    'suspenso': 'thriller',
    'terror': 'horror',
    'romance': 'romance',
    'aventura': 'adventure',
    'fantasía': 'fantasy',
    'animación': 'animation'
  };

  const lower = userMsg.toLowerCase();
  let matched = false;

  for (const [clave, tmdbGenre] of Object.entries(genreKeywords)) {
    if (lower.includes(clave)) {
      addChatMessage('bot', `¡Buscando películas de ${clave}! 🎬`);
      searchInput.value = clave;
      searchInput.dispatchEvent(new Event('input'));
      matched = true;
      break;
    }
  }

  if (!matched) {
    addChatMessage('bot', `Buscando películas relacionadas con: "${userMsg}"...`);
    searchInput.value = userMsg;
    searchInput.dispatchEvent(new Event('input'));
  }
};

// Mostrar mensajes en el chat
function addChatMessage(sender, text) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
  msg.style.background = sender === 'user' ? '#e50914' : '#444';
  msg.style.color = 'white';
  msg.style.padding = '6px 12px';
  msg.style.borderRadius = '20px';
  msg.style.maxWidth = '80%';
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

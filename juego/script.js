const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('highscore');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player, obstacles, score, gameSpeed, gameOver;
let highscore = localStorage.getItem('neonHighscore') || 0;
highscoreDisplay.innerText = `Record: ${highscore}`;

function resetGame() {
  player = {
    x: 150,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    color: '#0ff',
    dy: 0,
    gravity: 1.5,
    jumpForce: -20,
    grounded: false
  };
  obstacles = [];
  score = 0;
  gameSpeed = 5;
  gameOver = false;
  scoreDisplay.innerText = `Score: 0`;
  highscoreDisplay.innerText = `Record: ${highscore}`;
  restartBtn.style.display = 'none';
  document.getElementById('gameOverText')?.remove();
  update();
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.shadowColor = player.color;
  ctx.shadowBlur = 20;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.shadowBlur = 0;
}

function createObstacle() {
    const type = Math.random() < 0.3 ? 'air' : 'ground'; // 30% chance de flecha
    if (type === 'ground') {
      const height = Math.random() * 50 + 30;
      obstacles.push({
        type,
        x: canvas.width,
        y: canvas.height - height,
        width: 30,
        height,
        color: '#f0f',
        
      });
    } else {
      // flecha aérea
      obstacles.push({
        type,
        x: canvas.width,
        y: canvas.height - 105, // altura de vuelo
        width: 40,
        height: 10,
        color: '#fa0',
        speedExtra: 3 // 🚀 flechas más rápidas
      });
    }
  }
  
  function drawObstacles() {
    for (let obs of obstacles) {
      ctx.fillStyle = obs.color;
      ctx.shadowColor = obs.color;
      ctx.shadowBlur = 10;
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.shadowBlur = 0;
      obs.x -= gameSpeed + (obs.speedExtra || 0); // ← aplica velocidad extra
    }
  }
  
  

function jump() {
  if (player.grounded) {
    player.dy = player.jumpForce;
    player.grounded = false;
  }
}

function detectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();

  player.y += player.dy;
  player.dy += player.gravity;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.grounded = true;
  }

  obstacles = obstacles.filter(o => o.x + o.width > 0);

  for (let obs of obstacles) {
    if (detectCollision(player, obs)) {
      // Si es obstáculo aéreo, solo pierdes si estás en el aire
      if (obs.type === 'air' && !player.grounded) {
        gameOver = true;
      } else if (obs.type === 'ground') {
        gameOver = true;
      }
    }
  }
  
  if (!gameOver) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    if (score % 200 === 0) gameSpeed++;
    requestAnimationFrame(update);
  } else {
    // Check and save highscore
    if (score > highscore) {
      highscore = score;
      localStorage.setItem('neonHighscore', highscore);
      highscoreDisplay.innerText = `Record: ${highscore}`;
    }

    // Show Game Over text above button
    const gameOverText = document.createElement('div');
    gameOverText.id = 'gameOverText';
    gameOverText.innerText = 'Game Over';
    document.body.appendChild(gameOverText);

    restartBtn.style.display = 'block';
  }
}

setInterval(() => {
  if (!gameOver) createObstacle();
}, 1500);

window.addEventListener('keydown', e => {
  if (e.code === 'Space') jump();
});
window.addEventListener('touchstart', jump);
restartBtn.addEventListener('click', resetGame);

// Iniciar el juego
resetGame();

import { degToRad } from './utils.js';
import { drawTargets, spawnTarget } from './target.js';
import { canvas, ctx, tracker, RADIUS, Cursor } from './globals.js';
import { Player } from './player.js'
import './input.js';

let SENSITIVITY = .4;

function canvasDraw() {
  // Clear
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Targets
  drawTargets(ctx);

  // Cursor
  ctx.fillStyle = "#f00";
  ctx.beginPath();
  ctx.arc(Cursor.x(), Cursor.y(), RADIUS, 0, degToRad(360), true);
  ctx.fill();
  ctx.closePath();
}

canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

document.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    $('#start').hide();
    const w = $(window).width();
    setTimeout(() => {
      const h = $(window).height();
      canvas.width = w;
      canvas.height = h;
      canvasDraw();
      canvas.requestPointerLock();
    }, 100);
  } else {
    $('#start').show();
    canvas.width = 0;
    canvas.height = 0;
    canvasDraw();
    document.exitPointerLock();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyF') {
    document.body.requestFullscreen();
  }
});

function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", mouseMove, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", mouseMove, false);
  }
}

function mouseMove(e) {
  // Edge detection
  if (Cursor.x() > canvas.width) {
    Cursor.setX(canvas.width - 1);
    return
  }
  if (Cursor.y() > canvas.height) {
    Cursor.setY(canvas.height - 1);
    return
  }  
  if (Cursor.x() < 0) {
    Cursor.setX(1);
    return
  }
  if (Cursor.y() < 0) {
    Cursor.setY(1);
    return
  }
  const dx = e.movementX * SENSITIVITY;
  const dy = e.movementY * SENSITIVITY;
  Cursor.setX(Cursor.x() + dx);
  Cursor.setY(Cursor.y() + dy);

  // tracker.textContent = "X position: " + Cursor.x() + ", Y position: " + Cursor.y() + ", Sensitivity: " + SENSITIVITY;
}

function setSensitivity(event) {
  sensValue = $('#sens-input').val();
  SENSITIVITY = sensValue;
  event.preventDefault();
}

const sensForm = document.getElementById('sens');
sensForm.addEventListener('submit', setSensitivity);

function gameLoop() {
  spawnTarget(canvas);
  canvasDraw();
  // tracker.textContent = "X position: " + Cursor.x() + ", Y position: " + Cursor.y() + ", Sensitivity: " + SENSITIVITY;
  tracker.textContent = "Lvl: " + Player.lvl() + ", HP: " + Player.hp() + ", XP: " + Player.xp() + ", XP to level: " + Player.reqXP();
  window.requestAnimationFrame(gameLoop);
}

gameLoop();
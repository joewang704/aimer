// Helper functions
const RADIUS = 5;
let SENSITIVITY = 0.4;

function degToRad(degrees) {
  var result = Math.PI / 180 * degrees;
  return result;
}

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var x = 50;
var y = 50;

function canvasDraw() {
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f00";
  ctx.beginPath();
  ctx.arc(x, y, RADIUS, 0, degToRad(360), true);
  ctx.fill();
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

var tracker = document.getElementById('tracker');

var animation;
function mouseMove(e) {
  // Edge detection
  if (x > canvas.width) {
    x = canvas.width - 1;
    return
  }
  if (y > canvas.height) {
    y = canvas.height - 1;
    return
  }  
  if (x < 0) {
    x = 1;
    return
  }
  if (y < 0) {
    y = 1;
    return
  }
  dx = e.movementX * SENSITIVITY;
  dy = e.movementY * SENSITIVITY;
  x += dx;
  y += dy;
  tracker.textContent = "X position: " + x + ", Y position: " + y + ", Sensitivity: " + SENSITIVITY;

  if (!animation) {
    animation = requestAnimationFrame(function() {
      animation = null;
      canvasDraw();
    });
  }
}

function setSensitivity(event) {
  sensValue = $('#sens-input').val();
  SENSITIVITY = sensValue;
  console.log(SENSITIVITY);
  event.preventDefault();
}

const sensForm = document.getElementById('sens');
sensForm.addEventListener('submit', setSensitivity);

// DOM elements
export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const tracker = document.getElementById('tracker');

// Constants
export const RADIUS = 5;

// Immutable stores
export const Cursor = (() => {
  let x = 50;
  let y = 50;
  return {
    position: () => ({ x, y }),
    x: () => x,
    y: () => y,
    set: (newX, newY) => {
      x = newX;
      y = newY;
    },
    setX: (newX) => {
      x = newX;
    },
    setY: (newY) => {
      y = newY;
    },
  }
})()
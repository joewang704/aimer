import { random } from './utils.js';

const WIDTH = 50;
const HEIGHT = 50;

export const Targets = (() => {
  let targets = [];
  return {
    set: (ts) => {
      targets = ts;
    },
    get: () => targets,
    push: (t) => targets.push(t),
    length: () => targets.length,
  }
})()

export const drawTargets = (ctx) => {
  Targets.get().forEach(({ x, y, width, height }) => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(x, y, width, height);
  })
}

export const spawnTarget = (canvas) => {
  if (!Targets.length()) {
    const { width, height } = canvas;
    const x = random(width / 2 - width / 4, width - WIDTH - width / 2);
    const y = random(height / 2 - height / 4, height - HEIGHT - height / 2);
    Targets.set([{ x, y, width: WIDTH, height: HEIGHT }]);
  }
}
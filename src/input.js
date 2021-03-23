import { Targets } from './target.js';
import { Cursor, RADIUS } from './globals.js';
import { Player } from './player.js';

document.addEventListener('click', () => {
  if (document.fullscreenElement) {
    const screenX = Cursor.x();
    const screenY = Cursor.y();
    const targets = Targets.get();
    const newTargets = targets.filter(({ x, y, width, height }) =>
      // Filter out if target clicked inside
      !(screenX + RADIUS >= x && screenX - RADIUS <= x + width && screenY + RADIUS >= y && screenY - RADIUS <= y + height));
    if (newTargets.length === targets.length) {
      // Player misses target
      Player.takeDamage(10);
    } else {
      // Player hits target
      Player.gainXP(10);
      Targets.set(newTargets);
    }
  }
});
import Timer from 'tiny-timer';

export class Dungeon {
  constructor(enemies, durationInSeconds = 60) {
    this.enemies = enemies;
    this.timer = new Timer(durationInSeconds * 1000);
    this.currentEnemyIdx = 0;
  }
};

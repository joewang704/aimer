export const Player = (() => {
  let stats = {
    strength: 1,
    accuracy: 0,
    defense: 0,
  };
  let hp = 100;
  let lvl = 1;
  let xp = 0;
  return {
    hp: () => hp,
    lvl: () => lvl,
    xp: () => xp,
    reqXP: () => lvl * lvl * 10,
    takeDamage: (d) => hp -= d,
    gainXP: (d) => {
      xp += d;
      // TODO: replace with exponential calc
      const reqXP = lvl * lvl * 10;
      if (xp >= reqXP) {
        xp = 0;
        lvl++;
      }
    },
    calcDamageOutput: () => Math.ceil(Math.sqrt(strength) * 10 * random(9, 10) / 10)
  }
})();
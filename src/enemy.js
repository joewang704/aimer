import { random } from "./utils";

export const Enemy = (() => {
  let stats = {
    strength: 1,
    accuracy: 0,
    defense: 0,
  };
  let hp = 100;
  let lvl = 1;
  return {
    hp: () => hp,
    lvl: () => lvl,
    xp: () => xp,
    setHP: (newHP) => hp = newHP,
    takeDamage: (d) => hp -= d,
    calcDamageOutput: () => Math.ceil(Math.sqrt(strength) * 10 * random(9, 10) / 10),
    isDead: () => hp <= 0,
  }
});
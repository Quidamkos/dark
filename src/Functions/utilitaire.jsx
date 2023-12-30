export function calculateLevel(experience) {
    let level = 0;
    while (experience >= 15 * level ** 2 + 10) {
      level++;
    }
    return level;
  }

  export function experienceForLevel(level) {
    return level === 0 ? 0 : 15 * (level - 1) ** 2 + 10;
  }
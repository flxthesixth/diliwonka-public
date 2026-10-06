export const ENTRY_FEE = 20;
export const MAX_LEVEL = 10;

export function levelReward(level) {
  if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) throw new Error('invalid level');
  return 50 * level;
}

export function trapPenalty(level) {
  if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) throw new Error('invalid level');
  return 25 * level;
}

export function goDeeper(level) {
  if (!Number.isInteger(level) || level < 1 || level >= MAX_LEVEL) throw new Error('level cap');
  return level + 1;
}

export function makePlan(level, rand) {
  const traps = level <= 4 ? 1 : level <= 8 ? 2 : 3;
  const indexes = new Set();
  while (indexes.size < traps) indexes.add(Math.floor(rand() * 5));
  const plan = [false, false, false, false, false];
  for (const index of indexes) plan[index] = true;
  return plan;
}

export function resolveDoor({ plan, pick, level, runCoin }) {
  if (!Array.isArray(plan) || plan.length !== 5) throw new Error('invalid state');
  if (!Number.isInteger(pick) || pick < 0 || pick > 4) throw new Error('invalid state');
  if (!Number.isFinite(runCoin) || runCoin < 0) throw new Error('invalid state');
  if (plan[pick]) return { kind: 'trap', penalty: trapPenalty(level), level: 1, runCoin: 0, ended: true };
  const gained = levelReward(level);
  const runCoinNext = runCoin + gained;
  if (level === MAX_LEVEL) return { kind: 'coin', gained, level, runCoin: runCoinNext, claimable: true, ended: false };
  return { kind: 'coin', gained, level, runCoin: runCoinNext, ended: false };
}

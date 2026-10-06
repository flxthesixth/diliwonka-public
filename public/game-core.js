const DOORS = [
  { kind: 'coin', value: 25 }, { kind: 'coin', value: 50 },
  { kind: 'coin', value: 100 }, { kind: 'tool', value: 0 }, { kind: 'trap', value: 30 },
];

export function createGame({ coin = 0, xHandle = '', ticketsFound = 0, rng = Math.random } = {}) {
  return { coin, xHandle, ticketsFound, hasTicket: false, rng, dungeon: { doors: DOORS.map((_, i) => ({ opened: false, i })) }, lastEvent: null };
}

function copy(game, patch) { return { ...game, ...patch }; }

export function chooseDoor(game, index) {
  const door = game.dungeon.doors[index];
  if (!door || door.opened) throw new Error('door already opened');
  const reward = DOORS[Math.floor(game.rng() * DOORS.length)];
  const doors = game.dungeon.doors.map((d, i) => i === index ? { ...d, opened: true } : d);
  const coin = reward.kind === 'trap' ? Math.max(0, game.coin - reward.value) : game.coin + reward.value;
  return copy(game, { coin, dungeon: { doors }, lastEvent: reward });
}

export function fish(game, wager) {
  if (!Number.isInteger(wager) || wager < 10 || wager > game.coin) throw new Error('invalid wager');
  const catchValue = game.rng() < .12 ? wager * 4 : game.rng() < .45 ? wager * 2 : Math.floor(wager * 1.5);
  return copy(game, { coin: game.coin - wager + catchValue, lastEvent: { kind: 'fish', value: catchValue, wager } });
}

export function rollGacha(game) {
  if (!game.xHandle) throw new Error('X login required');
  if (game.coin < 100) throw new Error('not enough coin');
  const roll = game.rng();
  let event = roll < .01 && game.ticketsFound < 10 && !game.hasTicket
    ? { kind: 'golden-ticket', value: 1 }
    : roll < .2 ? { kind: 'tool', value: 0 } : roll < .55 ? { kind: 'coin', value: 50 } : { kind: 'zonk', value: 0 };
  return copy(game, { coin: game.coin - 100 + (event.kind === 'coin' ? event.value : 0), ticketsFound: game.ticketsFound + (event.kind === 'golden-ticket'), hasTicket: game.hasTicket || event.kind === 'golden-ticket', lastEvent: event });
}

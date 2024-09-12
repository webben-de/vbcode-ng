import { ActionKind } from '../types/ActionKind';

export const kinds = [
  { abbr: 'A', name: 'Attack' },
  { abbr: 'B', name: 'Block' },
  { abbr: 'D', name: 'Defense' },
  { abbr: 'F', name: 'Free' },
  { abbr: 'R', name: 'Recieve' },
  { abbr: 'S', name: 'Serve' },
  { abbr: 'E', name: 'Set' },
];

export const kindMap = new Map<ActionKind | string, string>();

kindMap.set(ActionKind.Attack, 'Angriff');
kindMap.set(ActionKind.Block, 'Block');
kindMap.set(ActionKind.Def, 'Defense');
kindMap.set(ActionKind.Free, 'Dankeball');
kindMap.set(ActionKind.Recieve, 'Annahme');
kindMap.set(ActionKind.Serve, 'Aufschläge');
kindMap.set(ActionKind.Set, 'Zuspiel');

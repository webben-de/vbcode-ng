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

kindMap.set(ActionKind.Attack, 'Attack');
kindMap.set(ActionKind.Block, 'Block');
kindMap.set(ActionKind.Def, 'Def');
kindMap.set(ActionKind.Free, 'Free');
kindMap.set(ActionKind.Recieve, 'Recieve');
kindMap.set(ActionKind.Serve, 'Serve');
kindMap.set(ActionKind.Set, 'Set');

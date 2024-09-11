import { ActionKind } from '../types/ActionKind';

export const kinds = [
  { abbr: 'S', name: 'Serve' },
  { abbr: 'R', name: 'Recieve' },
  { abbr: 'A', name: 'A' },
  { abbr: 'B', name: 'Block' },
  { abbr: 'D', name: 'Def' },
  { abbr: 'E', name: 'Set' },
  { abbr: 'F', name: 'Free' },
];

export const kindMap = new Map<ActionKind | string, string>();

kindMap.set(ActionKind.Serve, 'Serve');
kindMap.set(ActionKind.Recieve, 'Recieve');
kindMap.set(ActionKind.Attack, 'Attack');
kindMap.set(ActionKind.Block, 'Block');
kindMap.set(ActionKind.Def, 'Def');
kindMap.set(ActionKind.Set, 'Set');
kindMap.set(ActionKind.Free, 'Free');

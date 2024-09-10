export const kinds = [
  { abbr: 'S', name: 'Serve' },
  { abbr: 'R', name: 'Recieve' },
  { abbr: 'A', name: 'A' },
  { abbr: 'B', name: 'Block' },
  { abbr: 'D', name: 'Def' },
  { abbr: 'E', name: 'Set' },
  { abbr: 'F', name: 'Free' },
];

export enum ActionKind {
  'Serve' = 'S',
  'Recieve' = 'R',
  'Attack' = 'A',
  'Block' = 'B',
  'Def' = 'D',
  'Set' = 'E',
  'Free' = 'F',
}
export const kindMap = new Map<ActionKind | string, string>();

kindMap.set(ActionKind.Serve, 'Serve');
kindMap.set(ActionKind.Recieve, 'Recieve');
kindMap.set(ActionKind.Attack, 'Attack');
kindMap.set(ActionKind.Block, 'Block');
kindMap.set(ActionKind.Def, 'Def');
kindMap.set(ActionKind.Set, 'Set');
kindMap.set(ActionKind.Free, 'Free');

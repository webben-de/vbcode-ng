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

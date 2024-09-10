export enum ActionGrade {
  '#' = '#',
  '+' = '+',
  '!' = '!',
  '/' = '/',
  '-' = '-',
  '=' = '=',
}

export const grad_options_list: { abbr: string; name: ActionGrade }[] = [
  { abbr: '#', name: ActionGrade['#'] },
  { abbr: '+', name: ActionGrade['+'] },
  { abbr: '!', name: ActionGrade['!'] },
  { abbr: '/', name: ActionGrade['/'] },
  { abbr: '-', name: ActionGrade['-'] },
  { abbr: '=', name: ActionGrade['='] },
];
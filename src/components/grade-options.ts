import { ActionGrade } from '../types/ActionGrade';

export const grad_options_list: { abbr: string; name: ActionGrade }[] = [
  { abbr: '#', name: ActionGrade['#'] },
  { abbr: '+', name: ActionGrade['+'] },
  { abbr: '!', name: ActionGrade['!'] },
  { abbr: '/', name: ActionGrade['/'] },
  { abbr: '-', name: ActionGrade['-'] },
  { abbr: '=', name: ActionGrade['='] },
];
export const gradePrios = new Map<ActionGrade | string, number>();
gradePrios.set(ActionGrade['#'], 0);
gradePrios.set(ActionGrade['+'], 1);
gradePrios.set(ActionGrade['!'], 2);
gradePrios.set(ActionGrade['/'], 3);
gradePrios.set(ActionGrade['-'], 4);
gradePrios.set(ActionGrade['='], 5);
gradePrios.set('null', 6);

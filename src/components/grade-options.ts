import { ActionGrade } from '../types/ActionGrade';

export const grad_options_list: { abbr: string; name: ActionGrade }[] = [
  { abbr: '#', name: ActionGrade['#'] },
  { abbr: '+', name: ActionGrade['+'] },
  { abbr: '!', name: ActionGrade['!'] },
  { abbr: '/', name: ActionGrade['/'] },
  { abbr: '-', name: ActionGrade['-'] },
  { abbr: '=', name: ActionGrade['='] },
];

export const gradDescriptionMap = new Map<ActionGrade | string, string>();
gradDescriptionMap.set(ActionGrade['#'], 'Perfect');
gradDescriptionMap.set(ActionGrade['+'], 'Good');
gradDescriptionMap.set(ActionGrade['!'], 'Average');
gradDescriptionMap.set(ActionGrade['/'], 'Bad');
gradDescriptionMap.set(ActionGrade['-'], 'Very Bad');
gradDescriptionMap.set(ActionGrade['='], 'Fail');
gradDescriptionMap.set('null', 'Nicht erfasst');

export const gradePrios = new Map<ActionGrade | string, number>();
gradePrios.set(ActionGrade['#'], 0);
gradePrios.set(ActionGrade['+'], 1);
gradePrios.set(ActionGrade['!'], 2);
gradePrios.set(ActionGrade['/'], 3);
gradePrios.set(ActionGrade['-'], 4);
gradePrios.set(ActionGrade['='], 5);
gradePrios.set('null', 6);

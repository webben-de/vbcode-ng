export enum ActionGrade {
  '#' = '#',
  '+' = '+',
  '!' = '!',
  '/' = '/',
  '-' = '-',
  '=' = '=',
}

export const ActionGradeColorMap = new Map<ActionGrade, string>();
ActionGradeColorMap.set(ActionGrade['#'], '#0fc715');
ActionGradeColorMap.set(ActionGrade['!'], '#469910');
ActionGradeColorMap.set(ActionGrade['+'], '#6c790d');
ActionGradeColorMap.set(ActionGrade['-'], '#c33105');
ActionGradeColorMap.set(ActionGrade['/'], '#d4d50d');
ActionGradeColorMap.set(ActionGrade['='], '#ff0000');

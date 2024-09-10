import type { EChartsOption } from 'echarts';
import { ActionGrade } from './grade-options';
import { ActionKind } from './kind-options';

export const defaults: {
  [x in ActionKind]: {
    title?: string;
    total: number;
    by_player: Map<string | any, number>;
    stats: {
      [x in ActionGrade]: number;
    };
    charts?: {
      gradePie: EChartsOption;
      playerPie: EChartsOption;
    };
  };
} = {
  [ActionKind.Serve]: {
    title: 'Serve',
    total: 0,
    by_player: new Map(),
    stats: {
      [ActionGrade['#']]: 0,
      [ActionGrade['+']]: 0,
      [ActionGrade['!']]: 0,
      [ActionGrade['/']]: 0,
      [ActionGrade['-']]: 0,
      [ActionGrade['=']]: 0,
    },
  },
  [ActionKind.Recieve]: {
    title: 'Recieve',
    total: 0,
    by_player: new Map(),
    stats: {
      [ActionGrade['#']]: 0,
      [ActionGrade['+']]: 0,
      [ActionGrade['!']]: 0,
      [ActionGrade['/']]: 0,
      [ActionGrade['-']]: 0,
      [ActionGrade['=']]: 0,
    },
  },
  [ActionKind.Attack]: {
    total: 0,
    by_player: new Map(),
    stats: {
      [ActionGrade['#']]: 0,
      [ActionGrade['+']]: 0,
      [ActionGrade['!']]: 0,
      [ActionGrade['/']]: 0,
      [ActionGrade['-']]: 0,
      [ActionGrade['=']]: 0,
    },
  },
  [ActionKind.Block]: {
    total: 0,
    by_player: new Map(),
    stats: {
      [ActionGrade['#']]: 0,
      [ActionGrade['+']]: 0,
      [ActionGrade['!']]: 0,
      [ActionGrade['/']]: 0,
      [ActionGrade['-']]: 0,
      [ActionGrade['=']]: 0,
    },
  },
  [ActionKind.Def]: {
    total: 0,
    by_player: new Map(),
    stats: {
      [ActionGrade['#']]: 0,
      [ActionGrade['+']]: 0,
      [ActionGrade['!']]: 0,
      [ActionGrade['/']]: 0,
      [ActionGrade['-']]: 0,
      [ActionGrade['=']]: 0,
    },
  },
  [ActionKind.Set]: {
    total: 0,
    by_player: new Map(),
    stats: {
      [ActionGrade['#']]: 0,
      [ActionGrade['+']]: 0,
      [ActionGrade['!']]: 0,
      [ActionGrade['/']]: 0,
      [ActionGrade['-']]: 0,
      [ActionGrade['=']]: 0,
    },
  },
  [ActionKind.Free]: {
    total: 0,
    by_player: new Map(),
    stats: {
      [ActionGrade['#']]: 0,
      [ActionGrade['+']]: 0,
      [ActionGrade['!']]: 0,
      [ActionGrade['/']]: 0,
      [ActionGrade['-']]: 0,
      [ActionGrade['=']]: 0,
    },
  },
};
import { ActionGrade } from '../components/grade-options';
import { ActionKind } from '../components/kind-options';

export default {
  S: {
    '#': 'Punktgewinn',
    '+': 'Guter Aufschlag (nur noch Highball beim Gegner möglich)',
    '!': 'Akzeptabler Aufschlag (gn. Zuspieler werden Optionen minimiert)',
    '/': 'Sehr guter Aufschlag (kein gn. Angriff möglich)',
    '-': 'Schlechter Aufschlag (gute oder perfekte gn. Annahme)',
    '=': 'Fehler (Punkt Gegner)',
  },
  R: {
    '#': 'Perfekte Annahme',
    '+': 'Gute Annahme (nähe perfekter Zuspielsituation)',
    '!': 'Ausreichende Annahme (Zuspielpos. versetzt)',
    '/': 'Sehr schlechte Annahme (kein Angriff möglich)',
    '-': 'Schlechte Annahme (nur Highball möglich)',
    '=': 'Fehler (Punkt Gegner)',
  },
  A: {
    '#': 'Punktgewinn',
    '+': 'Guter Angriff (nächste eigene Angriffschance)',
    '!': 'Angriff in den Block mit eigener nächsten Angriffschance (Recycle)',
    '/': 'Angriff in den Block (direkter gn.Punkt)',
    '-': 'Schlechter Angriff (nächste Angriffschance beim Gegner)',
    '=': 'Fehler (Punkt Gegner)',
  },
  B: {
    '#': 'Punktgewinn',
    '+': 'Guter Blocktouch (nächste eigene Angriffschance)',
    '!': 'Ball abgewehrt (Recycle des Gegners)',
    '/': 'Blocktouch mit Punktfolge Gegner (Block angeschlagen)',
    '-': 'Schlechter Blocktouch (nächste Angriffschance beim Gegner)',
    '=': 'Fehler (Punkt Gegner)',
  },
  D: {
    '#': 'Perfekte Abwehr',
    '+': 'Gute Abwehr (nähe perfekter Zuspielsituation)',
    '!': 'Ausreichende Abwehr (Zuspielpos. versetzt)',
    '/': 'Sehr schlechte Abwehr (kein Angriff möglich)',
    '-': 'Schlechte Abwehr (nur Highball möglich)',
    '=': 'Fehler (Punkt Gegner)',
  },
  E: {
    '#': 'Perfektes Zuspiel',
    '+': 'Gutes Zuspiel (minimale Ungenauigkeiten)',
    '!': 'Ausreichendes Zuspiel (größere Streuung)',
    '/': 'Sehr schlechtes Zuspiel (kein Angriff möglich, ggf Z zum Gegner)',
    '-': 'Schlechtes Zuspiel (grobe Abweichung des Zuspiels)',
    '=': 'Fehler (Punkt Gegner)',
  },
  F: {
    '#': 'Perfekter Dankeball',
    '+': 'Guter Dankeball (nähe perfekter Zuspielsituation)',
    '!': 'Ausreichender Dankeball (Zuspielpos. versetzt)',
    '/': 'Sehr schlechter Dankeball (kein Angriff möglich)',
    '-': 'Schlechter Dankeball (nur Highball möglich)',
    '=': 'Fehler (Punkt Gegner)',
  },
};

export const hintMap = new Map<ActionKind | string, Map<ActionGrade, string>>();
const serveHintMap = new Map();
serveHintMap.set(ActionGrade['#'], 'Punktgewinn');
serveHintMap.set(ActionGrade['+'], 'Guter Aufschlag (nur noch Highball beim Gegner möglich)');
serveHintMap.set(ActionGrade['!'], 'Akzeptabler Aufschlag (gn. Zuspieler werden Optionen minimiert)');
serveHintMap.set(ActionGrade['/'], 'Sehr guter Aufschlag (kein gn. Angriff möglich)');
serveHintMap.set(ActionGrade['-'], 'Schlechter Aufschlag (gute oder perfekte gn. Annahme)');
serveHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const attackHintMap = new Map();
attackHintMap.set(ActionGrade['#'], 'Punktgewinn');
attackHintMap.set(ActionGrade['+'], 'Guter Angriff (nächste eigene Angriffschance)');
attackHintMap.set(ActionGrade['!'], 'Angriff in den Block mit eigener nächsten Angriffschance (Recycle)');
attackHintMap.set(ActionGrade['/'], 'Angriff in den Block (direkter gn.Punkt)');
attackHintMap.set(ActionGrade['-'], 'Schlechter Angriff (nächste Angriffschance beim Gegner)');
attackHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const blockHintMap = new Map();
blockHintMap.set(ActionGrade['#'], 'Punktgewinn');
blockHintMap.set(ActionGrade['+'], 'Guter Blocktouch (nächste eigene Angriffschance)');
blockHintMap.set(ActionGrade['!'], 'Ball abgewehrt (Recycle des Gegners)');
blockHintMap.set(ActionGrade['/'], 'Blocktouch mit Punktfolge Gegner (Block angeschlagen)');
blockHintMap.set(ActionGrade['-'], 'Schlechter Blocktouch (nächste Angriffschance beim Gegner)');
blockHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const receiveHintMap = new Map();
receiveHintMap.set(ActionGrade['#'], 'Perfekte Annahme');
receiveHintMap.set(ActionGrade['+'], 'Gute Annahme (nähe perfekter Zuspielsituation)');
receiveHintMap.set(ActionGrade['!'], 'Ausreichende Annahme (Zuspielpos. versetzt)');
receiveHintMap.set(ActionGrade['/'], 'Sehr schlechte Annahme (kein Angriff möglich)');
receiveHintMap.set(ActionGrade['-'], 'Schlechte Annahme (nur Highball möglich)');
receiveHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const defenseHintMap = new Map();
defenseHintMap.set(ActionGrade['#'], 'Perfekte Abwehr');
defenseHintMap.set(ActionGrade['+'], 'Gute Abwehr (nähe perfekter Zuspielsituation)');
defenseHintMap.set(ActionGrade['!'], 'Ausreichende Abwehr (Zuspielpos. versetzt)');
defenseHintMap.set(ActionGrade['/'], 'Sehr schlechte Abwehr (kein Angriff möglich)');
defenseHintMap.set(ActionGrade['-'], 'Schlechte Abwehr (nur Highball möglich)');
defenseHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const setHintMap = new Map();
setHintMap.set(ActionGrade['#'], 'Perfektes Zuspiel');
setHintMap.set(ActionGrade['+'], 'Gutes Zuspiel (minimale Ungenauigkeiten)');
setHintMap.set(ActionGrade['!'], 'Ausreichendes Zuspiel (größere Streuung)');
setHintMap.set(ActionGrade['/'], 'Sehr schlechtes Zuspiel (kein Angriff möglich, ggf Z zum Gegner)');
setHintMap.set(ActionGrade['-'], 'Schlechtes Zuspiel (grobe Abweichung des Zuspiels)');
setHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const freeHintMap = new Map();
freeHintMap.set(ActionGrade['#'], 'Perfekter Dankeball');
freeHintMap.set(ActionGrade['+'], 'Guter Dankeball (nähe perfekter Zuspielsituation)');
freeHintMap.set(ActionGrade['!'], 'Ausreichender Dankeball (Zuspielpos. versetzt)');
freeHintMap.set(ActionGrade['/'], 'Sehr schlechter Dankeball (kein Angriff möglich)');
freeHintMap.set(ActionGrade['-'], 'Schlechter Dankeball (nur Highball möglich)');
freeHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

hintMap.set(ActionKind.Attack, attackHintMap);
hintMap.set(ActionKind.Serve, serveHintMap);
hintMap.set(ActionKind.Block, blockHintMap);
hintMap.set(ActionKind.Recieve, receiveHintMap);
hintMap.set(ActionKind.Def, defenseHintMap);
hintMap.set(ActionKind.Set, setHintMap);
hintMap.set(ActionKind.Free, freeHintMap);

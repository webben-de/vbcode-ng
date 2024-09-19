import { ActionGrade } from './ActionGrade';
import { ActionKind } from './ActionKind';

export const hintMap = new Map<ActionKind | string, Map<ActionGrade | string, string>>();
const serveHintMap = new Map<ActionGrade | string, string>();
serveHintMap.set(ActionGrade['#'], 'Punktgewinn');
serveHintMap.set(ActionGrade['+'], 'Guter Aufschlag (nur noch Highball beim Gegner möglich)');
serveHintMap.set(ActionGrade['!'], 'Akzeptabler Aufschlag (gn. Zuspieler werden Optionen minimiert)');
serveHintMap.set(ActionGrade['/'], 'Sehr guter Aufschlag (kein gn. Angriff möglich)');
serveHintMap.set(ActionGrade['-'], 'Schlechter Aufschlag (gute oder perfekte gn. Annahme)');
serveHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const attackHintMap = new Map<ActionGrade | string, string>();
attackHintMap.set(ActionGrade['#'], 'Punktgewinn');
attackHintMap.set(ActionGrade['+'], 'Guter Angriff (nächste eigene Angriffschance)');
attackHintMap.set(ActionGrade['!'], 'Angriff in den Block mit eigener nächsten Angriffschance (Recycle)');
attackHintMap.set(ActionGrade['/'], 'Angriff in den Block (direkter gn.Punkt)');
attackHintMap.set(ActionGrade['-'], 'Schlechter Angriff (nächste Angriffschance beim Gegner)');
attackHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const blockHintMap = new Map<ActionGrade | string, string>();
blockHintMap.set(ActionGrade['#'], 'Punktgewinn');
blockHintMap.set(ActionGrade['+'], 'Guter Blocktouch (nächste eigene Angriffschance)');
blockHintMap.set(ActionGrade['!'], 'Ball abgewehrt (Recycle des Gegners)');
blockHintMap.set(ActionGrade['/'], 'Blocktouch mit Punktfolge Gegner (Block angeschlagen)');
blockHintMap.set(ActionGrade['-'], 'Schlechter Blocktouch (nächste Angriffschance beim Gegner)');
blockHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const receiveHintMap = new Map<ActionGrade | string, string>();
receiveHintMap.set(ActionGrade['#'], 'Perfekte Annahme');
receiveHintMap.set(ActionGrade['+'], 'Gute Annahme (nähe perfekter Zuspielsituation)');
receiveHintMap.set(ActionGrade['!'], 'Ausreichende Annahme (Zuspielpos. versetzt)');
receiveHintMap.set(ActionGrade['/'], 'Sehr schlechte Annahme (kein Angriff möglich)');
receiveHintMap.set(ActionGrade['-'], 'Schlechte Annahme (nur Highball möglich)');
receiveHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const defenseHintMap = new Map<ActionGrade | string, string>();
defenseHintMap.set(ActionGrade['#'], 'Perfekte Abwehr');
defenseHintMap.set(ActionGrade['+'], 'Gute Abwehr (nähe perfekter Zuspielsituation)');
defenseHintMap.set(ActionGrade['!'], 'Ausreichende Abwehr (Zuspielpos. versetzt)');
defenseHintMap.set(ActionGrade['/'], 'Sehr schlechte Abwehr (kein Angriff möglich)');
defenseHintMap.set(ActionGrade['-'], 'Schlechte Abwehr (nur Highball möglich)');
defenseHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const setHintMap = new Map<ActionGrade | string, string>();
setHintMap.set(ActionGrade['#'], 'Perfektes Zuspiel');
setHintMap.set(ActionGrade['+'], 'Gutes Zuspiel (minimale Ungenauigkeiten)');
setHintMap.set(ActionGrade['!'], 'Ausreichendes Zuspiel (größere Streuung)');
setHintMap.set(ActionGrade['/'], 'Sehr schlechtes Zuspiel (kein Angriff möglich, ggf Z zum Gegner)');
setHintMap.set(ActionGrade['-'], 'Schlechtes Zuspiel (grobe Abweichung des Zuspiels)');
setHintMap.set(ActionGrade['='], 'Fehler (Punkt Gegner)');

const freeHintMap = new Map<ActionGrade | string, string>();
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

// sortByPlayerRole
import { Pipe, type PipeTransform } from '@angular/core';
import { ActionKind } from '../types/ActionKind';
import type { PlayerDTO } from '../types/PlayerDTO';

@Pipe({ name: 'sortByPlayerRole', standalone: true })
export class SortByPlayerRolePipe implements PipeTransform {
  transform(_: Map<string, string>, player: PlayerDTO | null) {
    if (!player || player.roles.length <= 0) return roleKindMap.get(PlayerRoles.Default);
    const roleKinds = roleKindMap.get(player.roles[0] as PlayerRoles);
    return roleKinds ? Array.from(roleKinds) : roleKindMap.get(PlayerRoles.Default);
  }
}
enum PlayerRoles {
  Middle = 'Middle',
  Default = 'Default',
  Outside = 'Outside',
  Libero = 'Libero',
  Opposide = 'Opposide',
  Setter = 'Setter',
}
const roleKindMap = new Map<PlayerRoles, ActionKind[]>();
roleKindMap.set(PlayerRoles.Default, [
  ActionKind.Attack,
  ActionKind.Block,
  ActionKind.Serve,
  ActionKind.Recieve,
  ActionKind.Def,
  ActionKind.Free,
  ActionKind.Set,
]);
roleKindMap.set(PlayerRoles.Opposide, [
  ActionKind.Attack,
  ActionKind.Block,
  ActionKind.Serve,
  ActionKind.Recieve,
  ActionKind.Def,
  ActionKind.Free,
  ActionKind.Set,
]);
roleKindMap.set(PlayerRoles.Setter, [
  ActionKind.Set,
  ActionKind.Serve,
  ActionKind.Def,
  ActionKind.Free,
  ActionKind.Block,
  ActionKind.Recieve,
  ActionKind.Attack,
]);
roleKindMap.set(PlayerRoles.Outside, [
  ActionKind.Attack,
  ActionKind.Block,
  ActionKind.Serve,
  ActionKind.Recieve,
  ActionKind.Def,
  ActionKind.Free,
  ActionKind.Set,
]);
roleKindMap.set(PlayerRoles.Libero, [ActionKind.Def, ActionKind.Recieve, ActionKind.Free, ActionKind.Set]);
roleKindMap.set(PlayerRoles.Middle, [
  ActionKind.Attack,
  ActionKind.Block,
  ActionKind.Serve,
  ActionKind.Recieve,
  ActionKind.Def,
  ActionKind.Free,
  ActionKind.Set,
]);

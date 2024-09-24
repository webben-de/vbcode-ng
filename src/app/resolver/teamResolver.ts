import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { TeamsService } from '../../services/teams.service';

export function teamResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(TeamsService).getTeam(id);
  };
}

export function playerResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('player');
    if (!id) return;
    return inject(PlayerService).getPlayer(id);
  };
}

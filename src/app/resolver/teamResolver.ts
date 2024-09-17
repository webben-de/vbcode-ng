import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { TeamsService } from '../../services/teams.service';

export default function teamResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(TeamsService).getTeam(id);
  };
}

import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type Store, select } from '@ngxs/store';
import { groupBy, sortBy } from 'lodash';
import { SessionState } from '../../app/session.state';
import { gradePrios } from '../../components/grade-options';
import { ActionsService } from '../../services/action.service';
import type { ActionDTO } from '../../types/ActionDTO';

@Component({
  selector: 'app-player-last-game-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-neutral rounded-lg shadow-md p-6 my-4">
      <h2 class="text-2xl font-bold mb-4">Meine Stats</h2>
      <p>Hier werden deine Werte der des letzten Spiels angezeigt.</p>
      <div id="stats-container">
        <div class="stats stats-vertical shadow ">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Total Likes</div>
            <div class="stat-value text-primary">25.6K</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="stat-title">Page Views</div>
            <div class="stat-value text-secondary">2.6M</div>
            <div class="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>
    </div>
    {{ groupedByGrade | json }}
    {{ actions | async | json }}
    {{ user_player() | json }}
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class PlayerLastGameStatsComponent implements OnInit {
  /**
   *
   */
  route = inject(ActivatedRoute);
  actionsService = inject(ActionsService);
  // constructor(private store: Store) {
  // this.store.select(SessionState.session).subscribe((session) => {});
  // }
  /**
   *
   */
  user_player = select(SessionState.user_player);
  /**
   *
   */
  groupedByGrade: [string, any[]][] = [];
  actions?: Promise<ActionDTO[] | null>;

  async ngOnInit() {
    const player = this.user_player();

    if (player) {
      this.actions = this.actionsService.getActionsOfLastEventByPlayer(player);

      this.groupedByGrade = sortBy(Object.entries(groupBy(await this.actions, 'grade')), (a) => {
        return gradePrios.get(a[0]) || 0;
      });
    }
  }
}

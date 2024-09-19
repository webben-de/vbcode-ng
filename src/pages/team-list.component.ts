import { Component, inject, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { CommonModule } from '@angular/common';
import { ROUTES } from '../app/ROUTES';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Teams Page with a list of all team -->
    <div class="flex flex-col p-4">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Teamname</th>
              <th scope="col" class="px-6 py-3">Player</th>
              <th scope="col" class="px-6 py-3">Link</th>
            </tr>
          </thead>
          <tbody>
            @for (item of teams|async; track $index) {
            <tr class="bg-white dark:bg-gray-800">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.name }}</th>
              <td class="px-6 py-4">{{ item.players.length }}</td>
              <td class="px-6 py-4">
                <a [routerLink]="[ROUTES.root, ROUTES.teams, item.id]" routerLinkActive="router-link-active">Link</a>
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TeamListPageComponent implements OnInit {
  ROUTES = ROUTES;
  teamService = inject(TeamsService);
  teams = this.teamService.getTeams();

  constructor() {}

  ngOnInit(): void {}
}

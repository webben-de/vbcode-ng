import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-team-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Teams Page with a list of all team -->
    <div class="flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Teams</h1>
        <a
          [routerLink]="[ROUTES.root, ROUTES.teams, 'create']"
          class="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create New Team
        </a>
      </div>

      <!-- Mobile Card View -->
      <div class="block md:hidden space-y-4">
        @for (item of teams|async; track $index) {
        <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <h3 class="font-semibold text-gray-900 text-lg mb-2">{{ item.name }}</h3>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">
              <span class="font-medium">{{ item.players.length }}</span> Players
            </span>
            <a
              [routerLink]="[ROUTES.root, ROUTES.teams, item.id]"
              class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              View
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
        }
      </div>

      <!-- Desktop Table View -->
      <div class="hidden md:block relative overflow-x-auto bg-white rounded-lg shadow-md">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4">Teamname</th>
              <th scope="col" class="px-6 py-4">Player</th>
              <th scope="col" class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (item of teams|async; track $index) {
            <tr class="bg-white hover:bg-gray-50 transition-colors">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ item.name }}</th>
              <td class="px-6 py-4">{{ item.players.length }}</td>
              <td class="px-6 py-4 text-right">
                <a
                  [routerLink]="[ROUTES.root, ROUTES.teams, item.id]"
                  class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View Details
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TeamListPageComponent {
  ROUTES = SVB_APP_ROUTES;
  teamService = inject(TeamsService);
  teams = this.teamService.getTeams();
}

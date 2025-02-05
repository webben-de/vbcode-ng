import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, type MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { OnlyAvailablePipe } from '../pipes/onlyAvailable.pipe';
import { PlayerService } from '../services/player.service';
import { type TeamDTO, TeamsService, type createTeamDTO } from '../services/teams.service';
import type { PlayerDTO } from '../types/PlayerDTO';

@Component({
  selector: 'app-create-team-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    TranslocoModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    OnlyAvailablePipe,
  ],
  template: `
    <div class="flex flex-col items-start gap-8 h-full p-8">
      <h2>{{ 'create-a-new-team' | transloco }}</h2>
      <form [formGroup]="teamFormGroup" #form (submit)="createTeam()" class="flex flex-col w-full gap-2">
        <mat-form-field class="w-full">
          <mat-label>{{ 'name' | transloco }}</mat-label>
          <input matInput placeholder="Team name" formControlName="name" />
        </mat-form-field>
        <table mat-table #table [dataSource]="players || []">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row">{{ row.name }}</td>
          </ng-container>
          <ng-container matColumnDef="trikot">
            <th mat-header-cell *matHeaderCellDef>Trikot</th>
            <td mat-cell *matCellDef="let row">{{ row.trikot }}</td>
          </ng-container>
          <ng-container matColumnDef="roles">
            <th mat-header-cell *matHeaderCellDef>Rollen</th>
            <td mat-cell *matCellDef="let row">{{ row.roles }}</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let row">
              <mat-icon>delete</mat-icon>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="['name', 'trikot', 'roles', 'actions']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['name', 'trikot', 'roles', 'actions']"></tr>
        </table>
        <div class="flex divide-x-2 gap-4">
          <div class="flex">
            <!-- Autocomplete -->
            <mat-form-field class="example-full-width">
              <mat-label>Assignee</mat-label>
              <input type="text" matInput [matAutocomplete]="auto" />
              <mat-autocomplete #auto="matAutocomplete" (optionSelected)="addSelectedOption($event)">
                @for (option of (availablePlayers | async| onlyAvailable: players); track option) {
                <mat-option [value]="option">{{ option.name }}</mat-option>
                }
              </mat-autocomplete>
            </mat-form-field>
          </div>
          <div class="flex gap-2">
            <input type="text" placeholder="Player-name" class="input input-bordered input-primary w-full max-w-xs" #name />
            <input type="number" placeholder="Trikot" class="input input-bordered input-primary w-full max-w-xs" #number />
            <button class="btn btn-primary" (click)="addMember(name, number)">Button</button>
          </div>
        </div>
        <!-- <mat-form-field class="w-full">
          <mat-label>{{ 'players' | transloco }}</mat-label>
          <mat-select placeholder="Players" formControlName="players" [multiple]="true">
            <mat-option *ngFor="let item of players | async" [value]="item.id"> {{ item.name }} </mat-option>
          </mat-select> -->
        <!-- </mat-form-field> -->
        <button mat-button [type]="'submit'">{{ 'submit' | transloco }}</button>
      </form>
      <!-- <pre><code>{{teamFormGroup.value|json}}</code></pre> -->
      <hr />

      <p>
        <a [routerLink]="[ROUTES.root + ROUTES.teams]">{{ 'see-all-your-teams-here' | transloco }}</a>
      </p>
    </div>
  `,
})
export class CreateTeamPageComponent implements OnInit {
  displayFn(user: PlayerDTO): string {
    return user?.name ? user.name : '';
  }
  async addSelectedOption($event: MatAutocompleteSelectedEvent) {
    const player = $event.option.value as PlayerDTO;
    await this.teamsService.addPlayerToTeam(this.team.id, player.id);
    this.players = await this.playerService.getPlayerList(this.team.players);
    $event.option.deselect();
  }
  async addMember(_t76: HTMLInputElement, _t78: HTMLInputElement) {
    await this.playerService.createPlayer(this.team.id, {
      name: _t76.value,
      trikot: _t78.value,
    });
  }
  ROUTES = SVB_APP_ROUTES;
  /**
   *
   */
  route = inject(ActivatedRoute);
  snack = inject(MatSnackBar);
  teamsService = inject(TeamsService);
  playerService = inject(PlayerService);
  /**
   *
   */
  team: TeamDTO = {} as TeamDTO;
  players: PlayerDTO[] = [];
  availablePlayers: Promise<PlayerDTO[]> = this.playerService.getPlayers();
  teamFormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    players: new FormControl<string[]>([]),
  });
  /**
   *
   */
  async ngOnInit() {
    this.route.data.subscribe(async (data) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      this.team = data['team'] as TeamDTO;
      if (this.team)
        this.teamFormGroup.patchValue({
          ...this.team,
          players: this.team.players ? this.team.players : [],
        });
      this.players = await this.playerService.getPlayerList(this.team.players);
    });
  }

  async createTeam() {
    try {
      await this.teamsService.createTeam(this.teamFormGroup.value as createTeamDTO);
    } catch (error) {
      this.snack.open('Failed to create team', 'close', {
        duration: 2000,
      });
    }
  }
}

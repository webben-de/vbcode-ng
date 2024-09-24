import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { PlayerService } from '../services/player.service';
import { type TeamDTO, TeamsService, type createTeamDTO } from '../services/teams.service';

@Component({
  selector: 'app-create-team-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
  ],
  template: `
    <div class="flex flex-col items-start gap-8 h-full p-8">
      <h2>Create a new Team</h2>
      <form [formGroup]="teamFormGroup" #form (submit)="createTeam()" class="flex flex-col w-full">
        <mat-form-field class="w-full">
          <mat-label>Name</mat-label>
          <input matInput placeholder="Team name" formControlName="name" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Players</mat-label>
          <mat-select placeholder="Players" formControlName="players" [multiple]="true">
            <mat-option *ngFor="let item of players | async" [value]="item.id"> {{ item.name }} </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button [type]="'submit'">Submit</button>
      </form>
      <!-- <pre><code>{{teamFormGroup.value|json}}</code></pre> -->
      <hr />

      <p><a [routerLink]="[ROUTES.root + ROUTES.teams]">See all your teams here</a></p>
    </div>
  `,
})
export class CreateTeamPageComponent implements OnInit {
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
  players = this.playerService.getPlayers();
  team: TeamDTO = {} as TeamDTO;
  teamFormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    players: new FormControl<string[]>([]),
  });
  /**
   *
   */
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      this.team = data['team'] as TeamDTO;
      if (this.team)
        this.teamFormGroup.patchValue({
          ...this.team,
          players: this.team.players ? this.team.players : [],
        });
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

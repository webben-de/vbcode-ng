
import { Component, type OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SessionState } from '../app/session.state';
import { PristineEventPipe } from '../pipes/pristineEvent.pipe';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import { SupabaseService } from '../services/supabase.service';
import { type TeamDTO, TeamsService } from '../services/teams.service';
import type { EventDTO, createEventDTO } from '../types/EventDTO';
import type { PlayerDTO } from '../types/PlayerDTO';
import { AttendeesSelectFormControlComponent } from './atoms/attendees-select-form-control.component';
import { SingleRoationFormControlComponent } from './atoms/single-roation-form-control.component';
import { SVB_APP_ROUTES } from '../app/ROUTES';

@Component({
  selector: 'app-create-game-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    TranslocoModule,
    SingleRoationFormControlComponent,
    PristineEventPipe,
    AttendeesSelectFormControlComponent
],
  template: `
    <div class="flex flex-col items-start gap-4 md:gap-8 h-full p-4 md:p-8 max-w-4xl mx-auto w-full">
      <span class="text-xl md:text-2xl font-bold">
        @if (!createGameForm.controls.id.value) {
          {{ 'create-a-new-game' | transloco }}
          }@else {
          {{ 'edit-a-game' | transloco }}
    
        }
      </span>
      <form [formGroup]="createGameForm" #form (submit)="createGame()" class="flex flex-col w-full">
        <mat-form-field class="w-full">
          <mat-label>{{ 'title' | transloco }}</mat-label>
          <input matInput formControlName="title" />
        </mat-form-field>
        <div class="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
          <mat-form-field class="w-full md:w-1/3">
            <mat-label>{{ 'visibility' | transloco }}</mat-label>
            <mat-select formControlName="visibility">
              @for (item of ['Private', 'Public']; track item) {
                <mat-option [value]="item">
                  {{ item }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field class="w-full md:w-1/2">
            <mat-label>{{ 'date' | transloco }}</mat-label>
            <input matInput type="date" formControlName="date" />
          </mat-form-field>
        </div>
        <!-- ALL ATTENDEES AVAILABLE FROM THE (HOME) TEAM -->
    
        <hr />
        <span class="text-lg">{{ 'home' | transloco }}</span>
        <mat-form-field class="w-full">
          <mat-label>{{ 'home-team' | transloco }}</mat-label>
          <mat-select formControlName="home_team" (valueChange)="OnHomeTeamChange($event)" #homeTeam>
            @for (item of teams; track $index) {
              <mat-option [value]="item.id">
                {{ item.name }}
              </mat-option>
            }
          </mat-select>
          <mat-hint>
            <a [routerLink]="[ROUTES.root + ROUTES.teams, homeTeam.value]"> {{ 'edit-this-team' | transloco }} </a>
          </mat-hint>
        </mat-form-field>
        @if (createGameForm.controls.home_team.valid) {
          <app-attendees-select-form-control [playerList]="playerList" [attendees]="createGameForm.controls.attendees" />
        }
        <!-- -->
        @if (homeTeam.value) {
    
          <span class="text-sm md:text-md font-medium">{{ 'start-rotation' | transloco }}</span>
          <p class="text-xs md:text-sm text-gray-600">Bezieht sich nur auf Satz 1 solange diese noch nicht Satzweise abgepasst werden kann</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            @for (index of [4,3,2,5,6,1]; track $index) {
              <app-single-roation-form-control
                [playerList]="playerList"
                [index]="index"
                [attendees]="createGameForm.controls.attendees.value"
                [home_team_start_rotation]="createGameForm.controls.home_team_start_rotation"
                />
            }
          </div>
        }
        <hr class="my-4" />
        <div class="">
          <mat-form-field class="w-full">
            <mat-label>{{ 'away-team' | transloco }}</mat-label>
            <mat-select formControlName="away_team" #awayTeam>
              @for (item of teams |pristineEvent: homeTeam.value; track $index) {
                <mat-option [value]="item.id">
                  {{ item.name }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
    
          @if (awayTeam.value) {
    
            <span class="text-sm md:text-md font-medium">{{ 'start-rotation' | transloco }}</span>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              @for (index of [4,3,2,5,6,1]; track $index) {
                <app-single-roation-form-control
                  [playerList]="playerList"
                  [attendees]="createGameForm.controls.attendees.value"
                  [index]="index"
                  [home_team_start_rotation]="createGameForm.controls.away_team_start_rotation"
                  />
              }
            </div>
          }
        </div>
        <label class="label cursor-pointer">
          <span class="label-text">{{ 'event-finished' | transloco }}</span>
          <input type="checkbox" class="toggle" #eventFinished />
        </label>
        @if (true || createGameForm.controls.result_home.value || createGameForm.controls.result_away.value) {
    
          <div class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
            <div class="w-full md:w-1/2">
              <mat-form-field class="w-full">
                <mat-label>{{ 'result-home' | transloco }} </mat-label>
                <input matInput type="number" formControlName="result_home" />
              </mat-form-field>
            </div>
            <div class="w-full md:w-1/2">
              <mat-form-field class="w-full">
                <mat-label>{{ 'result-away' | transloco }} </mat-label>
                <input matInput type="number" formControlName="result_away" />
              </mat-form-field>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter link here"
              class="input input-bordered input-primary w-full"
              (keydown.enter)="addMediaLink($event, inMedia)"
              #inMedia
              />
            <ul class="flex flex-wrap gap-2 my-2">
              @for (item of this.createGameForm.controls.media_links.value; track $index) {
                <li class="flex">
                  <a class="btn btn-xs w-12 h-12" [href]="item" target="_blank">
                    @if (item.includes('youtube')) {
                      <svg width="48" height="48">
                        <title>youtube</title>
                        <path
                          class="fill-[#FF0000]"
                          d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
                          />
                      </svg>
                      }@else {
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>video-outline</title>
                        <path
                          class="fill-secondary"
                          d="M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z"
                          />
                      </svg>
                    }
                  </a>
                </li>
              }
            </ul>
          </div>
        }
        <button class="btn w-full md:w-auto" [type]="'submit'">{{ 'submit' | transloco }}</button>
      </form>
      <hr class="my-4" />
      <div class="flex flex-col gap-2 w-full">
        <a class="btn btn-outline btn-secondary w-full md:w-auto" [routerLink]="[ROUTES.root, ROUTES.games]">{{ 'see-all-your-games-here' | transloco }}</a>
        @if (createGameForm.controls.id.value) {
    
          <a class="btn btn-outline btn-secondary w-full md:w-auto" [routerLink]="[ROUTES.root, ROUTES.roationPlaner, createGameForm.controls.id.value]">{{
            'See Rotation Preview' | transloco
          }}</a>
    
          <button class="btn btn-outline btn-error w-full md:w-auto" type="button" (click)="deleteGame()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </svg>
            {{ 'delete-game' | transloco }}
          </button>
        }
      </div>
    </div>
    `,
})
export class CreateGamePageComponent implements OnInit {
  addMediaLink($event: Event, inp: HTMLInputElement) {
    $event.preventDefault();
    const target = $event.target as HTMLInputElement;
    const v = target?.value;
    if (!v) return;

    const val = this.createGameForm.controls.media_links.value;
    if (val && val.length > 0) {
      this.createGameForm.controls.media_links.setValue([...val, v]);
    } else {
      this.createGameForm.controls.media_links.setValue([v]);
    }
    inp.value = '';
  }
  ROUTES = SVB_APP_ROUTES;
  /**
   *
   */
  route = inject(ActivatedRoute);
  router = inject(Router);
  snack = inject(MatSnackBar);
  eventsService = inject(EventsService);
  supabase = inject(SupabaseService);
  playerService = inject(PlayerService);
  teamService = inject(TeamsService);
  /**
   *
   */
  session = select(SessionState.session);
  /**
   *
   */
  teams: TeamDTO[] = [];
  players = this.playerService.getPlayers();
  playerList: PlayerDTO[] = [];
  createGameForm = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    title: new FormControl<string>('', Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    media_links: new FormControl<string[]>(['']),
    attendees: new FormControl<string[]>([]),
    result_home: new FormControl<number | undefined>(undefined),
    result_away: new FormControl<number | undefined>(undefined),
    home_team: new FormControl<string | undefined>(undefined),
    home_team_start_rotation: new FormGroup({
      1: new FormControl<string | null>(null),
      2: new FormControl<string | null>(null),
      3: new FormControl<string | null>(null),
      4: new FormControl<string | null>(null),
      5: new FormControl<string | null>(null),
      6: new FormControl<string | null>(null),
    }),
    away_team_start_rotation: new FormArray([
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
    ]),
    away_team: new FormControl<string | undefined>(undefined),
    owner: new FormControl<string>(this.session()?.user.id || '', Validators.required),
    shared_with: new FormControl<string[]>([]),
    visibility: new FormControl<'Public' | 'Private'>('Private'),
  });
  /**
   *
   */
  async createGame() {
    const payload = this.createGameForm.value as createEventDTO | EventDTO;
    try {
      await this.eventsService.createEvent(payload);
      // this.createGameForm.reset();
      this.snack
        .open('Event create', 'open', { duration: 5000 })
        .onAction()
        .subscribe(() => {
          // this.router.navigate(['/report', 'details', event[0]?.id]);
        });
    } catch (error) {
      // biome-ignore lint/style/useTemplate: <explanation>
      this.snack.open('Error creating Event:' + error, 'OK', {
        duration: 2000,
      });
    }
  }
  /**
   * Delete the current game
   */
  async deleteGame() {
    const gameId = this.createGameForm.controls.id.value;
    if (!gameId) return;

    const confirmed = confirm('Möchten Sie dieses Spiel wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.');
    if (!confirmed) return;

    try {
      await this.eventsService.deleteEvent(gameId);
      this.snack.open('Spiel erfolgreich gelöscht', 'OK', { duration: 3000 });
      this.router.navigate([this.ROUTES.root, this.ROUTES.games]);
    } catch (error) {
      this.snack.open('Fehler beim Löschen des Spiels: ' + error, 'OK', {
        duration: 3000,
      });
    }
  }
  /**
   *
   */
  async OnHomeTeamChange($event?: string) {
    if (!$event) return;
    const team = await this.teamService.getTeam($event);
    this.playerList = await this.playerService.getPlayerList(team.players);
  }
  /**
   *
   */
  async ngOnInit() {
    this.route.data.subscribe((data) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      if (data['game']) this.createGameForm.patchValue(data['game'] as EventDTO);
      const homeTeamValue = this.createGameForm.controls.home_team.value;
      if (homeTeamValue) {
        this.OnHomeTeamChange(homeTeamValue);
      }
    });
    this.teams = await this.teamService.getTeams();
  }
}

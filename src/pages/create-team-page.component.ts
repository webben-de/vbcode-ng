import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, type MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { OnlyAvailablePipe } from '../pipes/onlyAvailable.pipe';
import { PlayerService } from '../services/player.service';
import { type TeamDTO, TeamsService } from '../services/teams.service';
import type { PlayerDTO } from '../types/PlayerDTO';

@Component({
  selector: 'app-create-team-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    OnlyAvailablePipe,
  ],
  template: `
    <div class="flex flex-col items-start gap-4 md:gap-6 h-full p-4 md:p-8 max-w-6xl mx-auto w-full">
      <!-- Header -->
      <div class="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 class="text-xl md:text-2xl font-bold">
          {{ isEditMode ? ('edit-team' | transloco) : ('create-a-new-team' | transloco) }}
        </h2>
        <div class="flex flex-col sm:flex-row gap-2">
          @if (isEditMode) {
          <button mat-button color="warn" (click)="deleteTeam()" [disabled]="isSaving()" class="w-full sm:w-auto">
            <mat-icon>delete</mat-icon>
            <span class="hidden sm:inline">{{ 'delete-team' | transloco }}</span>
          </button>
          }
          <a [routerLink]="[ROUTES.root, ROUTES.teams]" mat-button class="w-full sm:w-auto">
            <mat-icon>arrow_back</mat-icon>
            <span class="hidden sm:inline">{{ 'back-to-teams' | transloco }}</span>
          </a>
        </div>
      </div>

      <!-- Team Name Form -->
      <!-- Team Details Card -->
      <mat-card class="w-full">
        <mat-card-content>
          <form [formGroup]="teamFormGroup" (ngSubmit)="saveTeam()" class="flex flex-col gap-4">
            <mat-form-field class="w-full">
              <mat-label>{{ 'team-name' | transloco }}</mat-label>
              <input matInput formControlName="name" [placeholder]="'enter-team-name' | transloco" />
              @if (teamFormGroup.get('name')?.hasError('required')) {
              <mat-error>{{ 'team-name-required' | transloco }}</mat-error>
              }
            </mat-form-field>

            <mat-form-field class="w-full">
              <mat-label>{{ 'description' | transloco }}</mat-label>
              <textarea matInput formControlName="description" rows="3" [placeholder]="'enter-team-description' | transloco"></textarea>
            </mat-form-field>

            <div class="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button mat-raised-button color="primary" type="submit" [disabled]="teamFormGroup.invalid || isSaving()" class="w-full sm:w-auto">
                @if (isSaving()) {
                <mat-icon>
                  <mat-spinner diameter="20"></mat-spinner>
                </mat-icon>
                }
                {{ isEditMode ? ('save-changes' | transloco) : ('create-team' | transloco) }}
              </button>
              @if (isEditMode) {
              <button mat-button type="button" (click)="resetForm()" [disabled]="isSaving()" class="w-full sm:w-auto">
                {{ 'reset' | transloco }}
              </button>
              }
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Players Section -->
      @if (isEditMode) {
      <mat-card class="w-full">
        <mat-card-content>
          <h3 class="text-lg md:text-xl font-semibold mb-4">{{ 'team-players' | transloco }}</h3>

          <!-- Players Table -->
          @if (isLoadingPlayers()) {
          <div class="flex justify-center p-4 md:p-8">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
          } @else if (players.length === 0) {
          <div class="text-center p-4 md:p-8 text-gray-500">
            <mat-icon class="text-3xl md:text-4xl mb-2">people_outline</mat-icon>
            <p class="text-sm md:text-base">{{ 'no-players-yet' | transloco }}</p>
          </div>
          } @else {
          <div class="overflow-x-auto">
            <table mat-table [dataSource]="players" class="w-full min-w-[500px]">
              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>{{ 'name' | transloco }}</th>
                <td mat-cell *matCellDef="let player">{{ player.name }}</td>
              </ng-container>

              <!-- Jersey Number Column -->
              <ng-container matColumnDef="trikot">
                <th mat-header-cell *matHeaderCellDef>{{ 'jersey-number' | transloco }}</th>
                <td mat-cell *matCellDef="let player">
                  @if (editingJerseyPlayerId === player.id) {
                  <div class="flex gap-1 items-center">
                    <mat-form-field class="w-20" subscriptSizing="dynamic">
                      <input
                        matInput
                        type="number"
                        [(ngModel)]="editingJerseyNumber"
                        (keyup.enter)="saveJerseyNumber(player)"
                        (keyup.escape)="cancelJerseyEdit()"
                        #jerseyInput
                      />
                    </mat-form-field>
                    <button mat-icon-button color="primary" (click)="saveJerseyNumber(player)" [disabled]="isSaving()" matTooltip="Save">
                      <mat-icon>check</mat-icon>
                    </button>
                    <button mat-icon-button (click)="cancelJerseyEdit()" [disabled]="isSaving()" matTooltip="Cancel">
                      <mat-icon>close</mat-icon>
                    </button>
                  </div>
                  } @else {
                  <div class="flex items-center gap-2">
                    <span>{{ player.trikot || '-' }}</span>
                    <button mat-icon-button (click)="startEditJerseyNumber(player)" [disabled]="isSaving()" matTooltip="Edit jersey number">
                      <mat-icon class="text-sm">edit</mat-icon>
                    </button>
                  </div>
                  }
                </td>
              </ng-container>

              <!-- Roles Column -->
              <ng-container matColumnDef="roles">
                <th mat-header-cell *matHeaderCellDef>{{ 'roles' | transloco }}</th>
                <td mat-cell *matCellDef="let player">
                  {{ player.roles?.join(', ') || '-' }}
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let player">
                  <button mat-icon-button color="warn" (click)="removePlayer(player)" [disabled]="isSaving()" [matTooltip]="'remove-player' | transloco">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>
          }
          <!-- Add Players Section -->
          <!-- Add Player Section -->
          <div class="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg">
            <h4 class="text-base md:text-lg font-semibold mb-3 md:mb-4">{{ 'add-player' | transloco }}</h4>

            <!-- Add Existing Player -->
            <div class="mb-4">
              <h5 class="text-xs md:text-sm font-medium mb-2">{{ 'add-existing-player' | transloco }}</h5>
              <mat-form-field class="w-full">
                <mat-label>{{ 'search-player' | transloco }}</mat-label>
                <input matInput [formControl]="existingPlayerControl" [matAutocomplete]="auto" [placeholder]="'type-to-search' | transloco" />
                <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayPlayerName" (optionSelected)="onPlayerSelected($event)">
                  @for (player of (availablePlayers | async | onlyAvailable: (players)); track player.id) {
                  <mat-option [value]="player"> {{ player.name }} (#{{ player.trikot }}) </mat-option>
                  }
                </mat-autocomplete>
              </mat-form-field>
            </div>

            <!-- Add New Player -->
            <div>
              <h5 class="text-xs md:text-sm font-medium mb-2">{{ 'create-new-player' | transloco }}</h5>
              <div class="flex gap-2 items-start">
                <form [formGroup]="newPlayerFormGroup" (ngSubmit)="addNewPlayer()" class="flex flex-col sm:flex-row gap-2 items-stretch sm:items-start w-full">
                  <mat-form-field class="flex-1 w-full">
                    <mat-label>{{ 'name' | transloco }}</mat-label>
                    <input matInput formControlName="name" [placeholder]="'player-name' | transloco" />
                    @if (newPlayerFormGroup.get('name')?.hasError('required') && newPlayerFormGroup.get('name')?.touched) {
                    <mat-error>{{ 'required' | transloco }}</mat-error>
                    }
                  </mat-form-field>

                  <mat-form-field class="w-full sm:w-24">
                    <mat-label>{{ 'jersey' | transloco }}</mat-label>
                    <input matInput type="number" formControlName="trikot" placeholder="#" />
                    @if (newPlayerFormGroup.get('trikot')?.hasError('required') && newPlayerFormGroup.get('trikot')?.touched) {
                    <mat-error>{{ 'required' | transloco }}</mat-error>
                    }
                  </mat-form-field>

                  <button
                    mat-raised-button
                    color="accent"
                    type="submit"
                    [disabled]="newPlayerFormGroup.invalid || isSaving()"
                    class="self-stretch sm:self-start sm:mt-1 w-full sm:w-auto"
                  >
                    <mat-icon>person_add</mat-icon>
                    <span class="sm:hidden ml-2">{{ 'add-player' | transloco }}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class CreateTeamPageComponent implements OnInit {
  async addNewPlayer() {
    if (this.newPlayerFormGroup.invalid) return;
    const { name, trikot } = this.newPlayerFormGroup.value;
    try {
      this.isSaving.set(true);
      // Ensure team.id is a string
      const teamId: string = typeof this.team.id === 'string' ? this.team.id : this.team.id ? String(this.team.id) : '';
      if (!teamId) throw new Error('Team ID is missing');

      // Ensure name and trikot are strings
      if (!name || !trikot) {
        throw new Error('Name and trikot are required');
      }

      const response = await this.playerService.createPlayer(teamId, { name, trikot });
      // Type guard for response.data
      type TeamResponse = { players: string[] };
      let newPlayerId: string | undefined;
      if (response && response.data) {
        const teamData = Array.isArray(response.data) ? (response.data[0] as TeamResponse) : (response.data as TeamResponse);
        if (teamData && Array.isArray(teamData.players) && teamData.players.length > 0) {
          newPlayerId = teamData.players[teamData.players.length - 1];
        }
      }
      if (newPlayerId) {
        this.team.players = [...(this.team.players || []), newPlayerId];
        this.teamFormGroup.patchValue({ players: this.team.players });
        await this.teamsService.createTeam(this.team);
        await this.loadPlayers();
        this.snack.open(`${name} hinzugefügt`, 'Close', { duration: 2000 });
        this.newPlayerFormGroup.reset();
      } else {
        this.snack.open('Fehler beim Hinzufügen', 'Close', { duration: 3000 });
      }
    } catch (error) {
      this.snack.open('Fehler beim Hinzufügen', 'Close', { duration: 3000 });
      console.error('Error adding player:', error);
    } finally {
      this.isSaving.set(false);
    }
  }

  onPlayerSelected(event: MatAutocompleteSelectedEvent) {
    const player = event.option.value as PlayerDTO;
    if (!player || !player.id) return;
    if (this.team.players.includes(player.id)) return;
    this.team.players = [...(this.team.players || []), player.id];
    this.teamFormGroup.patchValue({ players: this.team.players });
    this.teamsService.createTeam(this.team).then(() => {
      this.loadPlayers();
      this.snack.open(`${player.name} hinzugefügt`, 'Close', { duration: 2000 });
    });
  }
  // Services
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);
  private readonly teamsService = inject(TeamsService);
  private readonly playerService = inject(PlayerService);

  // Constants
  readonly ROUTES = SVB_APP_ROUTES;
  readonly displayedColumns = ['name', 'trikot', 'roles', 'actions'];

  // State
  team: TeamDTO = {} as TeamDTO;
  players: PlayerDTO[] = [];
  availablePlayers: Promise<PlayerDTO[]> = this.playerService.getPlayers();

  isEditMode = false;
  isSaving = signal(false);
  isLoadingPlayers = signal(false);

  // Jersey number editing state
  editingJerseyPlayerId: string | null = null;
  editingJerseyNumber: number | null = null;

  // Forms
  teamFormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required]),
    players: new FormControl<string[]>([]),
  });

  existingPlayerControl = new FormControl<PlayerDTO | string>('');

  newPlayerFormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    trikot: new FormControl<string>('', [Validators.required]),
  });
  async ngOnInit() {
    this.route.data.subscribe(async (data) => {
      // biome-ignore lint/complexity/useLiteralKeys: resolved from route
      const teamData = data['team'] as TeamDTO;

      if (teamData?.id) {
        this.isEditMode = true;
        this.team = teamData;
        this.teamFormGroup.patchValue({
          id: this.team.id,
          name: this.team.name,
          players: this.team.players || [],
        });
        await this.loadPlayers();
      }
    });
  }

  async loadPlayers() {
    if (!this.team.players?.length) {
      this.players = [];
      return;
    }

    try {
      this.isLoadingPlayers.set(true);
      this.players = await this.playerService.getPlayerList(this.team.players);
    } catch (error) {
      this.snack.open('Failed to load players', 'Close', { duration: 3000 });
      console.error('Error loading players:', error);
    } finally {
      this.isLoadingPlayers.set(false);
    }
  }

  async saveTeam() {
    if (this.teamFormGroup.invalid) return;

    try {
      this.isSaving.set(true);
      const teamData = {
        id: this.teamFormGroup.value.id || '',
        name: this.teamFormGroup.value.name || '',
        players: this.team.players || [],
      } as TeamDTO;

      await this.teamsService.createTeam(teamData);

      this.snack.open(this.isEditMode ? 'Team updated successfully' : 'Team created successfully', 'Close', { duration: 3000 });

      if (!this.isEditMode) {
        await this.router.navigate([this.ROUTES.root, this.ROUTES.teams]);
      }
    } catch (error) {
      this.snack.open(this.isEditMode ? 'Failed to update team' : 'Failed to create team', 'Close', { duration: 3000 });
      console.error('Error saving team:', error);
    } finally {
      this.isSaving.set(false);
    }
  }

  async addExistingPlayer(event: MatAutocompleteSelectedEvent) {
    const player = event.option.value as PlayerDTO;
    if (!player?.id || !this.team.id) return;

    try {
      this.isSaving.set(true);
      await this.teamsService.addPlayerToTeam(this.team.id, player.id);
      this.team.players = [...(this.team.players || []), player.id];
      await this.loadPlayers();
      this.existingPlayerControl.reset();
      this.snack.open(`${player.name} added to team`, 'Close', { duration: 2000 });
    } catch (error) {
      this.snack.open('Failed to add player', 'Close', { duration: 3000 });
      console.error('Error adding player:', error);
    } finally {
      this.isSaving.set(false);
    }
  }

  async createAndAddPlayer() {
    if (this.newPlayerFormGroup.invalid || !this.team.id) return;

    try {
      this.isSaving.set(true);
      const playerData = this.newPlayerFormGroup.value as { name: string; trikot: string };

      // Create the player first
      await this.playerService.createPlayer(this.team.id, playerData);

      // Get the fresh team data to get the updated players array
      const updatedTeam = await this.teamsService.getTeam(this.team.id);
      this.team.players = updatedTeam.players;

      // Refresh the players list to show the new player immediately
      await this.loadPlayers();

      // Refresh available players list for autocomplete
      this.availablePlayers = this.playerService.getPlayers();

      this.newPlayerFormGroup.reset();
      this.snack.open('Player created and added to team', 'Close', { duration: 2000 });
    } catch (error) {
      this.snack.open('Failed to create player', 'Close', { duration: 3000 });
      console.error('Error creating player:', error);
    } finally {
      this.isSaving.set(false);
    }
  }

  async removePlayer(player: PlayerDTO) {
    if (!this.team.id) return;

    const confirmed = confirm(`Remove ${player.name} from the team?`);
    if (!confirmed) return;

    try {
      this.isSaving.set(true);
      // Remove player from team's player list
      const updatedPlayers = this.team.players.filter((id) => id !== player.id);
      await this.teamsService.createTeam({
        id: this.team.id,
        name: this.team.name,
        players: updatedPlayers,
      });

      this.team.players = updatedPlayers;
      await this.loadPlayers();
      this.snack.open(`${player.name} removed from team`, 'Close', { duration: 2000 });
    } catch (error) {
      this.snack.open('Failed to remove player', 'Close', { duration: 3000 });
      console.error('Error removing player:', error);
    } finally {
      this.isSaving.set(false);
    }
  }

  startEditJerseyNumber(player: PlayerDTO) {
    this.editingJerseyPlayerId = player.id;
    this.editingJerseyNumber = player.trikot;
  }

  cancelJerseyEdit() {
    this.editingJerseyPlayerId = null;
    this.editingJerseyNumber = null;
  }

  async saveJerseyNumber(player: PlayerDTO) {
    if (this.editingJerseyNumber === null || this.editingJerseyNumber === undefined) {
      this.cancelJerseyEdit();
      return;
    }

    try {
      this.isSaving.set(true);

      // Update player in database
      await this.playerService.updatePlayer(player.id, {
        trikot: this.editingJerseyNumber,
      });

      // Update local player object
      const playerIndex = this.players.findIndex((p) => p.id === player.id);
      if (playerIndex !== -1) {
        this.players[playerIndex].trikot = this.editingJerseyNumber;
      }

      this.cancelJerseyEdit();
      this.snack.open('Jersey number updated', 'Close', { duration: 2000 });
    } catch (error) {
      this.snack.open('Failed to update jersey number', 'Close', { duration: 3000 });
      console.error('Error updating jersey number:', error);
    } finally {
      this.isSaving.set(false);
    }
  }

  async deleteTeam() {
    if (!this.team.id) return;

    const confirmed = confirm(`Are you sure you want to delete the team "${this.team.name}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      this.isSaving.set(true);
      await this.teamsService.deleteTeam(this.team.id);

      this.snack.open('Team deleted successfully', 'Close', { duration: 3000 });

      // Navigate back to teams list
      await this.router.navigate([this.ROUTES.root, this.ROUTES.teams]);
    } catch (error) {
      this.snack.open('Failed to delete team', 'Close', { duration: 3000 });
      console.error('Error deleting team:', error);
    } finally {
      this.isSaving.set(false);
    }
  }

  resetForm() {
    this.teamFormGroup.patchValue({
      name: this.team.name,
    });
    this.teamFormGroup.markAsPristine();
  }

  displayPlayerName(player: PlayerDTO | string): string {
    if (typeof player === 'string') return player;
    return player?.name || '';
  }
}

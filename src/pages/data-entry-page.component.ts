import { CommonModule } from '@angular/common';
import { Component, type OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { type MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { grad_options_list } from '../components/grade-options';
import { kindMap } from '../components/kind-options';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import { SupabaseService } from '../services/supabase.service';
import { ActionKind } from '../types/ActionKind';
import type { PlayerDTO } from '../types/PlayerDTO';
import { hintMap } from '../types/hints';
import { EventResponse } from '../types/EventDTO';
import { ActionDTO } from '../types/ActionDTO';
import { AttendeesSelectFormControlComponent } from './atoms/attendees-select-form-control.component';
import { SortByPlayerRolePipe } from '../pipes/sortbyplayerrole.pipe';
import { ActionGrade } from '../types/ActionGrade';

type abbMap = {
  abbr: string;
  name: string;
};

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule,
    RouterModule,
    TranslocoModule,
    AttendeesSelectFormControlComponent,
    SortByPlayerRolePipe,
  ],
  template: `
    <div class="flex flex-col p-5">
      <span class="text-xl">{{ 'enter-data' | transloco }}</span>
      @let a = this.actions; @if (a) {

      <p class="flex gap-4">
        {{ 'last-action' | transloco }}:
        <span class="flex gap-4">
          <span>
            {{ a[a.length - 1].player_id.name }}
          </span>
          <span>
            {{ this.kindMap.get(a[a.length - 1].kind) }}
          </span>
          <span>
            {{ this.hint_texts.get(a[a.length - 1].kind)?.get(a[a.length - 1].grade) }}
          </span>
          <span>
            {{ a[a.length - 1].character }}
          </span>
          <span>
            {{ a[a.length - 1].created_at | date : 'short' }}
          </span>
        </span>
        <button class="btn btn-xs" (click)="deleteAction(a[a.length - 1])">{{ 'undo' | transloco }}</button>
      </p>
      }

      <p></p>
      <form action="" [formGroup]="codeInFG" class="flex-col w-full" (submit)="submit()">
        <div class="flex gap-2 justify-between">
          <div class="flex items-center"></div>
          <mat-form-field>
            <mat-label>{{ 'set' | transloco }}</mat-label>
            <input matInput type="number" formControlName="game_set" placeholder="Satz" value="1" />
          </mat-form-field>
        </div>
        <mat-vertical-stepper [linear]="false" #stepper>
          {{ this.codeInFG.controls.game_id.value | json }}
          <mat-step [hasError]="this.codeInFG.controls.game_id.invalid">
            <ng-template matStepLabel>{{ 'event' | transloco }}: {{ gameSelect.value.title }}</ng-template>
            <mat-form-field class="w-full">
              <mat-select formControlName="game_id" #gameSelect (valueChange)="changeEvent($event); stepper.next()">
                @for (item of events|async; track item.id) {
                <mat-option [value]="item">
                  {{ item?.title }}
                </mat-option>
                }
              </mat-select>
              <mat-hint>
                <a [routerLink]="['/edit-game', gameSelect.value]" routerLinkActive="router-link-active">
                  {{ 'edit-this-event' | transloco }}
                </a>
              </mat-hint>
            </mat-form-field>
          </mat-step>
          <mat-step [hasError]="!codeInFG.controls.player_id.value">
            <ng-template matStepLabel>
              <div class="flex">
                <span>{{ 'player' | transloco }}:</span>
                <span>{{ codeInFG.controls.player_id.value?.name }}</span>
                <span>({{ codeInFG.controls.player_id.value?.trikot }})</span>
                <span>({{ codeInFG.controls.player_id.value?.roles }})</span>
              </div>
            </ng-template>
            <div class="flex flex-col gap-4">
              <mat-slide-toggle #toggleName>{{ toggleName.checked ? 'Trikot' : 'Name' }}</mat-slide-toggle>
              <mat-form-field class="w-full">
                <mat-chip-grid #chipGrid>
                  @for (item of player; track $index) {
                  <mat-chip-row class="min-w-12" (click)="codeInFG.controls.player_id.setValue(item); stepper.next()">
                    {{ toggleName.checked ? item.name : item.trikot }}
                  </mat-chip-row>
                  }@empty {
                  <mat-chip-row>x</mat-chip-row>
                  }
                  <input type="hidden" [matChipInputFor]="chipGrid" />
                </mat-chip-grid>
              </mat-form-field>
              <span>{{ codeInFG.controls.player_id.value?.name }}</span>
            </div>
          </mat-step>
          <mat-step [hasError]="!codeInFG.controls.kind.value">
            <ng-template matStepLabel
              >{{ 'kind' | transloco }}: @if (codeInFG.controls.kind.value) {
              <span>{{ kind_options.get(codeInFG.controls.kind.value) }}</span>
              }
            </ng-template>

            <mat-form-field class="w-full">
              <mat-chip-grid #chipGrid2>
                @for (item of kind_options | sortByPlayerRole:codeInFG.controls.player_id.value; track $index) {
                <mat-chip-row class="min-w-12" (click)="codeInFG.controls.kind.setValue(item); stepper.next()">
                  {{ kindMap.get(item) }}
                </mat-chip-row>
                }@empty {
                <mat-chip-row>x </mat-chip-row>
                }
                <input type="hidden" [matChipInputFor]="chipGrid2" />
              </mat-chip-grid>
            </mat-form-field>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel>{{ 'character' | transloco }}: {{ codeInFG.controls.char.value?.name }}</ng-template>
            <mat-form-field class="w-full">
              <mat-chip-grid #chipGrid3>
                @for (item of char_options; track $index) {
                <mat-chip-row class="min-w-12" (click)="codeInFG.controls.char.setValue(item); stepper.next()">
                  {{ item.name }}
                </mat-chip-row>
                }@empty {
                <mat-chip-row>x </mat-chip-row>
                }
                <input type="hidden" [matChipInputFor]="chipGrid3" />
              </mat-chip-grid>
            </mat-form-field>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel>{{ 'grade' | transloco }}: {{ codeInFG.controls.grade.value?.name }}</ng-template>

            <mat-form-field class="w-full ">
              <mat-chip-grid #chipGrid4>
                @for (item of grad_options; track $index) {
                <mat-chip-row class="min-w-12" (click)="codeInFG.controls.grade.setValue(item); stepper.next()">
                  {{ item.name }}
                </mat-chip-row>
                }@empty {
                <mat-chip-row>x </mat-chip-row>
                }
                <input type="hidden" [matChipInputFor]="chipGrid4" />
              </mat-chip-grid>
            </mat-form-field>
            @if (codeInFG.controls.kind.value && codeInFG.controls.grade.value) {
            <p>
              {{ this.hint_texts.get(codeInFG.controls.kind.value)?.get(codeInFG.controls.grade.value.abbr) }}
            </p>
            }
            <hr />
            @if(false){

            <div class="grid grid-cols-3 grid-rows-3 gap-1 items-center justify-center">
              <div class="h-8 w-8">1</div>
              <div class="h-8 w-8">2</div>
              <div class="h-8 w-8">3</div>
              <div class="h-8 w-8">4</div>
              <div class="h-8 w-8">5</div>
              <div class="h-8 w-8">6</div>
              <div class="h-8 w-8">7</div>
              <div class="h-8 w-8">8</div>
              <div class="h-8 w-8">9</div>
            </div>
            }

            <button mat-raised-button type="submit">{{ 'submit' | transloco }}</button>
          </mat-step>
        </mat-vertical-stepper>
      </form>
    </div>
  `,
})
export class DataEntryComponent implements OnInit {
  event?: EventResponse;
  async deleteAction(arg0: ActionDTO) {
    try {
      await this.actionService.deleteAction(arg0.id);
      this.updateActions();
    } catch (error) {
      this.snacks.open('Error while undoing');
    }
  }
  async updateActions() {
    console.log('lol', this.event);
    if (!this.event) return;
    console.log('update', this.event.attendees);
    this.actions = await this.actionService.getActionsOfEvent(this.event.id);
    this.player = await this.playerService.getPlayerList(this.event?.attendees);
  }
  supabase = inject(SupabaseService);
  actionService = inject(ActionsService);
  playerService = inject(PlayerService);
  eventService = inject(EventsService);
  snacks = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);
  /**
   *
   */
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('gameSelect') gameSelect!: MatSelect;
  /**
   *
   */
  player: PlayerDTO[] = [];
  events = this.eventService.getEvents();
  actions?: ActionDTO[];
  /**
   *
   */
  codeInFG = new FormGroup({
    game_id: new FormControl<EventResponse | null>(null, Validators.required),
    game_set: new FormControl<number>(1, Validators.required),
    player_id: new FormControl<PlayerDTO | null>(null, Validators.required),
    kind: new FormControl<ActionKind | string | null>(null, Validators.required),
    char: new FormControl<abbMap | null>(null, Validators.required),
    grade: new FormControl<abbMap | null>(null, Validators.required),
  });
  hint_texts = hintMap;
  /**
   *
   */
  kind_options: Map<string | ActionKind, string> = kindMap;
  /**
   *
   */
  char_options: abbMap[] = [
    { abbr: 'H', name: 'High' },
    { abbr: 'M', name: 'Medium' },
    { abbr: 'Q', name: 'Quick' },
    { abbr: 'T', name: 'Tense' },
    { abbr: 'U', name: 'Super' },
    { abbr: 'F', name: 'Fast' },
    { abbr: 'O', name: 'Other' },
  ];
  /**
   *
   */
  grad_options: abbMap[] = grad_options_list;
  kindMap = kindMap;
  /**
   *
   */
  async submit() {
    const { game_id, game_set } = this.codeInFG.value;
    const payload = {
      player_id: this.codeInFG.controls.player_id.value?.id,
      kind: this.codeInFG.controls.kind.value,
      character: this.codeInFG.controls.char.value?.abbr,
      grade: this.codeInFG.controls.grade.value?.abbr,
      game_id: this.codeInFG.controls.game_id.value?.id,
      game_set: this.codeInFG.controls.game_set.value,
    };
    try {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      await this.actionService.createAction(payload as any);
      this.snacks.open('Created', 'Close', {
        duration: 500,
        panelClass: 'success',
      });
      let nextKind;
      let nextPlayer;
      switch (payload.grade) {
        case ActionGrade['#']:
          nextKind = ActionKind.Serve;
          break;
        case ActionGrade['=']:
          nextKind = ActionKind.Recieve;
          break;
      }
      if (payload.grade === ActionGrade['#'] && payload.kind === ActionKind.Serve) nextPlayer = this.codeInFG.controls.player_id.value;

      this.codeInFG.reset({ game_id, game_set, kind: nextKind, player_id: nextPlayer });
      this.stepper.reset();
      this.stepper.next();
    } catch (error) {
      this.snacks.open('Error', 'Close', {
        duration: 1000,
        panelClass: 'error',
      });
    }
  }
  /**
   *
   * @returns
   */
  async ngOnInit() {
    this.event = this.route.snapshot.data['event'] as EventResponse;
    if (this.event) this.codeInFG.controls.game_id.setValue(this.event);
    else {
      const events = await this.events;
      if (!events) return;
      this.event = await this.eventService.getEvent(events[0].id);
    }
    if (this.event.id) {
      const d = (await this.events).find((e) => e.id === this.event?.id);
      if (!d) return;
      this.codeInFG.controls.game_id.setValue(d);
      this.stepper.next();
      this.updateActions();
    }
  }
  /**
   *
   * @param $event
   */
  async changeEvent($event: string) {
    this.event = await this.eventService.getEvent($event);
    this.updateActions();
  }
}

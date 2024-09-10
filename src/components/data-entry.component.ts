import { CommonModule } from '@angular/common';
import { Component, type OnInit, ViewChild, computed, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { type MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { SupabaseService } from '../services/supabase.service';
import { hintMap } from '../types/hints';
import { grad_options_list } from './grade-options';
import { type ActionKind, kindMap, kinds } from './kind-options';
type PlTyp = {
  id: string;
  trikot: number;
  name: string;
};
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    MatStepperModule,
    MatChipsModule,
  ],
  template: `
    <div class="flex flex-col p-5">
      <form action="" [formGroup]="codeInFG" class="flex-col w-full" (submit)="submit()">
        <div class="flex gap-2 justify-between">
          <mat-form-field>
            <mat-select formControlName="game_id">
              @for (item of events|async; track $index) {
              <mat-option [value]="item.id" selected>
                {{ item.title }}
              </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Satz</mat-label>
            <input matInput type="number" formControlName="game_set" placeholder="Satz" value="1" />
          </mat-form-field>
        </div>
        <mat-vertical-stepper [linear]="false" #stepper>
          <mat-step [hasError]="!codeInFG.controls.player_id.value">
            <ng-template matStepLabel>Playername: {{ codeInFG.controls.player_id.value?.name }}</ng-template>

            <div class="flex flex-col">
              <mat-form-field class="w-full">
                <mat-chip-grid #chipGrid>
                  @for (item of player|async; track $index) {
                  <mat-chip-row class="min-w-12" (click)="codeInFG.controls.player_id.setValue(item); stepper.next()">
                    {{ item.trikot }}
                  </mat-chip-row>
                  }@empty {
                  <mat-chip-row>x </mat-chip-row>
                  }
                  <input type="hidden" [matChipInputFor]="chipGrid" />
                </mat-chip-grid>
              </mat-form-field>
              <span>{{ codeInFG.controls.player_id.value?.name }}</span>
            </div>
          </mat-step>
          <mat-step [hasError]="!codeInFG.controls.kind.value">
            <ng-template matStepLabel
              >Art: @if (codeInFG.controls.kind.value) {
              <span>{{ kind_options.get(codeInFG.controls.kind.value) }}</span>
              }
            </ng-template>

            <mat-form-field class="w-full">
              <mat-chip-grid #chipGrid2>
                @for (item of kind_options; track $index) {
                <mat-chip-row class="min-w-12" (click)="codeInFG.controls.kind.setValue(item[0]); stepper.next()">
                  {{ item[1] }}
                </mat-chip-row>
                }@empty {
                <mat-chip-row>x </mat-chip-row>
                }
                <input type="hidden" [matChipInputFor]="chipGrid2" />
              </mat-chip-grid>
            </mat-form-field>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel>schema: {{ codeInFG.controls.char.value?.name }}</ng-template>
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
            <ng-template matStepLabel>Bewertung: {{ codeInFG.controls.grade.value?.name }}</ng-template>
            <!-- <mat-button-toggle-group formControlName="grade" (change)="stepper.next()">
              @for (item of grad_options; track $index) {
              <mat-button-toggle [value]="item">{{ item.name }}</mat-button-toggle>
              }
            </mat-button-toggle-group> -->
            <mat-form-field class="w-full ">
              <mat-chip-grid #chipGrid4>
                @for (item of grad_options; track $index) {
                <mat-chip-row class="min-w-12" (click)="codeInFG.controls.char.setValue(item); stepper.next()">
                  {{ item.name }}
                </mat-chip-row>
                }@empty {
                <mat-chip-row>x </mat-chip-row>
                }
                <input type="hidden" [matChipInputFor]="chipGrid4" />
              </mat-chip-grid>
            </mat-form-field>
            {{ codeInFG.value | json }}
            @if (codeInFG.controls.kind.value && codeInFG.controls.grade.value) {
            <p>
              {{ this.hint_texts.get(codeInFG.controls.kind.value) }}
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

            <button mat-raised-button type="submit">Submit</button>
          </mat-step>
        </mat-vertical-stepper>
      </form>
    </div>
  `,
})
export class DataEntryComponent implements OnInit {
  supabase = inject(SupabaseService);
  actionService = inject(ActionsService);
  eventService = inject(EventsService);
  snacks = inject(MatSnackBar);
  /**
   *
   */
  @ViewChild('stepper') stepper!: MatStepper;
  /**
   *
   */
  player = this.supabase.getPlayers();
  events = this.eventService.getEvents();
  actions = this.actionService.getActions();
  /**
   *
   */
  hits = computed(async () => {
    return (await this.actions).filter((a) => a.kind === '');
  });
  /**
   *
   */
  codeInFG = new FormGroup({
    game_id: new FormControl<string>('', Validators.required),
    game_set: new FormControl<number>(1, Validators.required),
    player_id: new FormControl<PlTyp | null>(null, Validators.required),
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
      game_id: this.codeInFG.controls.game_id.value,
      game_set: this.codeInFG.controls.game_set.value,
    };
    try {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      await this.actionService.createAction(payload as any);
      this.snacks.open('Created', 'Close', {
        duration: 500,
        panelClass: 'success',
      });
      this.actions = this.actionService.getActions();
      this.codeInFG.reset({ game_id, game_set });
      this.stepper.reset();
    } catch (error) {
      this.snacks.open('Error', 'Close', {
        duration: 1000,
        panelClass: 'error',
      });
    }
  }
  async ngOnInit() {
    const e = await this.events;
    if (!e) return;
    this.codeInFG.controls.game_id.setValue(e[0].id);
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { type MatStepper, MatStepperModule } from '@angular/material/stepper';
import hints from '../app/hints';
import { SupabaseService } from '../app/supabase.service';
import { grad_options_list } from './grade-options';
import { kinds } from './kind-options';
type PlTyp = {
  id: string;
  trikot: number;
  name: string;
};
type abbMap = {
  abbr: string;
  name: string;
};
type kindHintMap = {
  [kind: string]: {
    [grade: string]: string;
  };
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
  ],
  template: `
    <div class="flex flex-col p-5">
      <form
        action=""
        [formGroup]="codeInFG"
        class="flex-col w-full"
        (submit)="submit()"
      >
        <mat-form-field>
          <mat-select formControlName="game_id">
            @for (item of events|async; track $index) {
            <mat-option [value]="item.id" selected>
              {{ item.title }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-vertical-stepper [linear]="false" #stepper>
          <mat-step [hasError]="!codeInFG.controls.player_id.value">
            <ng-template matStepLabel
              >Fill out your name:
              {{ codeInFG.controls.player_id.value?.name }}</ng-template
            >
            <mat-button-toggle-group
              formControlName="player_id"
              (change)="stepper.next()"
            >
              @for (item of player|async; track $index) {
              <mat-button-toggle [value]="item">{{
                item.trikot
              }}</mat-button-toggle>
              }
            </mat-button-toggle-group>
            <span>{{ codeInFG.controls.player_id.value?.name }}</span>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel
              >Art: {{ codeInFG.controls.kind.value?.name }}</ng-template
            >
            <mat-button-toggle-group
              formControlName="kind"
              (change)="stepper.next()"
            >
              @for (item of kind_options; track $index) {
              <mat-button-toggle [value]="item">{{
                item.name
              }}</mat-button-toggle>
              }
            </mat-button-toggle-group>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel
              >Charactiks: {{ codeInFG.controls.char.value?.name }}</ng-template
            >
            <mat-button-toggle-group
              formControlName="char"
              (change)="stepper.next()"
            >
              @for (item of char_options; track $index) {
              <mat-button-toggle [value]="item">{{
                item.name
              }}</mat-button-toggle>
              }
            </mat-button-toggle-group>
          </mat-step>
          <mat-step>
            <ng-template matStepLabel
              >Bewertung: {{ codeInFG.controls.grade.value?.name }}</ng-template
            >
            <mat-button-toggle-group
              formControlName="grade"
              (change)="stepper.next()"
            >
              @for (item of grad_options; track $index) {
              <mat-button-toggle [value]="item">{{
                item.name
              }}</mat-button-toggle>
              }
            </mat-button-toggle-group>
            @if (codeInFG.controls.kind.value && codeInFG.controls.grade.value)
            {

            <p>
              {{
                this.hint_texts[codeInFG.controls.kind.value.abbr][
                  codeInFG.controls.grade.value.abbr
                ]
              }}
            </p>
            }
            <hr />
            <button mat-raised-button type="submit">Submit</button>
          </mat-step>
        </mat-vertical-stepper>
      </form>
    </div>
  `,
})
export class DataEntryComponent implements OnInit {
  supabase = inject(SupabaseService);
  @ViewChild('stepper') stepper!: MatStepper;

  player = this.supabase.getPlayers();
  events = this.supabase.getEvents();
  actions = this.supabase.getActions();
  hits = computed(async () => {
    return (await this.actions).filter((a) => a.kind === '');
  });

  codeInFG = new FormGroup({
    game_id: new FormControl<string>('', Validators.required),
    player_id: new FormControl<PlTyp | null>(null, Validators.required),
    kind: new FormControl<abbMap | null>(null, Validators.required),
    char: new FormControl<abbMap | null>(null, Validators.required),
    grade: new FormControl<abbMap | null>(null, Validators.required),
  });

  hint_texts: kindHintMap = hints;

  /**
   *
   */
  kind_options: abbMap[] = kinds;
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
    const { game_id } = this.codeInFG.value;
    const payload = {
      player_id: this.codeInFG.controls.player_id.value?.id,
      kind: this.codeInFG.controls.kind.value?.abbr,
      character: this.codeInFG.controls.char.value?.abbr,
      grade: this.codeInFG.controls.grade.value?.abbr,
      game_id: this.codeInFG.controls.game_id.value,
    };
    try {
      await this.supabase.createAction(payload);
      this.actions = this.supabase.getActions();
      this.codeInFG.reset({ game_id });
      this.stepper.reset();
    } catch (error) {
      console.error(error);
    }
  }
  async ngOnInit() {
    const e = await this.events;
    if (!e) return;
    this.codeInFG.controls.game_id.setValue(e[0].id);
  }
}

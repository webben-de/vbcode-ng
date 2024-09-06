import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActionDTO, SupabaseService } from '../app/supabase.service';
import { MatFormField } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActionKind } from './kind-options';
import { kindFilterPipe } from './filterKind.pipe';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-gameview',
  imports: [
    CommonModule,
    kindFilterPipe,
    MatFormField,
    MatInputModule,
    NgxEchartsDirective,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  standalone: true,
  template: `
    <div class="flex flex-col">
      <div class="flex gap-8 p-5">
        <form [formGroup]="gameF">
          <mat-form-field>
            <mat-label>Game:</mat-label>
            <mat-select formControlName="game_id">
              @for (item of events|async; track $index) {
              <mat-option [value]="item.id" selected>
                {{ item.title }}
              </mat-option>
              }
            </mat-select>
          </mat-form-field>
        </form>
        <form [formGroup]="newGameF" (submit)="createNewGame()">
          <mat-form-field>
            <mat-label>New Game:</mat-label>
            <input matInput formControlName="title" />
          </mat-form-field>
          <button mat-button type="submit">submit</button>
        </form>
      </div>
      <hr />
      <div class="flex  gap-1 p-5">
        <div class="stats stats-vertical shadow">
          <div class="stat">
            <div class="stat-title">Angriffe</div>
            <div class="stat-value text-secondary">
              {{ (actions | async | kindFilter : kinds.Attack)?.length }}
            </div>
          </div>
          <div class="stat">
            <div class="stat-title">Aufschläge</div>
            <div class="stat-value text-secondary">
              {{ (actions | async | kindFilter : kinds.Serve)?.length }}
            </div>
          </div>
          <div class="stat">
            <div class="stat-title">Annahme</div>
            <div class="stat-value text-secondary">
              {{ (actions | async | kindFilter : kinds.Recieve)?.length }}
            </div>
          </div>
        </div>
        <div class="stats stats-vertical shadow">
          <div class="stat">
            <div class="stat-title">Blocks</div>
            <div class="stat-value text-secondary">
              {{ (actions | async | kindFilter : kinds.Block)?.length }}
            </div>
          </div>
          <div class="stat">
            <div class="stat-title">Zuspiele</div>
            <div class="stat-value text-secondary">
              {{ (actions | async | kindFilter : kinds.Set)?.length }}
            </div>
          </div>
          <div class="stat">
            <div class="stat-title">Defense</div>
            <div class="stat-value text-secondary">
              {{ (actions | async | kindFilter : kinds.Def)?.length }}
            </div>
          </div>
          <div class="stat">
            <div class="stat-title">FreeBall</div>
            <div class="stat-value text-secondary">
              {{ (actions | async | kindFilter : kinds.Free)?.length }}
            </div>
          </div>
        </div>
      </div>
      <div echarts [options]="pieChartDist" class="h-40 w-full"></div>
      <hr />
    </div>
    <!-- <ul class="flex">
      @for (item of actions|async; track $index) {
      <li class="flex gap-2 text-pretty h-4 w-full justify-between ">
        <span>{{ item.player_id.name }}</span>
        <span>{{ item.kind }}</span>
        <span>{{ item.character }}</span>
        <span>{{ item.grade }}</span>
      </li>
      }
    </ul> -->
  `,
})
export class GameViewComponent implements OnInit {
  async createNewGame() {
    await this.supabase.createEvent(this.newGameF.value as any);
    this.newGameF.reset();
  }
  supabase = inject(SupabaseService);
  /**
   *
   */
  events = this.supabase.getEvents();
  /**
   *
   */
  actions?: Promise<ActionDTO[]>;
  hits: ActionDTO[] | undefined = [];
  kinds = ActionKind;
  /**
   *
   */
  gameF = new FormGroup({
    game_id: new FormControl<string>(''),
  });
  pieChartDist: EChartsOption = {
    series: [],
  };
  newGameF = new FormGroup({
    title: new FormControl(''),
    date: new FormControl(new Date()),
  });
  /**
   *
   */
  async ngOnInit() {
    this.events = this.supabase.getEvents();
    const firstId = (await this.events)[0].id;
    this.gameF.controls.game_id.setValue(firstId);
    this.actions = this.supabase.getActionsOfEvent(firstId);
    await this.refreshHits();
    const series = [
      {
        name: 'Attack',
        value: (await this.actions).filter((a) => a.kind === ActionKind.Attack)
          .length,
      },
    ];
    this.pieChartDist.series = series;

    this.gameF.controls.game_id.valueChanges.subscribe(async (d) => {
      this.actions = this.supabase.getActionsOfEvent(d || '');
      await this.refreshHits();
    });
  }

  private async refreshHits() {
    this.hits = (await this.actions)?.filter(
      (a) => a.kind === ActionKind.Attack
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { ActionDTO } from 'src/types/ActionDTO';
import { kindFilterPipe } from '../pipes/filterKind.pipe';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { SupabaseService } from '../services/supabase.service';
import { ActionKind } from '../types/ActionKind';

@Component({
  selector: 'app-gameview',
  imports: [RouterModule, CommonModule, kindFilterPipe, MatFormField, MatInputModule, NgxEchartsDirective, FormsModule, ReactiveFormsModule, MatSelectModule],
  standalone: true,
  template: `
    <div class="flex flex-col max-w-full overflow-hidden">
      <div class="flex gap-8 p-5">
        <form [formGroup]="gameF" class="flex gap-4">
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
          <mat-form-field>
            <mat-label>Satz:</mat-label>

            <mat-select placeholder="Satz" formControlName="game_set" [value]="'Alle'">
              <mat-option value="Alle">Alle</mat-option>
              <mat-option value="1"> 1 </mat-option>
            </mat-select>
          </mat-form-field>
        </form>
      </div>
      <hr />
      <div class="flex w-full justify-between p-5">
        <div class="stats stats-vertical shadow w-1/2">
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
        <div class="stats stats-vertical shadow w-1/2">
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
      <button class="btn" [routerLink]="['/report', 'details', gameF.controls.game_id.value]">Details</button>
      <div echarts [options]="pieChartDist" class="h-40 w-full"></div>
      <hr />
    </div>
  `,
})
export class GameViewComponent implements OnInit {
  supabase = inject(SupabaseService);
  actionsService = inject(ActionsService);
  eventsService = inject(EventsService);
  /**
   *
   */
  events = this.eventsService.getEvents();
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
    game_set: new FormControl<number | string>('Alle'),
  });
  /**
   *
   */
  pieChartDist: EChartsOption = {
    series: [],
  };
  /**
   *
   */
  newGameF = new FormGroup({
    title: new FormControl(''),
    date: new FormControl(new Date()),
  });
  /**
   *
   */
  setCountOptionOfGame = [1];
  /**
   *
   */
  async ngOnInit() {
    this.events = this.eventsService.getEvents();
    const firstId = (await this.events)[0].id;
    this.gameF.controls.game_id.setValue(firstId);
    this.actions = this.actionsService.getActionsOfEvent(firstId);
    await this.refreshHits();
    const series = [
      {
        name: 'Attack',
        value: (await this.actions).filter((a) => a.kind === ActionKind.Attack).length,
      },
    ];
    this.pieChartDist.series = series;

    this.gameF.controls.game_id.valueChanges.subscribe(async (d) => {
      this.actions = this.actionsService.getActionsOfEvent(d || '');
      await this.refreshHits();
    });
  }
  /**
   *
   */
  private async refreshHits() {
    this.hits = (await this.actions)?.filter((a) => a.kind === ActionKind.Attack);
  }
  /**
   *
   */
  async createNewGame() {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    await this.eventsService.createEvent(this.newGameF.value as any);
    this.newGameF.reset();
  }
}

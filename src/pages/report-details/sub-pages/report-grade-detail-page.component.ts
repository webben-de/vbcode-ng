import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionDTO } from '../../../types/ActionDTO';
import { ActionsByPlayerComponent } from '../actions-by-player.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-report-grade-detail-page',
  standalone: true,
  imports: [CommonModule, ActionsByPlayerComponent, RouterModule, MatIconModule],
  template: `
    <div class="flex">
      <button mat-fab class="btn fixed bottom-2 left-1">
        <a [routerLink]="['..', '..', '..']">
          <mat-icon>arrow_back_ios</mat-icon>
        </a>
      </button>
    </div>
    <app-actions-by-player [actions]="actions" />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ReportGradeDetailPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  actions = this.route.snapshot.data['actions'] as ActionDTO[];
  ngOnInit(): void {}
}

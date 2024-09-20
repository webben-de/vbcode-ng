import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActionDTO } from '../../../types/ActionDTO';
import { ActionsByGradeComponent } from '../actions-by-grade.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  host: { class: 'flex flex-col gap-4 p-5 relative' },
  selector: 'app-report-player-detail-page',
  standalone: true,
  imports: [CommonModule, ActionsByGradeComponent, RouterModule, MatIconModule],
  template: `
    <div class="flex">
      <button mat-fab class="fixed bottom-2 left-1">
        <a [routerLink]="['..', '..']">
          <mat-icon>arrow_back_ios</mat-icon>
        </a>
      </button>
    </div>
    <app-actions-by-grade [actions]="actions" />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ReportPlayerDetailPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  actions: ActionDTO[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.actions = this.route.snapshot.data['actions'] as ActionDTO[];
  }
}

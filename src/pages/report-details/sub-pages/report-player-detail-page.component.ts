import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-player-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `<p>report-player-detail-page works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ReportPlayerDetailPageComponent {}

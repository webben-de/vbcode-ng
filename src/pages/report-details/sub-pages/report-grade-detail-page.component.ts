import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-grade-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `<p>report-grade-detail-page works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ReportGradeDetailPageComponent {}

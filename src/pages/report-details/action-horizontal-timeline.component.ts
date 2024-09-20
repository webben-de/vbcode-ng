import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActionsService } from '../../services/action.service';
import type { ActionDTO } from '../../types/ActionDTO';

@Component({
  selector: 'app-action-horizontal-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-8 flex max-w-full overflow-x-scroll">
      <ul class="timeline">
        @for (item of actions(); track $index) {

        <li>
          <hr />
          <div class="timeline-start">{{ item.created_at | date : 'short' }}</div>
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <details class="dropdown">
            <summary class="timeline-end timeline-box">{{ item?.player_id?.name }}</summary>
            <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><a (click)="deleteAction(item.id)">Delete</a></li>
              <!-- <li><a>Edit</a></li> -->
            </ul>
          </details>
          <hr />
        </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ActionHorizontalTimelineComponent {
  actionsService = inject(ActionsService);
  actions = input.required<ActionDTO[]>();
  /**
   *
   * @param id
   * @returns
   */
  async deleteAction(id: number) {
    return await this.actionsService.deleteAction(id);
  }
}

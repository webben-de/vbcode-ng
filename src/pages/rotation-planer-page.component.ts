/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { SessionState } from '../app/session.state';
import { EventsService } from '../services/events.service';
import { MetadataService } from '../services/metadata.service';
import { PlayerService } from '../services/player.service';
import type { ActionDTO } from '../types/ActionDTO';
import type { EventResponse } from '../types/EventDTO';
import type { PlayerDTO } from '../types/PlayerDTO';
import { RotationGridItemComponent } from './atoms/vbGridItem.component';

@Component({
  selector: 'app-rotation-planer',
  host: { class: 'w-full flex h-full' },
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    RotationGridItemComponent,
    TranslocoModule,
  ],
  template: `
    <div class="flex flex-col w-full h-full p-5 justify-center gap-8">
      <div class="flex flex-col">
        <mat-form-field>
          <mat-label>{{ 'event' | transloco }}</mat-label>
          <mat-select placeholder="Select Game" [(ngModel)]="selectedEvent" (valueChange)="handleGameChange($event)">
            @for (item of events|async; track $index) {
            <mat-option [value]="item.id">
              {{ item.title }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        @if(session()?.user?.id === event?.owner) {
        <a [routerLink]="[ROUTES.root + ROUTES.editGame, selectedEvent]">{{ 'edit-this-event' | transloco }}</a>
        }
      </div>
      <hr />
      @if (event) {

      <div class="flex flex-col justify-evenly gap-4">
        <h6 class="text-md">{{ 'rotation' | transloco }}: {{ rotationSlider }}</h6>

        <mat-slide-toggle #toggleTrikot
          >{{ 'show' | transloco }} {{ !toggleTrikot.checked ? ('Trikotnumber' | transloco) : ('BasePosition' | transloco) }}</mat-slide-toggle
        >
        <div class="grid grid-cols-3 gap-8 grid-rows-2 justify-center  border-2 p-8 ">
          <app-grid-item [currentRotation]="slider" [index]="1" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="2" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="3" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="4" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="5" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="6" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
        </div>
        <mat-slider min="1" max="6" step="1" value="1" discrete="true" showTickMarks="true" class="animate-pulse">
          <input matSliderThumb [(ngModel)]="rotationSlider" />
        </mat-slider>
        <p>{{ 'move-the-slider-preview-each-rotation-on-the-curt' | transloco }}</p>
      </div>
      }@else {
      <div class="flex flex-col items-center">
        <mat-icon class="!h-20 ">swipe_up</mat-icon>
        <p>{{ 'please-select-an-event-to-see-information-here' | transloco }}</p>
      </div>
      }
    </div>
  `,
})
export class RotationPlanerPageComponent implements OnInit {
  ROUTES = SVB_APP_ROUTES;
  router = inject(Router);
  meta = inject(MetadataService);
  route = inject(ActivatedRoute);
  eventService = inject(EventsService);
  playerService = inject(PlayerService);
  session = select(SessionState.session);
  /**
   *
   */
  events = this.eventService.getEvents();
  event?: EventResponse;
  roationPlayerBasePositions?: PlayerDTO[];
  roatedPlayer: Map<string | number, PlayerDTO> = new Map();
  /**
   * In the database the rotation is stored as a map of player ids
   * f.e {1: "uuid1", 2: "uuid2"}
   * Because we render the array in the frontend we need to map the player ids to the player objects
   * the map for base position should be
   *  [ index4, index3, index2, index5, index6, index1]
   * So when a rotation is changed for the second rotation
   * 2: [ index5, index4, index3, index6, index1, index2]
   * 3: [ index6, index5, index4, index1, index2, index3]
   * 4: [ index1, index6, index5, index2, index3, index4]
   * 5: [ index2, index1, index6, index3, index4, index5]
   * 6: [ index3, index2, index1, index4, index5, index6]
   *
   */
  rotationSlider = 1;
  selectedEvent?: string;
  lastAction?: ActionDTO;
  /**
   *
   */
  get slider() {
    return String(this.rotationSlider);
  }
  /**
   *
   */
  async ngOnInit(): Promise<void> {
    this.route.data.subscribe(async (data) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      this.event = data['game'];
      this.selectedEvent = this.event?.id;
      await this.updateProps();
      this.meta.updateMetadata(
        {
          title: `${this.event?.title}-> Rotation Planer`,
          description: 'Plan your rotation for your next game',
          type: 'website',
        },
        true
      );
    });
  }
  /**
   *
   * @returns
   */
  private async updateProps() {
    if (!this.event) return;
    this.router.navigate([SVB_APP_ROUTES.root + SVB_APP_ROUTES.roationPlaner, this.event.id]);
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const ids = Object.entries(this.event?.home_team_start_rotation!);
    const map = new Map<string | number, PlayerDTO>();
    const players = await this.playerService.getPlayerList(ids.map((i) => i[1]));
    // biome-ignore lint/complexity/noForEach: <explanation>
    ids.forEach(([key, value]) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      map.set(Number(key), players.find((p) => p.id === value)!);
    });
    this.roatedPlayer = map;
  }

  /**
   *
   * @param $event
   */
  async handleGameChange($event: string) {
    this.event = await this.eventService.getEvent($event);
    this.updateProps();
  }
}

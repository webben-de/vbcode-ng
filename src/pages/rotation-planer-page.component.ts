/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component, type ElementRef, type OnDestroy, type OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { find, without } from 'lodash';
import { type Subscription, interval, takeWhile } from 'rxjs';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { SessionState } from '../app/session.state';
import { EventsService } from '../services/events.service';
import { MetadataService } from '../services/metadata.service';
import { PlayerService } from '../services/player.service';
import type { ActionDTO } from '../types/ActionDTO';
import type { EventResponse, createEventDTO } from '../types/EventDTO';
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
    <div class="max-w-7xl mx-auto w-full p-6">
      <!-- Header Card -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ 'rotation-planer' | transloco }}</h1>

        <!-- Event Selection -->
        <div class="mb-4">
          <mat-form-field class="w-full">
            <mat-label>{{ 'event' | transloco }}</mat-label>
            <mat-select placeholder="Select Game" [(ngModel)]="selectedEvent" (valueChange)="handleGameChange($event)">
              @for (item of events|async; track $index) {
              <mat-option [value]="item.id">
                {{ item.title }}
              </mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Action Buttons -->
        @if(session()?.user?.id === event?.owner) {
        <div class="flex gap-3">
          <a
            [routerLink]="[ROUTES.root + ROUTES.editGame, selectedEvent]"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            {{ 'edit-this-event' | transloco }}
          </a>
          <button
            (click)="copyLinkToClipboard()"
            class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Link kopieren
          </button>
        </div>
        }
      </div>

      @if (event) {
      <!-- Main Content -->
      <div class="space-y-6">
        <!-- Setter Info & Toggle -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span class="text-2xl font-bold text-blue-600">{{ convertRoationCountToSetterPosition }}</span>
              </div>
              <div>
                <p class="text-sm text-gray-600">{{ 'setter' | transloco }}</p>
                <p class="text-lg font-semibold text-gray-800">Position {{ convertRoationCountToSetterPosition }}</p>
              </div>
            </div>

            <mat-slide-toggle #toggleTrikot [checked]="true" class="ml-auto">
              <span class="text-gray-700 text-sm">
                {{ 'show' | transloco }} {{ toggleTrikot.checked ? ('Trikotnumber' | transloco) : ('BasePosition' | transloco) }}
              </span>
            </mat-slide-toggle>
          </div>
        </div>

        <!-- Court Grid -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-xl font-bold text-gray-800 mb-6">Spielfeld - Rotation {{ rotationSlider }}</h2>
          <div class="grid grid-cols-3 gap-6 grid-rows-2 max-w-4xl mx-auto border-4 border-blue-600 rounded-lg p-8 bg-gradient-to-b from-blue-50 to-white">
            <app-grid-item [currentRotation]="slider" [index]="1" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
            <app-grid-item [currentRotation]="slider" [index]="2" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
            <app-grid-item [currentRotation]="slider" [index]="3" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
            <app-grid-item [currentRotation]="slider" [index]="4" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
            <app-grid-item [currentRotation]="slider" [index]="5" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
            <app-grid-item [currentRotation]="slider" [index]="6" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          </div>

          <!-- Rotation Slider -->
          <div class="mt-8 px-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Rotation</span>
              <span class="text-lg font-bold text-blue-600">{{ rotationSlider }}</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value="1"
              [(ngModel)]="rotationSlider"
              (ngModelChange)="onSliderChange($event)"
              class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              #rangeSlider
            />
            <div class="flex justify-between mt-1">
              @for(i of [1,2,3,4,5,6]; track $index) {
              <span class="text-xs text-gray-500">{{ i }}</span>
              }
            </div>

            @if (!hasMoved){
            <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-blue-800">{{ 'move-the-slider-preview-each-rotation-on-the-curt' | transloco }}</p>
              </div>
            </div>
            }
          </div>
        </div>

        <!-- Bank Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Bank
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            @for(b of bank; track $index){
            <div class="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center shadow-lg">
                <span class="text-3xl font-bold">{{ b?.trikot }}</span>
              </div>
              <span class="text-sm font-medium text-gray-800 text-center uppercase">{{ b?.name }}</span>
            </div>
            }
          </div>
        </div>

        <!-- Notes Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Notes
          </h3>
          <textarea
            class="w-full min-h-32 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors resize-y disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="Notizen zum Spiel..."
            [value]="event.notes || ''"
            (change)="updateNotes(notes)"
            #notes
            [disabled]="event.owner !== session()?.user?.id"
          ></textarea>
          @if(event.owner !== session()?.user?.id) {
          <p class="mt-2 text-sm text-gray-500">Nur der Ersteller kann Notizen bearbeiten</p>
          }
        </div>
      </div>
      } @else {
      <!-- Empty State -->
      <div class="bg-white rounded-lg shadow-md p-12">
        <div class="flex flex-col items-center text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Kein Event ausgewählt</h3>
          <p class="text-gray-500">{{ 'please-select-an-event-to-see-information-here' | transloco }}</p>
        </div>
      </div>
      }
    </div>
  `,
})
export class RotationPlanerPageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  async updateNotes(_t71: HTMLTextAreaElement) {
    try {
      await this.eventService.createEvent({
        ...this.event,
        notes: _t71.value,
      } as unknown as createEventDTO);
    } catch (error) {
      this.snack.open('Error saving Note', 'OK', { duration: 2000 });
    }
  }
  copyLinkToClipboard() {
    navigator.clipboard.writeText(document.location.href);
    this.snack.open('Copy to clipboard');
  }
  ROUTES = SVB_APP_ROUTES;
  router = inject(Router);
  snack = inject(MatSnackBar);
  meta = inject(MetadataService);
  route = inject(ActivatedRoute);
  eventService = inject(EventsService);
  playerService = inject(PlayerService);
  session = select(SessionState.session);
  @ViewChild('rangeSlider') rangeSlider!: ElementRef<HTMLInputElement>;
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
  hasMoved = false;
  bank: (PlayerDTO | undefined)[] = [];
  /**
   *
   */
  get slider() {
    return String(this.rotationSlider);
  }
  get convertRoationCountToSetterPosition() {
    switch (this.rotationSlider) {
      case 1:
        return 1;
      case 2:
        return 6;
      case 3:
        return 5;
      case 4:
        return 4;
      case 5:
        return 3;
      case 6:
        return 2;
    }
    return 0;
  }
  private sub?: Subscription;

  /**
   *
   */
  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      const rotation = params['rotation'];
      if (rotation) {
        this.rotationSlider = +rotation;
        this.hasMoved = true;
        this.updateRouteWithRotation();
      }
    });
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
    this.route.queryParams.subscribe((params) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      const rotation = params['rotation'];
      if (rotation) {
        this.rotationSlider = +rotation;
      }
    });
    this.sub = interval(4000)
      .pipe(takeWhile(() => !this.hasMoved))
      .subscribe(() => {
        if (this.rotationSlider === 6) this.rotationSlider = 1;
        else this.rotationSlider += 1;
        this.updateRouteWithRotation();
      });
  }

  onSliderChange(value: number) {
    this.rotationSlider = value;
    this.hasMoved = true;
    this.updateRouteWithRotation();
  }

  private updateRouteWithRotation() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { rotation: this.rotationSlider },
      queryParamsHandling: 'merge',
    });
  }
  /**
   *
   * @returns
   */
  private async updateProps() {
    const playerRoationObjectMap = new Map<string | number, PlayerDTO>();
    if (!this.event) return;
    this.router.navigate([SVB_APP_ROUTES.root + SVB_APP_ROUTES.roationPlaner, this.event.id]);
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const home_roation_ids = Object.entries(this.event?.home_team_start_rotation!);
    const rotationids = Object.values(Object.fromEntries(home_roation_ids));

    const players = await this.playerService.getPlayerList([...home_roation_ids.map((i) => i[1]), ...without(this.event.attendees, ...rotationids)]);
    // biome-ignore lint/complexity/noForEach: <explanation>
    home_roation_ids.forEach(([key, value]) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      playerRoationObjectMap.set(Number(key), players.find((p) => p.id === value)!);
    });
    this.roatedPlayer = playerRoationObjectMap;
    this.bank = without(this.event.attendees, ...rotationids).map((id) => find(players, { id }));
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

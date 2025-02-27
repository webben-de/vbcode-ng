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
import type { EventDTO, EventResponse, createEventDTO } from '../types/EventDTO';
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
        <div class="flex justify-between">
          @if(session()?.user?.id === event?.owner) {
          <a [routerLink]="[ROUTES.root + ROUTES.editGame, selectedEvent]">{{ 'edit-this-event' | transloco }}</a>
          <button class="btn w-16 h-8" (click)="copyLinkToClipboard()">
            <mat-icon class="text-primary">link</mat-icon>
          </button>
          }
        </div>
      </div>
      <hr />
      @if (event) {

      <div class="flex flex-col justify-evenly gap-4">
        <h6 class="text-md">{{ 'setter' | transloco }}: {{ convertRoationCountToSetterPosition }}</h6>

        <mat-slide-toggle #toggleTrikot [checked]="true">
          <span class="!text-primary">
            {{ 'show' | transloco }} {{ toggleTrikot.checked ? ('Trikotnumber' | transloco) : ('BasePosition' | transloco) }}</span
          ></mat-slide-toggle
        >
        <div class="grid grid-cols-3 gap-8 grid-rows-2 justify-center  border-2 p-8 ">
          <app-grid-item [currentRotation]="slider" [index]="1" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="2" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="3" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="4" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="5" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
          <app-grid-item [currentRotation]="slider" [index]="6" [toggleTrikot]="toggleTrikot.checked" [roatedPlayer]="roatedPlayer" />
        </div>
        <input
          type="range"
          min="1"
          max="6"
          value="1"
          class="range range-accent"
          [(ngModel)]="rotationSlider"
          [class.tooltip]="!hasMoved"
          (ngModelChange)="onSliderChange($event)"
          class="tooltip tooltip-open tooltip-secondary"
          data-tip="move to stop auto-rotation"
          #rangeSlider
        />
        @if (!hasMoved){

        <p>{{ 'move-the-slider-preview-each-rotation-on-the-curt' | transloco }}</p>
        }
        <hr />
        <h3>Bank</h3>
        <div class="grid grid-cols-6 gap-2 grid-rows-1 justify-center">
          @for(b of bank; track $index){
          <div class="flex flex-col justify-center items-center gap-2 border border-1 p-3 ">
            <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
              <span class="countdown font-league text-5xl text-center text-primary">
                <span style="--value:{{ b?.trikot }};"></span>
              </span>
            </div>
            <label class="swap font-league uppercase ">
              {{ b?.name }}
            </label>
          </div>
          }
        </div>
        <h3>Notes</h3>
        <textarea
          class="textarea "
          placeholder="Bio"
          style="field-sizing: content;"
          [value]="event.notes || ''"
          (change)="updateNotes(notes)"
          #notes
          [disabled]="event.owner !== session()?.user?.id"
        ></textarea>
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
export class RotationPlanerPageComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  async updateNotes(_t71: HTMLTextAreaElement) {
    try {
      await this.eventService.createEvent({
        ...this.event,
        notes: _t71.value,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } as any);
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

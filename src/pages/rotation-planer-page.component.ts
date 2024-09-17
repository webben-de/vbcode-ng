import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { EventsService } from '../services/events.service';
import { CommonModule } from '@angular/common';
import { EventDTO } from '../types/EventDTO';
import { PlayerService } from '../services/player.service';
import { PlayerDTO } from '../types/PlayerDTO';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rotation-planer',
  host: { class: 'w-full flex h-full' },
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatSliderModule],
  template: `
    <div class="flex flex-col h-full w-1/2 justify-center">
      <mat-form-field>
        <mat-select placeholder="Select Game" [(ngModel)]="selectedEvent" (valueChange)="handleGameChange($event)">
          @for (item of events|async; track $index) {
          <mat-option [value]="item.id">
            {{ item.title }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <!-- {{ selectedEvent | json }} -->
      <a [routerLink]="['/edit-game', selectedEvent]">Edit this event</a>
      <hr />
      <h4>{{ event?.title }}</h4>
      <div class="flex flex-col">
        <mat-slider min="1" max="6" step="1" value="1">
          <input matSliderThumb (change)="handleRoationChange($event)" [(ngModel)]="rotationSlider" />
        </mat-slider>
        <h3>Roation: {{ rotationSlider }}</h3>
        <pre><code>
          {{ rotationMap.get(slider)!.get("1")! |json }}
          {{ rotationMap.get(slider)!.get(2)! |json }}

        </code></pre>
        <div class="grid grid-cols-3">
          <div class="flex w-20 h-20 ">4: {{ roatedPlayer.get(rotationMap.get(slider)!.get(4)!)?.name }}</div>
          <div class="flex w-20 h-20 ">3: {{ roatedPlayer.get(rotationMap.get(slider)!.get(3)!)?.name }}</div>
          <div class="flex w-20 h-20 ">2: {{ roatedPlayer.get(rotationMap.get(slider)!.get(2)!)?.name }}</div>
          <div class="flex w-20 h-20 ">5: {{ roatedPlayer.get(rotationMap.get(slider)!.get(5)!)?.name }}</div>
          <div class="flex w-20 h-20 ">6: {{ roatedPlayer.get(rotationMap.get(slider)!.get(6)!)?.name }}</div>
          <div class="flex w-20 h-20 ">1: {{ roatedPlayer.get(rotationMap.get(slider)!.get(1)!)?.name }}</div>
        </div>
      </div>
    </div>
  `,
})
export class RotationPlanerPageComponent implements OnInit {
  event?: EventDTO;
  roationPlayerBasePositions?: PlayerDTO[];
  roatedPlayer: Map<string | number, PlayerDTO> = new Map();
  rotationMap: Map<string | number, Map<string | number, number | string>> = new Map();
  rotationSlider = 1;
  get slider() {
    return String(this.rotationSlider);
  }
  async handleGameChange($event: any) {
    this.event = await this.eventService.getEvent($event.id);
    // this.roatedPlayer = this.roationPlayerBasePositions = await this.playerService.getPlayerList(Object.values(this.event.home_team_start_rotation));
  }
  handleRoationChange($event: any) {
    const count = $event.target.value;
    if (!this.roationPlayerBasePositions) return;
    // this.roatedPlayer = [...this.roationPlayerBasePositions];
    for (let index = 0; index < count; index++) {
      this.roatedPlayer;
    }
  }
  route = inject(ActivatedRoute);
  eventService = inject(EventsService);
  playerService = inject(PlayerService);
  events = this.eventService.getEvents();
  selectedEvent?: string;
  async ngOnInit(): Promise<void> {
    // [(4, 3, 2, 5, 6, 1)];
    this.rotationMap.set('1', new Map().set(1, 4).set(2, 3).set(3, 2).set(4, 5).set(5, 6).set(6, 1));
    this.rotationMap.set('2', new Map().set(1, 5).set(2, 4));
    // this.rotationMap.set('2', [5, 4, 3, 6, 1, 2]);

    this.route.data.subscribe(async (data) => {
      this.event = data['game'];
      this.selectedEvent = this.event?.id;
      const ids = Object.entries(this.event?.home_team_start_rotation!);
      console.log(ids);
      const map = new Map<string | number, PlayerDTO>();
      const players = await this.playerService.getPlayerList(ids.map((i) => i[1]));
      ids.forEach((value, key, map1) => {
        map.set(Number(value[0]), players.find((p) => p.id === value[1])!);
      });
      this.roatedPlayer = map;
    });
  }
}

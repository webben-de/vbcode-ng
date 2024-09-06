import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { SupabaseService } from "../app/supabase.service";

@Component({
	selector: "app-gameview",
	imports: [CommonModule],
	standalone: true,
	template: `
  <h1>Gameview</h1>
  <ul class="flex flex-col">
    @for (item of actions|async; track $index) {
      <li class="flex gap-2 text-pretty h-4 w-full justify-between ">
        <span>{{item.player_id?.name}}</span>
        <span>{{item.kind}}</span>
        <span>{{item.character}}</span>
        <span>{{item.grade}}</span>
        <span>{{item.game_id?.title}}</span>
        <span>{{item.game_id?.date}}</span>

      </li>
    }
  </ul>
  `,
})
export class GameViewComponent {
	supabase = inject(SupabaseService);
	actions = this.supabase.getActions() as Promise<ActionDTO[]>;
}

export interface ActionDTO {
	id: number;
	created_at: Date;
	kind: string;
	character: string;
	grade: string;
	game_id: GameID;
	player_id: PlayerID;
}

export interface GameID {
	id: string;
	date: Date;
	title: string;
	created_at: Date;
}

export interface PlayerID {
	id: string;
	name: string;
	trikot: number;
	created_at: Date;
}

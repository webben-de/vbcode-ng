import { Injectable, inject } from '@angular/core';
import { select } from '@ngxs/store';
import { SessionState } from '../app/session.state';
import type { EventDTO, EventResponse } from '../types/EventDTO';
import { PlayerService } from './player.service';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  supabase = inject(SupabaseService).supabase;
  playerService = inject(PlayerService);
  user_player = select(SessionState.user_player);
  /**
   *
   * @param id
   * @returns
   */
  async getEventsOfPlayer() {
    let userPlayerId = this.user_player()?.id;
    if (!userPlayerId) userPlayerId = (await this.playerService.getMyPlayer()).id;
    return (await this.supabase.from('events').select('*').contains('attendees', [userPlayerId])).data as EventResponse[];
  }
  /**
   *
   * @param arg0
   * @returns
   */
  async deleteEvent(arg0: string) {
    return (await this.supabase.from('events').delete().eq('id', arg0)).data;
  }
  /**
   *
   * @param id
   * @returns
   */
  async getEvent(id: string) {
    const data = (await this.supabase.from('events').select('*').eq('id', id).limit(1).single()).data as EventResponse;
    return data;
  }
  /**
   *
   * @returns
   */
  async getEvents() {
    return (await this.supabase.from('events').select('*, home_team (*), away_team (*)')).data as EventResponse[];
  }
  /**
   *
   * @param opts
   * @returns
   */
  async createEvent(opts: EventDTO) {
    if (opts?.id === null) opts.id = undefined;
    try {
      if (!opts.id) {
        return await this.supabase.from('events').insert(opts);
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        return await this.supabase.from('events').upsert(opts);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  }
}

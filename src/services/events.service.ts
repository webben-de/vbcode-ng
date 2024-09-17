import { Injectable, inject } from '@angular/core';
import type { EventDTO, EventResponse, createEventDTO } from '../types/EventDTO';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  async deleteEvent(arg0: string) {
    return (await this.supabase.from('events').delete().eq('id', arg0)).data;
  }
  supabase = inject(SupabaseService).supabase;
  /**
   *
   * @param id
   * @returns
   */
  async getEvent(id: string) {
    const data = (await this.supabase.from('events').select('*').eq('id', id).limit(1).single()).data as EventDTO;
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
      } else {
        return await this.supabase.from('events').upsert(opts);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  }
}

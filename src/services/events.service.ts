import { Injectable, inject } from '@angular/core';
import type { EventDTO, createEventDTO } from '../types/EventDTO';
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
    const data = (await this.supabase.from('events').select('*').eq('id', id).limit(1).single()).data;
    return data;
  }
  /**
   *
   * @returns
   */
  async getEvents() {
    return (await this.supabase.from('events').select('*')).data as EventDTO[];
  }
  /**
   *
   * @param opts
   * @returns
   */
  async createEvent(opts: createEventDTO) {
    return await this.supabase.from('events').upsert(opts);
  }
}

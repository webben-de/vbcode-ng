import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  supabase = inject(SupabaseService).supabase;
  /**
   *
   * @param id
   * @returns
   */
  async getEvent(id: string) {
    const data = (await this.supabase.from('events').select('*').eq('id', id))
      .data;
    if (data && data?.length > 0) return data[0] as EventDTO;
    return {};
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
  async createEvent(opts: { title: string; date: string }) {
    return await this.supabase.from('events').insert(opts);
  }
}

export interface EventDTO {
  id: string;
  title: string;
  date: Date;
}

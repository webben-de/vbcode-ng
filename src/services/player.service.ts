import { Injectable, inject } from '@angular/core';
import type { PlayerDTO } from '../types/PlayerDTO';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  supabase = inject(SupabaseService).supabase;

  async getPlayers() {
    return (await this.supabase.from('players').select('*')).data as PlayerDTO[];
  }
}

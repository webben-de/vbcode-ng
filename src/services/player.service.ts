import { Injectable, inject } from '@angular/core';
import type { PlayerDTO } from '../types/PlayerDTO';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  async getPlayer(id: string) {
    const res = (await this.supabase.from('players').select('*').eq('id', id)).data as PlayerDTO[];
    if (res && res.length > 0) return res[0];
    return {} as PlayerDTO;
  }
  async getPlayerList(ids: string[]) {
    const res = (await this.supabase.from('players').select('*').in('id', ids)).data as PlayerDTO[];
    return res;
  }
  supabase = inject(SupabaseService).supabase;

  async getPlayers() {
    return (await this.supabase.from('players').select('*')).data as PlayerDTO[];
  }
}

import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { SessionState } from '../app/session.state';
import type { PlayerDTO } from '../types/PlayerDTO';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  supabase = inject(SupabaseService).supabase;
  store = inject(Store);
  async getMyPlayer() {
    const state = this.store.selectSnapshot(SessionState.session);
    const userId = state?.user?.id;
    if (!userId) throw new Error('No user id found');
    return (await this.supabase.from('players').select('*').eq('user_account', userId).limit(1).single()).data as PlayerDTO;
  }
  /**
   *
   * @param id
   * @returns
   */
  async getPlayer(id: string) {
    const res = (await this.supabase.from('players').select('*').eq('id', id)).data as PlayerDTO[];
    if (res && res.length > 0) return res[0];
    return {} as PlayerDTO;
  }
  /**
   *
   * @param ids
   * @returns
   */
  async getPlayerList(ids: string[]) {
    const res = (await this.supabase.from('players').select('*').in('id', ids)).data as PlayerDTO[];
    return res;
  }
  /**
   *
   * @returns
   */
  async getPlayers() {
    return (await this.supabase.from('players').select('*')).data as PlayerDTO[];
  }
}

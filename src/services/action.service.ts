import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { ActionDTO } from '../types/ActionDTO';
import { ActionGrade } from '../types/ActionGrade';
import { ActionKind } from '../types/ActionKind';
import { SupabaseService } from './supabase.service';
export const TABLENAME_ACTIONS = 'actions';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  supabase = inject(SupabaseService).supabase;
  /**
   *
   * @param game_id
   * @returns
   */
  async getActionsOfEvent(game_id: string) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select('*, player_id (*),game_id (*) ').eq('game_id', game_id)).data as ActionDTO[];
  }
  /**
   *
   * @param game_id
   * @param set
   * @returns
   */
  async getActionsOfEventOfSet(game_id: string, set: number) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select('*, player_id (*),game_id (*) ').eq('game_id', game_id).eq('game_set', set)).data as ActionDTO[];
  }
  /**
   *
   * @returns
   */
  async getActions() {
    return (
      await this.supabase.from(TABLENAME_ACTIONS).select(
        `
			*, 
			player_id (*),
			game_id (*)
			`
      )
    ).data as ActionDTO[];
  }
  /**
   *
   * @param value
   * @returns
   */
  async createAction(value: Partial<ActionDTO>) {
    return (await this.supabase.from(TABLENAME_ACTIONS).upsert(value).select()).data;
  }
  /**
   *
   * @param game_id
   * @returns
   */
  async getAcesOfEvent(game_id: string) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select('*').eq('game_id', game_id).eq('kind', ActionKind.Serve).eq('grade', ActionGrade['#'])).data;
  }
  /**
   *
   * @param arg0
   * @returns
   */
  async deleteAction(arg0: number) {
    return (await this.supabase.from(TABLENAME_ACTIONS).delete().eq('id', arg0)).data;
  }
  /**
   *
   */
  actionChangesChannel = this.supabase
    .channel('actions-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'actions' }, (payload) => {
      console.log('Change received!', payload);
      this.actions$.next(payload);
    })
    .subscribe();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  actions$ = new BehaviorSubject(null as any);
}

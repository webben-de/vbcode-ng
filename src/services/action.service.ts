import { Injectable, inject } from '@angular/core';
import { select } from '@ngxs/store';
import { type Session, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { SessionState } from '../app/session.state';
import type { ActionDTO } from '../types/ActionDTO';
import { ActionGrade } from '../types/ActionGrade';
import { ActionKind } from '../types/ActionKind';
import type { PlayerDTO } from '../types/PlayerDTO';
import { PlayerService } from './player.service';
import { SupabaseService } from './supabase.service';
export const TABLENAME_ACTIONS = 'actions';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  /**
   *
   */
  supabase = inject(SupabaseService).supabase;
  playerService = inject(PlayerService);
  user_player = select(SessionState.user_player);
  /**
   *
   */
  private readonly allColsInclBreakdown = '*, player_id (id, name, trikot) ';
  /**
   *
   * @param player
   * @returns
   */
  async getActionsOfLastEventByPlayer(player: PlayerDTO) {
    try {
      return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('player_id', player.id)).data as ActionDTO[];
    } catch (error) {
      console.error('Error fetching actions of last event by user: ', error);
      return null;
    }
  }
  /**
   *
   * @param id
   * @param player
   * @returns
   */
  async getActionsOfEventByPlayer(id: string, player: string) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('game_id', id).eq('player_id', player)).data;
  }
  /**
   *
   * @param id
   * @param grade
   * @param player
   * @returns
   */
  async getActionsOfEventByGradeAndPlayer(id: string, grade: ActionGrade, player: string) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('game_id', id).eq('grade', grade).eq('player_id', player)).data;
  }
  /**
   *
   * @param id
   * @param grade
   * @returns
   */
  async getActionsOfEventByGrade(id: string, grade: ActionGrade) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('game_id', id).eq('grade', grade)).data;
  }
  /**
   *
   * @param id
   * @param kind
   * @param grade
   * @returns
   */
  async getActionsOfEventByKindAndGrade(id: string, kind: ActionKind, grade: ActionGrade) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('game_id', id).eq('kind', kind).eq('grade', grade)).data;
  }
  /**
   *
   */
  /**
   *
   * @param id
   * @param kind
   * @param player
   * @returns
   */
  async getActionsOfEventByKindAndPlayer(id: string | null, kind: string | null, player: string | null) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('game_id', id).eq('kind', kind).eq('player_id', player))
      .data as ActionDTO[];
  }
  /**
   *
   * @param id
   * @param kind
   * @returns
   */
  async getActionsOfEventByKind(id: string, kind: string) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('game_id', id).eq('kind', kind)).data as ActionDTO[];
  }
  /**
   *
   * @param game_id
   * @returns
   */
  async getActionsOfEvent(game_id: string) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).order('created_at').eq('game_id', game_id)).data as ActionDTO[];
  }
  /**
   *
   * @param game_id
   * @param set
   * @returns
   */
  async getActionsOfEventOfSet(game_id: string, set: number) {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown).eq('game_id', game_id).eq('game_set', set)).data as ActionDTO[];
  }
  /**
   *
   * @returns
   */
  async getActions() {
    return (await this.supabase.from(TABLENAME_ACTIONS).select(this.allColsInclBreakdown)).data as ActionDTO[];
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
      this.actions$.next(payload);
    })
    .subscribe();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  actions$ = new BehaviorSubject(null as any);
}

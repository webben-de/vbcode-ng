import { Injectable } from '@angular/core';
import { Action, Selector, State, type StateContext } from '@ngxs/store';

import type { AuthSession } from '@supabase/supabase-js';
import type { PlayerDTO } from '../types/PlayerDTO';

export interface SessionStateModel {
  session?: AuthSession;
  user_player?: PlayerDTO;
}

export class setAuthSession {
  static readonly type = '[Session] Set Auth Session';
  constructor(public session?: AuthSession | null) {}
}

export class SetMyPlayer {
  static readonly type = '[Session] Set My Player';
  constructor(public player: PlayerDTO) {}
}

@Injectable()
@State<SessionStateModel>({
  name: 'session_state',
  defaults: {
    session: undefined,
    user_player: undefined,
  },
})
export class SessionState {
  @Selector() static session(state: SessionStateModel) {
    return state.session;
  }
  @Selector() static user_player(state: SessionStateModel) {
    return state.user_player;
  }
  @Action(setAuthSession) setAuthSession(ctx: StateContext<SessionStateModel>, action: setAuthSession) {
    if (!action?.session) return;
    ctx.patchState({ session: action.session });
  }
  @Action(SetMyPlayer) setMyPlayer(ctx: StateContext<SessionStateModel>, action: SetMyPlayer) {
    ctx.patchState({ user_player: action.player });
  }
}

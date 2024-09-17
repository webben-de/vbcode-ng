import { Injectable } from '@angular/core';
import { Action, Selector, State, type StateContext } from '@ngxs/store';

import type { AuthSession } from '@supabase/supabase-js';

export interface SessionStateModel {
  session?: AuthSession;
}

export class setAuthSession {
  static readonly type = '[Session] Set Auth Session';
  constructor(public session?: AuthSession | null) {}
}

@Injectable()
@State<SessionStateModel>({
  name: 'session_state',
  defaults: {
    session: undefined,
  },
})
export class SessionState {
  @Selector() static session(state: SessionStateModel) {
    return state.session;
  }
  @Action(setAuthSession) setAuthSession(ctx: StateContext<SessionStateModel>, action: setAuthSession) {
    if (!action?.session) return;
    ctx.patchState({ session: action.session });
  }
}

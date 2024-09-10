import { Injectable, signal } from '@angular/core';
import {
  type AuthChangeEvent,
  type AuthSession,
  type Session,
  type SupabaseClient,
  type User,
  createClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { ActionKind } from '../components/kind-options';
import { ActionGrade } from '../components/grade-options';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  async getEvent(arg0: string) {
    const data = (await this.supabase.from('events').select('*').eq('id', arg0))
      .data;
    if (data && data?.length > 0) return data[0];
  }
  async getActionsOfEvent(d: string) {
    return (
      await this.supabase
        .from('actions')
        .select(
          `
			*, 
			player_id (*),
			game_id (*)
			`
        )
        .eq('game_id', d)
    ).data as ActionDTO[];
  }
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select('username, website, avatar_url')
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signInOTP(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }
  signInPW(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }
  async createEvent(opts: { title: string; date: string }) {
    return await this.supabase.from('events').insert(opts);
  }
  async getEvents() {
    return (await this.supabase.from('events').select('*')).data as {
      id: string;
      title: string;
      date: Date;
    }[];
  }
  async getPlayers() {
    return (await this.supabase.from('players').select('*')).data as {
      id: string;
      name: string;
      trikot: number;
    }[];
  }
  async getActions() {
    return (
      await this.supabase.from('actions').select(`
			*, 
			player_id (*),
			game_id (*)
			`)
    ).data as ActionDTO[];
  }
  async createAction(value: any) {
    return (await this.supabase.from('actions').upsert(value).select()).data;
  }
  async getAces(game_id: string) {
    return (
      await this.supabase
        .from('actions')
        .select('*')
        .eq('game_id', game_id)
        .eq('kind', ActionKind.Serve)
        .eq('grade', ActionGrade['#'])
    ).data;
  }
  async getGameStats(game_id: string) {
    return await this.supabase.rpc('getGameStats', { game_id });
  }
  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
}

export interface ActionDTO {
  id: number;
  created_at: Date;
  kind: string;
  character: string;
  grade: string;
  game_id: GameID;
  player_id: PlayerID;
}

export interface GameID {
  id: string;
  date: Date;
  title: string;
  created_at: Date;
}

export interface PlayerID {
  id: string;
  name: string;
  trikot: number;
  created_at: Date;
}

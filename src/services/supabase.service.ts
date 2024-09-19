import { Injectable } from '@angular/core';
import { type AuthChangeEvent, type AuthSession, type Session, type SupabaseClient, type User, createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import type { PlayerDTO } from '../types/PlayerDTO';
import { dispatch } from '@ngxs/store';
import { setAuthSession } from '../app/session.state';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  setAuthSession = dispatch(setAuthSession);
  public supabase: SupabaseClient;
  _session: AuthSession | null = null;
  public currentUser = new BehaviorSubject<null | User>(null);
  /**
   *
   */
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.setAuthSession(session);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) this.currentUser.next(session.user);
      } else {
        this.currentUser.next(null);
      }
    });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase.from('profiles').select('username, website, avatar_url').eq('id', user.id).single();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
  signInGoogle() {
    return this.supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '/' } });
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

  updateProfile(profile: Partial<Profile>) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  async getPlayers() {
    const data: PlayerDTO[] | null = (await this.supabase.from('players').select('*')).data;
    if (!data) return [];
    return data.sort((a, b) => a.trikot - b.trikot);
  }

  async getGameStats(game_id: string) {
    return await this.supabase.rpc('getGameStats', { game_id });
  }
  downLoadImage(path: string) {
    return this.supabase.storage.from('profile_pictures').download(path);
  }
  /**
   *
   * @param filePath
   * @param file
   * @returns
   */
  async uploadAvatar(filePath: string, file: File) {
    return (await this.supabase.storage.from('profile_pictures').upload(filePath, file)).data?.path;
  }
  /**
   *
   * @returns
   */
  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }
  /**
   *
   * @returns
   */
  getCurrentUserId(): string {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return 'null';
    }
  }
  /**
   *
   * @param id
   * @returns
   */
  async getProfile(id: string | undefined) {
    return this.supabase.from('profiles').select('*').eq('id', id).single();
  }
}

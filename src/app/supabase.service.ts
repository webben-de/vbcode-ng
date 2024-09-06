import { Injectable } from "@angular/core";
import {
	type AuthChangeEvent,
	type AuthSession,
	type Session,
	type SupabaseClient,
	type User,
	createClient,
} from "@supabase/supabase-js";
import { environment } from "../environments/environment";

export interface Profile {
	id?: string;
	username: string;
	website: string;
	avatar_url: string;
}

@Injectable({
	providedIn: "root",
})
export class SupabaseService {
	private supabase: SupabaseClient;
	_session: AuthSession | null = null;

	constructor() {
		this.supabase = createClient(
			environment.supabaseUrl,
			environment.supabaseKey,
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
			.from("profiles")
			.select("username, website, avatar_url")
			.eq("id", user.id)
			.single();
	}

	authChanges(
		callback: (event: AuthChangeEvent, session: Session | null) => void,
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

		return this.supabase.from("profiles").upsert(update);
	}
	async getEvents() {
		return (await this.supabase.from("events").select("*")).data;
	}
	async getPlayers() {
		return (await this.supabase.from("players").select("*")).data as {
			id: string;
			name: string;
			trikot: number;
		}[];
	}
	async getActions() {
		return (await this.supabase.from("actions").select("*")).data;
	}
	async createAction(value: any) {
		return (await this.supabase.from("actions").upsert(value).select()).data;
	}

	downLoadImage(path: string) {
		return this.supabase.storage.from("avatars").download(path);
	}

	uploadAvatar(filePath: string, file: File) {
		return this.supabase.storage.from("avatars").upload(filePath, file);
	}
}

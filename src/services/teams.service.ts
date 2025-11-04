import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  async addPlayerToTeam(id: string, id1: string) {
    const allPlayerOfTeam = (await this.supabase.from('teams').select('players').eq('id', id).single()).data;
    if (!allPlayerOfTeam) return;
    return this.supabase
      .from('teams')
      .update({ players: [...allPlayerOfTeam.players, id1] })
      .eq('id', id)
      .select();
  }
  async createTeam(value: createTeamDTO) {
    return (await this.supabase.from('teams').upsert(value).select()).data;
  }
  supabase = inject(SupabaseService).supabase;

  async getTeams() {
    return (await this.supabase.from('teams').select('*')).data as TeamDTO[];
  }
  async getTeam(id: string) {
    const data = (await this.supabase.from('teams').select('*').eq('id', id)).data as TeamDTO[];
    if (data && data.length > 0) return data[0];
    return {} as TeamDTO;
  }

  async deleteTeam(id: string) {
    return await this.supabase.from('teams').delete().eq('id', id);
  }
}

export interface TeamDTO {
  id: string;
  name: string;
  players: string[];
}
export interface createTeamDTO {
  id: string;
  name: string;
  players: string[];
}

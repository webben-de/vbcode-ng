export interface ActionDTO {
  id: number;
  created_at: Date;
  kind: string;
  character: string;
  grade: string;
  game_id: GameID;
  player_id: PlayerID;
  game_set: number;
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

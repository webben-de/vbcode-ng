-- Database Schema for VBCode Application
-- Generated from service layer analysis
-- This schema is designed for Supabase/PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Profiles table (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT,
    website TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_account UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    trikot INTEGER NOT NULL,
    roles TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    players UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events/Games table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    owner UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    home_team UUID REFERENCES teams(id) ON DELETE SET NULL,
    away_team UUID REFERENCES teams(id) ON DELETE SET NULL,
    result_home INTEGER DEFAULT 0,
    result_away INTEGER DEFAULT 0,
    setpoint_results_home INTEGER,
    setpoint_results_away INTEGER,
    home_team_start_rotation JSONB DEFAULT '{}',
    away_team_start_rotation UUID[] DEFAULT '{}',
    attendees UUID[] DEFAULT '{}',
    shared_with UUID[] DEFAULT '{}',
    media_links TEXT[] DEFAULT '{}',
    notes TEXT,
    visibility TEXT CHECK (visibility IN ('Public', 'Private')) DEFAULT 'Private',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Actions table (for tracking game actions/statistics)
CREATE TABLE IF NOT EXISTS actions (
    id SERIAL PRIMARY KEY,
    game_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (kind IN ('S', 'R', 'A', 'B', 'D', 'E', 'F', 'UNKNOWN')),
    character TEXT,
    grade TEXT CHECK (grade IN ('#', '+', '!', '/', '-', '=')),
    game_set INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Players indexes
CREATE INDEX IF NOT EXISTS idx_players_user_account ON players(user_account);
CREATE INDEX IF NOT EXISTS idx_players_trikot ON players(trikot);
CREATE INDEX IF NOT EXISTS idx_players_name ON players(name);

-- Teams indexes
CREATE INDEX IF NOT EXISTS idx_teams_name ON teams(name);
CREATE INDEX IF NOT EXISTS idx_teams_players ON teams USING GIN(players);

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_owner ON events(owner);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_home_team ON events(home_team);
CREATE INDEX IF NOT EXISTS idx_events_away_team ON events(away_team);
CREATE INDEX IF NOT EXISTS idx_events_attendees ON events USING GIN(attendees);
CREATE INDEX IF NOT EXISTS idx_events_visibility ON events(visibility);

-- Actions indexes
CREATE INDEX IF NOT EXISTS idx_actions_game_id ON actions(game_id);
CREATE INDEX IF NOT EXISTS idx_actions_player_id ON actions(player_id);
CREATE INDEX IF NOT EXISTS idx_actions_kind ON actions(kind);
CREATE INDEX IF NOT EXISTS idx_actions_grade ON actions(grade);
CREATE INDEX IF NOT EXISTS idx_actions_game_set ON actions(game_set);
CREATE INDEX IF NOT EXISTS idx_actions_created_at ON actions(created_at);
CREATE INDEX IF NOT EXISTS idx_actions_game_player ON actions(game_id, player_id);
CREATE INDEX IF NOT EXISTS idx_actions_game_kind ON actions(game_id, kind);
CREATE INDEX IF NOT EXISTS idx_actions_game_grade ON actions(game_id, grade);
CREATE INDEX IF NOT EXISTS idx_actions_game_kind_grade ON actions(game_id, kind, grade);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE profiles IS 'User profiles linked to Supabase authentication';
COMMENT ON TABLE players IS 'Players in the volleyball system, can be linked to user accounts';
COMMENT ON TABLE teams IS 'Volleyball teams with their player rosters';
COMMENT ON TABLE events IS 'Games/events/matches with teams, results, and metadata';
COMMENT ON TABLE actions IS 'Individual game actions for statistics tracking (serves, attacks, blocks, etc.)';

COMMENT ON COLUMN players.trikot IS 'Jersey/shirt number';
COMMENT ON COLUMN players.roles IS 'Player roles/positions on the court';

COMMENT ON COLUMN events.home_team_start_rotation IS 'Starting rotation configuration for home team (JSON object with position mappings)';
COMMENT ON COLUMN events.away_team_start_rotation IS 'Starting rotation configuration for away team (array of player IDs)';
COMMENT ON COLUMN events.attendees IS 'Array of player IDs who attended the event';
COMMENT ON COLUMN events.shared_with IS 'Array of user IDs with whom the event is shared';
COMMENT ON COLUMN events.setpoint_results_home IS 'Set point results for home team';
COMMENT ON COLUMN events.setpoint_results_away IS 'Set point results for away team';

COMMENT ON COLUMN actions.kind IS 'Type of action: S=Serve, R=Receive, A=Attack, B=Block, D=Defense, E=Set, F=Free';
COMMENT ON COLUMN actions.grade IS 'Quality grade: #=Ace/Perfect, +=Excellent, !=Good, /=OK, -=Poor, ==Error';
COMMENT ON COLUMN actions.game_set IS 'Set number within the game';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE actions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Players policies
CREATE POLICY "Players are viewable by authenticated users"
    ON players FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can create players"
    ON players FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Users can update their own player profile"
    ON players FOR UPDATE
    TO authenticated
    USING (user_account = auth.uid());

-- Teams policies
CREATE POLICY "Teams are viewable by authenticated users"
    ON teams FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can create teams"
    ON teams FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Users can update teams"
    ON teams FOR UPDATE
    TO authenticated
    USING (true);

-- Events policies
CREATE POLICY "Users can view public events"
    ON events FOR SELECT
    USING (visibility = 'Public' OR owner = auth.uid() OR auth.uid() = ANY(shared_with));

CREATE POLICY "Users can create events"
    ON events FOR INSERT
    TO authenticated
    WITH CHECK (owner = auth.uid());

CREATE POLICY "Users can update their own events"
    ON events FOR UPDATE
    TO authenticated
    USING (owner = auth.uid());

CREATE POLICY "Users can delete their own events"
    ON events FOR DELETE
    TO authenticated
    USING (owner = auth.uid());

-- Actions policies
CREATE POLICY "Users can view actions for events they can access"
    ON actions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM events
            WHERE events.id = actions.game_id
            AND (events.visibility = 'Public' OR events.owner = auth.uid() OR auth.uid() = ANY(events.shared_with))
        )
    );

CREATE POLICY "Users can create actions for events they own"
    ON actions FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM events
            WHERE events.id = actions.game_id
            AND events.owner = auth.uid()
        )
    );

CREATE POLICY "Users can update actions for events they own"
    ON actions FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM events
            WHERE events.id = actions.game_id
            AND events.owner = auth.uid()
        )
    );

CREATE POLICY "Users can delete actions for events they own"
    ON actions FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM events
            WHERE events.id = actions.game_id
            AND events.owner = auth.uid()
        )
    );

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_pictures', 'profile_pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile pictures
CREATE POLICY "Users can upload their own profile picture"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Profile pictures are publicly accessible"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'profile_pictures');

CREATE POLICY "Users can update their own profile picture"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile picture"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to get game statistics (referenced in supabase.service.ts)
CREATE OR REPLACE FUNCTION getGameStats(game_id UUID)
RETURNS TABLE (
    player_id UUID,
    player_name TEXT,
    player_trikot INTEGER,
    total_actions BIGINT,
    serves BIGINT,
    receives BIGINT,
    attacks BIGINT,
    blocks BIGINT,
    defs BIGINT,
    sets BIGINT,
    aces BIGINT,
    errors BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id AS player_id,
        p.name AS player_name,
        p.trikot AS player_trikot,
        COUNT(*) AS total_actions,
        COUNT(*) FILTER (WHERE a.kind = 'S') AS serves,
        COUNT(*) FILTER (WHERE a.kind = 'R') AS receives,
        COUNT(*) FILTER (WHERE a.kind = 'A') AS attacks,
        COUNT(*) FILTER (WHERE a.kind = 'B') AS blocks,
        COUNT(*) FILTER (WHERE a.kind = 'D') AS defs,
        COUNT(*) FILTER (WHERE a.kind = 'E') AS sets,
        COUNT(*) FILTER (WHERE a.grade = '#') AS aces,
        COUNT(*) FILTER (WHERE a.grade = '=') AS errors
    FROM actions a
    JOIN players p ON a.player_id = p.id
    WHERE a.game_id = getGameStats.game_id
    GROUP BY p.id, p.name, p.trikot
    ORDER BY p.trikot;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- REALTIME SUBSCRIPTIONS
-- ============================================================================

-- Enable realtime for actions table (used in action.service.ts)
ALTER PUBLICATION supabase_realtime ADD TABLE actions;

-- ============================================================================
-- SAMPLE DATA (OPTIONAL)
-- ============================================================================

-- Uncomment to insert sample action kinds reference
-- This is reference data based on ActionKind enum
/*
COMMENT ON COLUMN actions.kind IS '
Action Kinds Reference:
- S: Serve
- R: Receive
- A: Attack
- B: Block
- D: Defense
- E: Set
- F: Free
- UNKNOWN: Unknown action
';

COMMENT ON COLUMN actions.grade IS '
Action Grades Reference:
- #: Ace/Perfect (green: #0fc715)
- !: Excellent (green: #469910)
- +: Good (yellow-green: #6c790d)
- /: OK (yellow: #d4d50d)
- -: Poor (orange-red: #c33105)
- =: Error (red: #ff0000)
';
*/

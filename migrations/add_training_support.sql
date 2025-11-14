-- Migration to add training session support
-- This migration adds the ability to track training sessions in addition to games

-- Add event_type column to events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS event_type TEXT CHECK (event_type IN ('game', 'training')) DEFAULT 'game';

-- Set existing events to 'game' type
UPDATE events SET event_type = 'game' WHERE event_type IS NULL;

-- Add index for event_type
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);

-- Update comment for events table
COMMENT ON TABLE events IS 'Games/events/matches and training sessions with teams, results, and metadata';

-- Update comment for event_type column
COMMENT ON COLUMN events.event_type IS 'Type of event: game (competitive match) or training (practice session)';

-- Update comment for actions table
COMMENT ON TABLE actions IS 'Individual game/training actions for statistics tracking (serves, attacks, blocks, etc.)';

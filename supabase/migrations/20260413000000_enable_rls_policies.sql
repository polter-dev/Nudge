-- ============================================================
-- Enable RLS and add per-table access policies
-- "Server-only" operations have no policy for anon/authenticated,
-- meaning they are denied by default. The service role key
-- bypasses RLS entirely, so server inserts/updates/deletes
-- still work.
-- ============================================================

-- ========================
-- profiles
-- ========================
-- Users can read and update only their own profile row.
-- INSERT is handled server-side (signup trigger / service role).

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ========================
-- live_queue
-- ========================
-- Users can see, join, and leave the queue for themselves only.

ALTER TABLE live_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "live_queue_select_own"
  ON live_queue FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "live_queue_insert_own"
  ON live_queue FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "live_queue_delete_own"
  ON live_queue FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ========================
-- sessions
-- ========================
-- Users can read sessions they participate in.
-- All writes are server-only (no policy = denied).

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sessions_select_participant"
  ON sessions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM session_participants sp
      WHERE sp.session_id = sessions.id
        AND sp.user_id = auth.uid()
    )
  );

-- ========================
-- session_participants
-- ========================
-- Users can see rows where they are the participant.
-- INSERT/DELETE are server-only.

ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "session_participants_select_own"
  ON session_participants FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ========================
-- user_session_summaries
-- ========================
-- Users can read their own summaries.
-- INSERT/UPDATE are server-only.

ALTER TABLE user_session_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_session_summaries_select_own"
  ON user_session_summaries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ========================
-- messages
-- ========================
-- Users can read messages in sessions they participate in,
-- and insert messages as themselves.

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_participant"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM session_participants sp
      WHERE sp.session_id = messages.session_id
        AND sp.user_id = auth.uid()
    )
  );

CREATE POLICY "messages_insert_own"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ========================
-- session_summaries
-- ========================
-- Users can read summaries for sessions they participate in.
-- All writes are server-only.

ALTER TABLE session_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "session_summaries_select_participant"
  ON session_summaries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM session_participants sp
      WHERE sp.session_id = session_summaries.session_id
        AND sp.user_id = auth.uid()
    )
  );

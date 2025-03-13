/*
  # Add auth sessions tracking

  1. New Tables
    - `auth_sessions`: Historique des connexions
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamp)
      - `last_seen_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to view their own sessions
*/

CREATE TABLE auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now()
);

ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions"
  ON auth_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update session on login
CREATE OR REPLACE FUNCTION handle_auth_session()
RETURNS trigger AS $$
BEGIN
  INSERT INTO auth_sessions (
    user_id,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    current_setting('request.headers')::json->>'x-real-ip',
    current_setting('request.headers')::json->>'user-agent'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to track new sessions
CREATE TRIGGER on_auth_user_login
  AFTER INSERT ON auth.sessions
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_session();
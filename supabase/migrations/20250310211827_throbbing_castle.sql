/*
  # Initial Schema for General Express Voyages

  1. New Tables
    - `cities`: Villes desservies
      - `id` (uuid, primary key)
      - `name` (text): Nom de la ville
      - `created_at` (timestamp)
    
    - `routes`: Trajets disponibles
      - `id` (uuid, primary key)
      - `departure_city_id` (uuid, foreign key)
      - `arrival_city_id` (uuid, foreign key)
      - `price` (integer): Prix en FCFA
      - `duration` (interval): Durée du trajet
      - `created_at` (timestamp)
    
    - `schedules`: Horaires des voyages
      - `id` (uuid, primary key)
      - `route_id` (uuid, foreign key)
      - `departure_time` (time): Heure de départ
      - `created_at` (timestamp)
    
    - `bookings`: Réservations
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `route_id` (uuid, foreign key)
      - `travel_date` (date)
      - `schedule_id` (uuid, foreign key)
      - `status` (text): État de la réservation
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create cities table
CREATE TABLE cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cities are viewable by everyone"
  ON cities
  FOR SELECT
  TO public
  USING (true);

-- Create routes table
CREATE TABLE routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  departure_city_id uuid REFERENCES cities(id) NOT NULL,
  arrival_city_id uuid REFERENCES cities(id) NOT NULL,
  price integer NOT NULL CHECK (price > 0),
  duration interval NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT different_cities CHECK (departure_city_id != arrival_city_id)
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Routes are viewable by everyone"
  ON routes
  FOR SELECT
  TO public
  USING (true);

-- Create schedules table
CREATE TABLE schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid REFERENCES routes(id) NOT NULL,
  departure_time time NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schedules are viewable by everyone"
  ON schedules
  FOR SELECT
  TO public
  USING (true);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  route_id uuid REFERENCES routes(id) NOT NULL,
  travel_date date NOT NULL CHECK (travel_date >= CURRENT_DATE),
  schedule_id uuid REFERENCES schedules(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending bookings
CREATE POLICY "Users can update own pending bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Insert initial cities
INSERT INTO cities (name) VALUES
  ('Douala'),
  ('Yaoundé'),
  ('Bafoussam'),
  ('Dschang'),
  ('Bamenda'),
  ('Foumban'),
  ('Kribi');
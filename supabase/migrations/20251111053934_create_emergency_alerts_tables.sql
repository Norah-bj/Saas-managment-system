/*
  # Emergency & Alerts Management System Tables

  ## Overview
  Creates tables for managing emergencies, alerts, ambulances, and geographic zones.

  ## New Tables
  
  ### `emergencies`
  Main table for emergency incidents:
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Emergency description
  - `type` (text) - Type (Critical/Urgent/Moderate)
  - `location` (text) - Location description
  - `chw_name` (text) - CHW reporting the emergency
  - `chw_phone` (text) - CHW contact phone
  - `status` (text) - Status (Active/Resolved/Pending)
  - `created_at` (timestamptz) - Report timestamp
  - `resolved_at` (timestamptz) - Resolution timestamp

  ### `ambulances`
  Ambulance tracking:
  - `id` (uuid, primary key) - Unique identifier
  - `registration_number` (text) - Vehicle registration
  - `driver_name` (text) - Driver name
  - `phone_number` (text) - Driver phone
  - `location` (text) - Current location
  - `status` (text) - Status (Available/In Transit/At Hospital)
  - `created_at` (timestamptz) - Record creation timestamp

  ### `zones`
  Geographic zone boundaries:
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Zone name
  - `color` (text) - Color code for map
  - `status` (text) - Zone status
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated access
*/

-- Create emergencies table
CREATE TABLE IF NOT EXISTS emergencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'Urgent',
  location text NOT NULL,
  chw_name text NOT NULL,
  chw_phone text NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Create ambulances table
CREATE TABLE IF NOT EXISTS ambulances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number text NOT NULL UNIQUE,
  driver_name text NOT NULL,
  phone_number text NOT NULL,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'Available',
  created_at timestamptz DEFAULT now()
);

-- Create zones table
CREATE TABLE IF NOT EXISTS zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ambulances ENABLE ROW LEVEL SECURITY;
ALTER TABLE zones ENABLE ROW LEVEL SECURITY;

-- RLS Policies for emergencies
CREATE POLICY "Authenticated users can view emergencies"
  ON emergencies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert emergencies"
  ON emergencies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update emergencies"
  ON emergencies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for ambulances
CREATE POLICY "Authenticated users can view ambulances"
  ON ambulances FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert ambulances"
  ON ambulances FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update ambulances"
  ON ambulances FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for zones
CREATE POLICY "Authenticated users can view zones"
  ON zones FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample data for emergencies
INSERT INTO emergencies (title, type, location, chw_name, chw_phone, status, created_at) VALUES
  ('Maternal Hemorrhage', 'Critical', 'Location: Inyabuthu', 'UWASE Cloudine', '+250788123456', 'Active', now() - INTERVAL '5 minutes'),
  ('Severe Malaria', 'Urgent', 'Location: Inyabuthu', 'UWASE Cloudine', '+250788123456', 'Active', now() - INTERVAL '8 minutes'),
  ('Acute Respiratory', 'Moderate', 'Location: Inyabuthu', 'UWASE Cloudine', '+250788123456', 'Resolved', now() - INTERVAL '10 minutes');

-- Insert sample ambulances
INSERT INTO ambulances (registration_number, driver_name, phone_number, location, status) VALUES
  ('AMB-00833', 'Kalisa John', 'Kimetogotumu Hospital', 'Kimironko / Biryogo', 'Available'),
  ('AMB-00835', 'Kalisa John', 'Kimetogotumu Hospital', 'Kimironko / Biryogo', 'Available'),
  ('AMB-00837', 'Kalisa John', 'Kimetogotumu Hospital', 'Kimironko / Biryogo', 'In Transit'),
  ('AMB-00839', 'Kalisa John', 'Kimetogotumu Hospital', 'Kimironko / Biryogo', 'At Hospital');

-- Insert sample zones
INSERT INTO zones (name, color, status) VALUES
  ('Gasabo', '#FF6B6B', 'Active'),
  ('Kicukiro', '#4ECDC4', 'Active'),
  ('Nyarugenge', '#FFE66D', 'Active'),
  ('Remera', '#A8E6CF', 'Active'),
  ('Kimironko', '#FF9A76', 'Active'),
  ('Muhima', '#C7A3FF', 'Active');

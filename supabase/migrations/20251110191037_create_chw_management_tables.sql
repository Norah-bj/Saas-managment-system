/*
  # CHW Management System Tables

  ## Overview
  Creates tables for managing Community Health Workers (CHWs) including their profiles,
  assignments, and activity tracking.

  ## New Tables
  
  ### `chws`
  Main table storing CHW information:
  - `id` (uuid, primary key) - Unique identifier
  - `full_name` (text) - CHW's full name
  - `gender` (text) - Gender (Male/Female/Other)
  - `phone_number` (text) - Contact phone number
  - `location` (text) - Assigned location/area
  - `start_date` (date) - Date started working
  - `status` (text) - Current status (Active/Inactive)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `chw_assignments`
  Tracks CHW assignments and workload:
  - `id` (uuid, primary key) - Unique identifier
  - `chw_id` (uuid, foreign key) - Reference to CHW
  - `assigned_households` (integer) - Number of households assigned
  - `completed_visits` (integer) - Visits completed
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to read CHW data
  - Add policies for authenticated users to manage CHW records
*/

-- Create CHWs table
CREATE TABLE IF NOT EXISTS chws (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  gender text NOT NULL DEFAULT 'Female',
  phone_number text NOT NULL,
  location text NOT NULL,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create CHW assignments table
CREATE TABLE IF NOT EXISTS chw_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chw_id uuid REFERENCES chws(id) ON DELETE CASCADE,
  assigned_households integer DEFAULT 0,
  completed_visits integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chws ENABLE ROW LEVEL SECURITY;
ALTER TABLE chw_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chws table
CREATE POLICY "Authenticated users can view CHWs"
  ON chws FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert CHWs"
  ON chws FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update CHWs"
  ON chws FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete CHWs"
  ON chws FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for chw_assignments table
CREATE POLICY "Authenticated users can view CHW assignments"
  ON chw_assignments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert CHW assignments"
  ON chw_assignments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update CHW assignments"
  ON chw_assignments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete CHW assignments"
  ON chw_assignments FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO chws (full_name, gender, phone_number, location, start_date, status) VALUES
  ('Uwase Marie Claire', 'Female', '+250733333333', 'Kimironko / Biryogo', '2025-09-25', 'Active'),
  ('Mugisha Jean Paul', 'Male', '+250788888888', 'Remera / Gisozi', '2025-08-15', 'Active'),
  ('Umutoni Grace', 'Female', '+250722222222', 'Kicukiro / Niboye', '2025-07-10', 'Active'),
  ('Niyonzima Patrick', 'Male', '+250799999999', 'Nyarugenge / Nyamirambo', '2025-06-20', 'Inactive'),
  ('Mukamana Sarah', 'Female', '+250711111111', 'Gasabo / Kinyinya', '2025-05-05', 'Active'),
  ('Habimana David', 'Male', '+250744444444', 'Kimironko / Gikondo', '2025-04-12', 'Active'),
  ('Kamanzi Alice', 'Female', '+250755555555', 'Remera / Rusororo', '2025-03-18', 'Active'),
  ('Bizimana Eric', 'Male', '+250766666666', 'Kicukiro / Kanombe', '2025-02-22', 'Inactive'),
  ('Nyirahabimana Jane', 'Female', '+250777777777', 'Nyarugenge / Muhima', '2025-01-30', 'Active'),
  ('Ndayambaje Robert', 'Male', '+250733333334', 'Gasabo / Jabana', '2024-12-15', 'Active');

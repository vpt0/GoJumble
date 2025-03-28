/*
  # Create words table for the word game

  1. New Tables
    - `words`
      - `id` (bigint, primary key)
      - `word` (text, not null)
      - `difficulty` (text, not null) - enum: 'easy', 'medium', 'hard'
      - `category` (text, not null) - enum: 'doctor', 'scientist', 'astronaut'
      - `hint` (text, not null)
      - `created_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on `words` table
    - Add policy for authenticated and anonymous users to read words
*/

-- Create enum types for difficulty and category
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE word_category AS ENUM ('doctor', 'scientist', 'astronaut');

-- Create words table
CREATE TABLE IF NOT EXISTS words (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  word text NOT NULL,
  difficulty difficulty_level NOT NULL,
  category word_category NOT NULL,
  hint text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading words for all users
CREATE POLICY "Allow reading words for all users"
  ON words
  FOR SELECT
  TO PUBLIC
  USING (true);
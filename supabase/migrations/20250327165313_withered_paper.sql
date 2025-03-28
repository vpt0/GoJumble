/*
  # Insert initial words for the game

  1. Changes
    - Insert sample words for each category and difficulty level
*/

-- Doctor words
INSERT INTO words (word, difficulty, category, hint) VALUES
  -- Easy words
  ('cast', 'easy', 'doctor', 'Used to support broken bones'),
  ('pill', 'easy', 'doctor', 'A small tablet of medicine'),
  ('heal', 'easy', 'doctor', 'Recovery from an injury'),
  ('bone', 'easy', 'doctor', 'Part of the skeleton'),
  
  -- Medium words
  ('clinic', 'medium', 'doctor', 'A small medical facility'),
  ('oxygen', 'medium', 'doctor', 'Essential for breathing'),
  ('remedy', 'medium', 'doctor', 'Treatment for an ailment'),
  
  -- Hard words
  ('diagnosis', 'hard', 'doctor', 'Process of identifying a disease'),
  ('pathology', 'hard', 'doctor', 'Study of diseases'),
  ('oncology', 'hard', 'doctor', 'Study of cancer');

-- Scientist words
INSERT INTO words (word, difficulty, category, hint) VALUES
  -- Easy words
  ('atom', 'easy', 'scientist', 'Basic unit of matter'),
  ('gene', 'easy', 'scientist', 'Carrier of genetic information'),
  ('cell', 'easy', 'scientist', 'Basic unit of life'),
  
  -- Medium words
  ('biology', 'medium', 'scientist', 'Study of life'),
  ('fusion', 'medium', 'scientist', 'Nuclear energy process'),
  ('quantum', 'medium', 'scientist', 'Physics at atomic scale'),
  
  -- Hard words
  ('hypothesis', 'hard', 'scientist', 'A proposed explanation'),
  ('radiation', 'hard', 'scientist', 'Emission of energy waves'),
  ('chemistry', 'hard', 'scientist', 'Study of matter and its changes');

-- Astronaut words
INSERT INTO words (word, difficulty, category, hint) VALUES
  -- Easy words
  ('star', 'easy', 'astronaut', 'A shining object in space'),
  ('moon', 'easy', 'astronaut', 'Earth''s natural satellite'),
  ('mars', 'easy', 'astronaut', 'The red planet'),
  
  -- Medium words
  ('galaxy', 'medium', 'astronaut', 'A system of stars'),
  ('rocket', 'medium', 'astronaut', 'A spacecraft carrier'),
  ('orbit', 'medium', 'astronaut', 'Path around a celestial body'),
  
  -- Hard words
  ('nebula', 'hard', 'astronaut', 'Cloud of gas and dust in space'),
  ('quasar', 'hard', 'astronaut', 'Very bright galactic nucleus'),
  ('cosmos', 'hard', 'astronaut', 'The universe as a whole');
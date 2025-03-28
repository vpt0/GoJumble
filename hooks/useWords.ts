import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export type WordDifficulty = 'easy' | 'medium' | 'hard';
export type WordTheme = 'doctor' | 'scientist' | 'astronaut';

interface Word {
  id: number;
  word: string;
  difficulty: WordDifficulty;
  category: WordTheme;
  hint: string;
}

export function useWords(difficulty: WordDifficulty, theme: WordTheme) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWords() {
      try {
        if (!difficulty || !theme) {
          console.error('Missing parameters:', { difficulty, theme });
          setError('Invalid difficulty or theme');
          setLoading(false);
          return;
        }

        const { data, error: supabaseError } = await supabase
          .from('words')
          .select('*')
          .eq('difficulty', difficulty)
          .eq('category', theme);

        if (supabaseError) {
          throw supabaseError;
        }

        if (!data || data.length === 0) {
          setError(`No words found for ${theme} theme at ${difficulty} difficulty`);
          setLoading(false);
          return;
        }

        // Shuffle the array using Fisher-Yates algorithm
        const shuffledWords = [...data];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }

        // Take the first 10 words
        const selectedWords = shuffledWords.slice(0, 10);
        setWords(selectedWords);
      } catch (err) {
        console.error('Error fetching words:', err);
        setError('Failed to fetch words. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchWords();
  }, [difficulty, theme]);

  return { words, loading, error };
}
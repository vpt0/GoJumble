import { View, Text, StyleSheet, Pressable, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Cloud, ArrowLeft, SkipForward, RotateCcw } from 'lucide-react-native';
import { useWords } from '../../hooks/useWords';

export default function GamePlay() {
  const { theme, difficulty } = useLocalSearchParams();
  const { words, loading, error } = useWords(
    difficulty as 'easy' | 'medium' | 'hard',
    theme as 'doctor' | 'scientist' | 'astronaut'
  );
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (words.length > 0) {
      setCurrentWord(words[currentWordIndex].word.toUpperCase());
    }
  }, [words, currentWordIndex]);

  useEffect(() => {
    if (currentWord) {
      const shuffled = shuffleWord(currentWord);
      setScrambledWord(shuffled);
      setSelectedLetters([]);
      setSelectedIndices([]);
      setShowHint(false);
      setAnswerStatus(null);
      startTimer();
    }
  }, [currentWord]);

  const shuffleWord = (word: string) => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  const startTimer = () => {
    if (gameComplete) return;
    progressAnim.setValue(1);
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 30000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !gameComplete) {
        handleTimeout();
      }
    });
  };

  const handleTimeout = () => {
    setAnswerStatus('incorrect');
    setTimeout(() => {
      handleNextWord();
    }, 1000);
  };

  const handleLetterPress = (letter: string, index: number) => {
    if (!selectedIndices.includes(index) && selectedLetters.length < currentWord.length) {
      setSelectedLetters(prev => [...prev, letter]);
      setSelectedIndices(prev => [...prev, index]);
      
      const newSelected = [...selectedLetters, letter];
      if (newSelected.length === currentWord.length) {
        const submittedWord = newSelected.join('');
        if (submittedWord === currentWord) {
          handleCorrectGuess();
        } else {
          handleIncorrectGuess();
        }
      }
    }
  };

  const handleUndoLetter = () => {
    if (selectedLetters.length > 0 && selectedIndices.length > 0) {
      setSelectedLetters(prev => prev.slice(0, -1));
      setSelectedIndices(prev => prev.slice(0, -1));
      setAnswerStatus(null); // Reset any previous answer status
    }
  };

  const handleCorrectGuess = () => {
    setAnswerStatus('correct');
    const timeBonus = Math.round(progressAnim._value * 100);
    const wordScore = 100 + timeBonus;
    setScore(prev => prev + wordScore);
    
    setTimeout(() => {
      handleNextWord();
    }, 1000);
  };

  const handleIncorrectGuess = () => {
    setAnswerStatus('incorrect');
    setTimeout(() => {
      setSelectedLetters([]);
      setSelectedIndices([]);
      setAnswerStatus(null);
    }, 1000);
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Word',
      'Are you sure you want to skip this word? You will lose 50 points.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            setScore(prev => Math.max(0, prev - 50));
            handleNextWord();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setGameComplete(true);
      router.push({
        pathname: '/(tabs)',
        params: { score, words: words.length }
      });
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setScore(prev => Math.max(0, prev - 50));
  };

  const handleBack = () => {
    Alert.alert(
      'Leave Game',
      'Are you sure you want to quit? Your progress will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Quit Game',
          style: 'destructive',
          onPress: () => router.replace('/(tabs)'),
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <LinearGradient colors={['#121726', '#232331']} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading words...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#121726', '#232331']} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.retryButtonText}>Back to Menu</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#121726', '#232331']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ArrowLeft color="#F2F2F7" size={24} />
        </Pressable>

        <View style={styles.header}>
          <Animated.View style={[styles.timerBar, { transform: [{ scaleX: progressAnim }] }]} />
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.progress}>Word {currentWordIndex + 1} of {words.length}</Text>
        </View>

        <View style={styles.wordContainer}>
          <Text style={styles.wordPrompt}>Unscramble the word:</Text>
          <View style={styles.letterGrid}>
            {scrambledWord.split('').map((letter, index) => (
              <Pressable
                key={`${letter}-${index}`}
                style={[
                  styles.letterButton,
                  selectedIndices.includes(index) && styles.letterButtonDisabled
                ]}
                onPress={() => handleLetterPress(letter, index)}
                disabled={selectedIndices.includes(index)}
              >
                <Text style={styles.letterText}>{letter}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.answerContainer}>
          <View style={styles.answerSlots}>
            {currentWord.split('').map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.answerSlot,
                  answerStatus === 'correct' && styles.answerSlotCorrect,
                  answerStatus === 'incorrect' && styles.answerSlotIncorrect
                ]}
              >
                <Text style={styles.answerText}>
                  {selectedLetters[index] || ''}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {showHint && (
          <Text style={styles.hintText}>
            Hint: {words[currentWordIndex].hint}
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <Pressable 
            style={[styles.actionButton, showHint && styles.actionButtonDisabled]} 
            onPress={handleHint}
            disabled={showHint}
          >
            <Cloud color="#F2F2F7" size={24} />
            <Text style={styles.actionButtonText}>Hint (-50)</Text>
          </Pressable>

          <Pressable 
            style={[styles.actionButton, styles.undoButton]} 
            onPress={handleUndoLetter}
            disabled={selectedLetters.length === 0}
          >
            <RotateCcw color="#F2F2F7" size={24} />
            <Text style={styles.actionButtonText}>Undo</Text>
          </Pressable>

          <Pressable 
            style={[styles.actionButton, styles.skipButton]} 
            onPress={handleSkip}
          >
            <SkipForward color="#F2F2F7" size={24} />
            <Text style={styles.actionButtonText}>Skip (-50)</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    marginBottom: 40,
    marginTop: 40,
  },
  timerBar: {
    height: 4,
    backgroundColor: '#8A6FDF',
    borderRadius: 2,
    marginBottom: 16,
  },
  score: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#F2F2F7',
    textAlign: 'center',
    marginBottom: 8,
  },
  progress: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#B8B8C7',
    textAlign: 'center',
  },
  wordContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  wordPrompt: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    color: '#B8B8C7',
    marginBottom: 20,
  },
  letterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  letterButton: {
    width: 60,
    height: 60,
    backgroundColor: '#8A6FDF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8A6FDF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  letterButtonDisabled: {
    backgroundColor: '#454545',
    shadowColor: '#454545',
  },
  letterText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
  },
  answerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  answerSlots: {
    flexDirection: 'row',
    gap: 12,
  },
  answerSlot: {
    width: 50,
    height: 50,
    backgroundColor: '#232331',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8A6FDF',
  },
  answerSlotCorrect: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  answerSlotIncorrect: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  answerText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232331',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  skipButton: {
    backgroundColor: '#5D9CEC',
  },
  undoButton: {
    backgroundColor: '#FF9F43',
  },
  actionButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#F2F2F7',
  },
  hintText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#F2F2F7',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    color: '#F2F2F7',
    textAlign: 'center',
  },
  errorText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#8A6FDF',
    padding: 16,
    borderRadius: 16,
    alignSelf: 'center',
  },
  retryButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#F2F2F7',
  },
});
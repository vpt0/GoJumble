import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const DIFFICULTIES = [
  {
    id: 'easy',
    name: 'Easy',
    description: '4-letter words',
    color: '#4ECDC4',
  },
  {
    id: 'medium',
    name: 'Medium',
    description: '6-letter words',
    color: '#FFD93D',
  },
  {
    id: 'hard',
    name: 'Hard',
    description: '8+ letter words',
    color: '#FF6B6B',
  },
];

export default function DifficultySelect() {
  const { theme } = useLocalSearchParams();

  const handleDifficultySelect = (difficultyId: string) => {
    router.push({
      pathname: '/(game)/play',
      params: { theme, difficulty: difficultyId },
    });
  };

  const handleBack = () => {
    Alert.alert(
      'Change Theme',
      'Are you sure you want to go back and select a different theme?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go Back',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient
      colors={['#121726', '#232331']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <ArrowLeft color="#F2F2F7" size={24} />
        </Pressable>

        <Text style={styles.title}>Select Difficulty</Text>
        <Text style={styles.subtitle}>Choose your challenge level</Text>

        <View style={styles.difficultiesContainer}>
          {DIFFICULTIES.map((difficulty) => (
            <Pressable
              key={difficulty.id}
              style={styles.difficultyCard}
              onPress={() => handleDifficultySelect(difficulty.id)}
            >
              <View style={[styles.difficultyContent, { backgroundColor: difficulty.color }]}>
                <Text style={styles.difficultyName}>{difficulty.name}</Text>
                <Text style={styles.difficultyDescription}>{difficulty.description}</Text>
              </View>
            </Pressable>
          ))}
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
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 32,
    color: '#F2F2F7',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#B8B8C7',
    marginBottom: 40,
    textAlign: 'center',
  },
  difficultiesContainer: {
    gap: 20,
  },
  difficultyCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  difficultyContent: {
    padding: 24,
    alignItems: 'center',
  },
  difficultyName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
    marginBottom: 8,
  },
  difficultyDescription: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#F2F2F7',
    opacity: 0.8,
  },
});
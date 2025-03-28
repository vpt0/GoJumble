import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { router } from 'expo-router';

export default function GameScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePlayPress = () => {
    router.push('/(game)/theme-select');
  };

  return (
    <LinearGradient
      colors={['#121726', '#232331']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Ready to Play?</Text>
        <Text style={styles.subtitle}>Start a new round of 10 words</Text>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable 
            style={styles.playButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePlayPress}
          >
            <Play color="#F2F2F7" size={32} />
            <Text style={styles.playButtonText}>Play Now</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Daily Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>2,450</Text>
            <Text style={styles.statLabel}>High Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Level</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 32,
    color: '#F2F2F7',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#B8B8C7',
    marginBottom: 40,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A6FDF',
    padding: 20,
    borderRadius: 20,
    gap: 12,
    marginBottom: 40,
    shadowColor: '#8A6FDF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#F2F2F7',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    backgroundColor: '#232331',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#B8B8C7',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#2A2A3C',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A6FDF',
    borderRadius: 2,
  },
});
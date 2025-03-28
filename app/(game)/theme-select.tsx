import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Stethoscope, FlaskRound as Flask, Rocket, ArrowLeft } from 'lucide-react-native';

const THEMES = [
  {
    id: 'doctor',
    name: 'Doctor Mode',
    description: 'Medical terms and anatomy',
    icon: Stethoscope,
    colors: ['#2193b0', '#6dd5ed'],
  },
  {
    id: 'scientist',
    name: 'Scientist Mode',
    description: 'Scientific terms and elements',
    icon: Flask,
    colors: ['#56ab2f', '#a8e063'],
  },
  {
    id: 'astronaut',
    name: 'Astronaut Mode',
    description: 'Space and astronomy terms',
    icon: Rocket,
    colors: ['#141e30', '#243b55'],
  },
];

export default function ThemeSelect() {
  const handleThemeSelect = (themeId: string) => {
    router.push({
      pathname: '/(game)/difficulty',
      params: { theme: themeId },
    });
  };

  const handleBack = () => {
    Alert.alert(
      'Leave Game',
      'Are you sure you want to go back to the main menu?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
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
        
        <Text style={styles.title}>Select Theme</Text>
        <Text style={styles.subtitle}>Choose your word category</Text>

        <View style={styles.themesContainer}>
          {THEMES.map((theme) => (
            <Pressable
              key={theme.id}
              style={styles.themeCard}
              onPress={() => handleThemeSelect(theme.id)}
            >
              <LinearGradient
                colors={theme.colors}
                style={styles.themeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <theme.icon color="#F2F2F7" size={32} />
                <Text style={styles.themeName}>{theme.name}</Text>
                <Text style={styles.themeDescription}>{theme.description}</Text>
              </LinearGradient>
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
  themesContainer: {
    gap: 20,
  },
  themeCard: {
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
  themeGradient: {
    padding: 24,
    alignItems: 'center',
  },
  themeName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
    marginTop: 16,
    marginBottom: 8,
  },
  themeDescription: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    color: '#F2F2F7',
    opacity: 0.8,
    textAlign: 'center',
  },
});
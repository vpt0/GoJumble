import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { LogIn, User, Chrome } from 'lucide-react-native';

export default function Login() {
  const handleGuestLogin = () => {
    router.replace('/(tabs)');
  };

  const handleEmailLogin = () => {
    router.replace('/(tabs)');
  };

  const handleGoogleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#121726', '#232331']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>GoJumble</Text>
        <Text style={styles.subtitle}>Unscramble your way to the top!</Text>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleGuestLogin}>
            <User color="#F2F2F7" size={24} />
            <Text style={styles.buttonText}>Continue as Guest</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleEmailLogin}>
            <LogIn color="#F2F2F7" size={24} />
            <Text style={styles.buttonText}>Login with Email</Text>
          </Pressable>

          <Pressable 
            style={[styles.button, styles.googleButton]} 
            onPress={handleGoogleLogin}
          >
            <Chrome color="#F2F2F7" size={24} />
            <Text style={styles.buttonText}>Continue with Google</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 48,
    color: '#F2F2F7',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    color: '#B8B8C7',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A6FDF',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#5D9CEC',
  },
  buttonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#F2F2F7',
  },
});
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={['#121726', '#232331']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Pressable style={styles.settingsButton}>
          <Settings color="#F2F2F7" size={24} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/030/694/478/large_2x/total-2d-cartoon-vector-illustration-on-white-background-h-free-photo.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>VED</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>15,230</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Streak Days</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>89%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        <Pressable style={styles.logoutButton}>
          <LogOut color="#F2F2F7" size={24} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#232331',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  username: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#232331',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
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
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A6FDF',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  logoutText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#F2F2F7',
  },
});
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LEADERBOARD_DATA = [
  {
    rank: 1,
    name: 'VED',
    score: 5000,
    avatar: 'https://static.vecteezy.com/system/resources/previews/030/694/478/large_2x/total-2d-cartoon-vector-illustration-on-white-background-h-free-photo.jpg'
  },
  {
    rank: 2,
    name: 'Raju',
    score: 4000,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop'
  },
  {
    rank: 3,
    name: 'Baburao',
    score: 3000,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
  },
  {
    rank: 4,
    name: 'Shyam',
    score: 2000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    rank: 5,
    name: 'Ibbu Hatella',
    score: 1000,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
  },
];

export default function LeaderboardScreen() {
  return (
    <LinearGradient
      colors={['#121726', '#232331']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>World Leaderboard</Text>
      </View>

      <ScrollView style={styles.leaderboard}>
        {LEADERBOARD_DATA.map((player) => (
          <View key={player.rank} style={styles.leaderboardItem}>
            <Text style={styles.rank}>#{player.rank}</Text>
            <Image source={{ uri: player.avatar }} style={styles.avatar} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerScore}>Score: {player.score}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#F2F2F7',
  },
  leaderboard: {
    flex: 1,
    padding: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232331',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  rank: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#F2F2F7',
    width: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#F2F2F7',
  },
  playerScore: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#B8B8C7',
  },
});
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Key, Crown, Palette } from 'lucide-react-native';

const SHOP_ITEMS = [
  {
    id: 'keys',
    title: 'Hint Keys',
    description: 'Get 5 hint keys',
    price: '0.99',
    icon: Key,
  },
  {
    id: 'premium',
    title: 'Premium Pack',
    description: 'Unlock all features',
    price: '4.99',
    icon: Crown,
  },
  {
    id: 'themes',
    title: 'Theme Pack',
    description: 'Unlock all themes',
    price: '2.99',
    icon: Palette,
  },
];

export default function ShopScreen() {
  return (
    <LinearGradient
      colors={['#121726', '#232331']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
      </View>

      <ScrollView style={styles.content}>
        {SHOP_ITEMS.map((item) => (
          <Pressable key={item.id} style={styles.itemCard}>
            <View style={styles.itemIcon}>
              <item.icon size={24} color="#F2F2F7" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Pressable style={styles.buyButton}>
              <Text style={styles.buyButtonText}>${item.price}</Text>
            </Pressable>
          </Pressable>
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
  content: {
    flex: 1,
    padding: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232331',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8A6FDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#F2F2F7',
  },
  itemDescription: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#B8B8C7',
  },
  buyButton: {
    backgroundColor: '#5D9CEC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  buyButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#F2F2F7',
  },
});
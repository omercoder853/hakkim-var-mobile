import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewCaseButton from './components/newCaseButton';

import { Colors } from '@/constants/theme';

export default function HomeLayout() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <SymbolView
              name={{ ios: 'checkmark.seal.fill', android: 'verified_user', web: 'verified_user' }}
              size={24}
              tintColor={Colors.background}
            />
          </View>
          <Text style={styles.brandName}>Hakkım Var</Text>
        </View>
        <Text style={styles.title}>Ana sayfa</Text>
        <Text style={styles.subtitle}>Tüketici haklarınız için ihtiyacınız olan her şey burada.</Text>
        <NewCaseButton onPress={() => router.push('/case-operations')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 44,
  },
  logo: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: Colors.active,
  },
  brandName: {
    color: Colors.active,
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    color: Colors.active,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.secondaryText,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    maxWidth: 360,
  },
});

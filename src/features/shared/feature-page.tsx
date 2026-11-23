import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

export function FeaturePage({ title }: { title: string }) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
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
    paddingTop: 28,
  },
  title: {
    color: Colors.active,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
});

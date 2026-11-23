import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

type ModuleCardProps = {
  title: string;
  description: string;
  icon: SymbolViewProps['name'];
  accent: string;
  tint: string;
};

export function ModuleCard({ title, description, icon, accent, tint }: ModuleCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: tint, borderColor: `${accent}26` }]}>
      <View style={[styles.iconBox, { backgroundColor: `${accent}1A` }]}>
        <SymbolView name={icon} size={23} tintColor={accent} />
      </View>
      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderWidth: 1,
    borderRadius: 18,
    shadowColor: Colors.active,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.045,
    shadowRadius: 8,
    elevation: 1,
  },
  iconBox: {
    width: 46,
    height: 46,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  textContent: {
    flex: 1,
    paddingTop: 1,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: Colors.secondaryText,
    fontSize: 14,
    lineHeight: 21,
  },
});

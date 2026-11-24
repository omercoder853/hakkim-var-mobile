
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native';

import { Colors } from '@/constants/colors';

interface NewCaseButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const NewCaseButton: React.FC<NewCaseButtonProps> = ({ onPress }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel="Yeni vaka oluştur"
    onPress={onPress}
    style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
    <View style={styles.iconContainer}>
      <Ionicons name="document-text-outline" size={27} color={Colors.active} />
      <View style={styles.plusIcon}>
        <Ionicons name="add" size={14} color={Colors.surface} />
      </View>
    </View>

    <View style={styles.content}>
      <Text style={styles.title}>Yeni Vaka Oluştur</Text>
      <Text style={styles.description}>
        Yeni bir vaka oluşturup sürecini başlat.
      </Text>
    </View>

    <View style={styles.arrowContainer}>
      <Ionicons name="chevron-forward" size={18} color={Colors.active} />
    </View>
  </Pressable>
);

export default NewCaseButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 28,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  iconContainer: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: Colors.softSurface,
  },
  plusIcon: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.active,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
  },
  description: {
    color: Colors.secondaryText,
    fontSize: 13,
    lineHeight: 18,
  },
  arrowContainer: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: Colors.softSurface,
  },
});

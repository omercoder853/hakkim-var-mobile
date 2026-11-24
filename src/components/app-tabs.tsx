import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

type TabName = 'home' | 'barcode' | 'applications' | 'profile';
type TabItem = {
  name: TabName;
  href:
    | '/(tabs)'
    | '/(tabs)/barcode'
    | '/(tabs)/applications'
    | '/(tabs)/profile';
  label: string;
  icon: SymbolViewProps['name'];
};

const tabItems: TabItem[] = [
  {
    name: 'home',
    href: '/(tabs)',
    label: 'Ana Sayfa',
    icon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  {
    name: 'barcode',
    href: '/(tabs)/barcode',
    label: 'Barkod',
    icon: {
      ios: 'barcode',
      android: 'barcode',
      web: 'barcode',
    },
  },
  {
    name: 'applications',
    href: '/(tabs)/applications',
    label: 'Vakalarım',
    icon: { ios: 'folder', android: 'folder_open', web: 'folder_open' },
  },
  {
    name: 'profile',
    href: '/(tabs)/profile',
    label: 'Profil',
    icon: { ios: 'person.crop.circle.fill', android: 'person', web: 'person' },
  },
];

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs style={styles.tabs}>
      <TabSlot style={styles.tabSlot} />
      <TabList asChild>
        <View
          style={StyleSheet.flatten([
            styles.tabList,
            { paddingBottom: Math.max(insets.bottom, 8) },
          ])}>
          {tabItems.map((item) => (
            <TabTrigger key={item.name} name={item.name} href={item.href} asChild>
              <TabButton label={item.label} icon={item.icon} />
            </TabTrigger>
          ))}
        </View>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  ref: triggerRef,
  label,
  icon,
  isFocused,
  ...props
}: TabTriggerSlotProps & {
  label: string;
  icon: SymbolViewProps['name'];
}) {
  void triggerRef;
  const color = isFocused ? Colors.active : Colors.inactive;

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <SymbolView name={icon} size={22} tintColor={color} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabSlot: {
    flex: 1,
  },
  tabList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.background,
    borderTopColor: Colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 9,
  },
  tabButton: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.65,
  },
});

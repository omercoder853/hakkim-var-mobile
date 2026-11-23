import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

type TabName = 'home' | 'modules' | 'applications' | 'profile';
type TabItem = {
  name: TabName;
  href: '/' | '/modules' | '/applications' | '/profile';
  label: string;
  icon: SymbolViewProps['name'];
};

const tabItems: TabItem[] = [
  {
    name: 'home',
    href: '/',
    label: 'Ana sayfa',
    icon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  {
    name: 'modules',
    href: '/modules',
    label: 'Modüller',
    icon: { ios: 'square.grid.2x2.fill', android: 'grid_view', web: 'grid_view' },
  },
  {
    name: 'applications',
    href: '/applications',
    label: 'Başvurular',
    icon: { ios: 'doc.text.fill', android: 'description', web: 'description' },
  },
  {
    name: 'profile',
    href: '/profile',
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
    backgroundColor: Colors.tabBackground,
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

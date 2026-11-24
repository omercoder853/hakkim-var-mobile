import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ColorValue,
} from 'react-native';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';
import { useFeedback, type ToastType } from '@/contextapis/FeedbackContext';

type ToastTheme = {
  iconName: SymbolViewProps['name'];
  accent: ColorValue;
};

const TOAST_THEMES: Record<ToastType, ToastTheme> = {
  default: {
    iconName: { ios: 'info.circle.fill', android: 'info', web: 'info' },
    accent: Colors.toastDefault,
  },
  success: {
    iconName: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
    accent: Colors.success,
  },
  warning: {
    iconName: { ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' },
    accent: Colors.toastWarning,
  },
  danger: {
    iconName: { ios: 'exclamationmark.circle.fill', android: 'error', web: 'error' },
    accent: Colors.danger,
  },
};

const TOAST_ICONS: Record<string, SymbolViewProps['name']> = {
  wifi: { ios: 'wifi', android: 'wifi', web: 'wifi' },
  info: { ios: 'info.circle.fill', android: 'info', web: 'info' },
  success: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  warning: { ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' },
  error: { ios: 'exclamationmark.circle.fill', android: 'error', web: 'error' },
};

const CLOSE_ICON: SymbolViewProps['name'] = {
  ios: 'xmark',
  android: 'close',
  web: 'close',
};

export default function CustomToast() {
  const { toastVisible, toastTitle, toastMessage, toastType, toastIcon, hideToast } = useFeedback();
  const insets = useSafeAreaInsets();
  const [translateY] = useState(() => new Animated.Value(-120));
  const [opacity] = useState(() => new Animated.Value(0));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    translateY.stopAnimation();
    opacity.stopAnimation();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        hideToast();
      }
    });
  }, [hideToast, opacity, translateY]);

  useEffect(() => {
    if (toastVisible) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      translateY.stopAnimation();
      opacity.stopAnimation();
      translateY.setValue(-120);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 5,
          speed: 12,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();

      timerRef.current = setTimeout(dismiss, 4000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [dismiss, opacity, toastIcon, toastMessage, toastTitle, toastType, toastVisible, translateY]);

  if (!toastVisible) {
    return null;
  }

  const theme = TOAST_THEMES[toastType];
  const iconName = toastIcon ? TOAST_ICONS[toastIcon] ?? theme.iconName : theme.iconName;
  const topInset = Math.max(insets.top, 16);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.container,
        {
          top: topInset + 8,
          transform: [{ translateY }],
          opacity,
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Bildirimi kapat"
        onPress={dismiss}
        style={({ pressed }) => [
          styles.toastCard,
          { borderColor: Colors.border },
          pressed && styles.pressed,
        ]}>
        <View style={[styles.leftAccentBar, { backgroundColor: theme.accent }]} />
        <View
          style={[
            styles.iconBadge,
            {
              backgroundColor: Colors.softSurface,
              borderColor: Colors.border,
            },
          ]}>
          <SymbolView name={iconName} size={22} tintColor={theme.accent} />
        </View>
        <View style={styles.contentContainer}>
          {!!toastTitle && (
            <Text style={styles.title} numberOfLines={1}>
              {toastTitle}
            </Text>
          )}
          {!!toastMessage && (
            <Text style={styles.message} numberOfLines={2}>
              {toastMessage}
            </Text>
          )}
        </View>
        <View style={styles.closeButton}>
          <SymbolView name={CLOSE_ICON} size={14} tintColor={Colors.secondaryText} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  toastCard: {
    width: '100%',
    maxWidth: 420,
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.background,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
  leftAccentBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 5,
  },
  iconBadge: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    marginBottom: 2,
    color: Colors.text,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  message: {
    color: Colors.secondaryText,
    fontSize: 13,
    lineHeight: 18,
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    borderRadius: 15,
    backgroundColor: Colors.softSurface,
  },
  pressed: {
    opacity: 0.9,
  },
});

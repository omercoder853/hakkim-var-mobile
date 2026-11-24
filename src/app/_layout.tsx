import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';

import { FeedbackProvider } from '@/contextapis/FeedbackContext';
import CustomAlert from '@/shared/components/CustomAlert';
import CustomToast from '@/shared/components/CustomToast';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <FeedbackProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="case-operations" />
        </Stack>
        <CustomAlert />
        <CustomToast />
      </FeedbackProvider>
    </ThemeProvider>
  );
}

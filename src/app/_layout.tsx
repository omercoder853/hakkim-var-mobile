import { DefaultTheme, ThemeProvider } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { FeedbackProvider } from '@/contextapis/FeedbackContext';
import CustomAlert from '@/shared/components/CustomAlert';
import CustomToast from '@/shared/components/CustomToast';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <FeedbackProvider>
        <AppTabs />
        <CustomAlert />
        <CustomToast />
      </FeedbackProvider>
    </ThemeProvider>
  );
}

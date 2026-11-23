import { DefaultTheme, ThemeProvider } from 'expo-router';

import AppTabs from '@/components/app-tabs';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}

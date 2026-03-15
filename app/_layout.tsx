import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/index.js';
import { LibraryProvider } from '../context/LibraryContext';

export default function RootLayout() {
  return (
    <LibraryProvider>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LibraryProvider>
  );
}
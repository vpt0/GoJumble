import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="theme-select" />
      <Stack.Screen name="difficulty" />
      <Stack.Screen name="play" />
    </Stack>
  );
}
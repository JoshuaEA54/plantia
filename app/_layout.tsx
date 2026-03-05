import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ title: "Principal", headerShown: false }} />; // Hace un stack de navegación, como una pila de pantallas
}

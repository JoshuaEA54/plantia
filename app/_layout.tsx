import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ title: "Principal" }} />;// Hace un stack de navegación, como una pila de pantallas
}

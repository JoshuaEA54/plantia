import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import { AuthProvider, useAuthContext } from "@/src/context/AuthContext";
import AnimatedSplash from "@/src/components/common/AnimatedSplash";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { userId, isLoading } = useAuthContext();
  const [showSplash, setShowSplash] = useState(true);

  // Ocultar splash nativa en cuanto el JS carga — el componente React toma el relevo
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (showSplash) {
    return (
      <AnimatedSplash
        isReady={!isLoading}
        onComplete={() => setShowSplash(false)}
      />
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={!!userId}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ title: 'Editar Perfil' }} />
        <Stack.Screen name="editPlant" options={{ presentation: 'modal', title: 'Editar Planta' }} />
      </Stack.Protected>

      <Stack.Protected guard={!userId}>
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

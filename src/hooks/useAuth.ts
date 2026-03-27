import { useState } from "react";
import { useRouter } from "expo-router";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useAuthContext } from "@/src/context/AuthContext";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000";

GoogleSignin.configure({
  scopes: ["profile", "email"],
  webClientId: "716068876990-v61vffcosd27itak3jbasvgfuo5ef04i.apps.googleusercontent.com",
});

export function useAuth() {
  const { setUserId } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const authGoogle = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const user = response.data?.user;
      if (!user) throw new Error("No se obtuvo información del usuario");

      const res = await fetch(`${BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleId: user.id,
          email: user.email,
          fullName: user.name ?? user.givenName ?? "",
          photoURL: user.photo ?? "",
        }),
      });

      if (!res.ok) throw new Error("Error al registrar con el servidor");

      const data = await res.json();
      setUserId(data.userId);
      router.replace("/(tabs)");
    } catch (e: unknown) {
      if (e instanceof Error && "code" in e) {
        const code = (e as { code: string }).code;
        if (code === statusCodes.SIGN_IN_CANCELLED) return;
        if (code === statusCodes.IN_PROGRESS) return;
      }
      console.error("Error en Google auth:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return { authGoogle, isLoading };
}

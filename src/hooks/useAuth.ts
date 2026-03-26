import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";

export function useAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      "716068876990-j86pd7et8jskd7tldpmd2tfkqs3v8g0o.apps.googleusercontent.com",
    iosClientId: "",
  });

  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        console.log(response.authentication);
      } else {
        console.log("Error al autenticar con google");
      }
    }
  }, [response]);

  const authGoogle = () => {
    promptAsync().catch((e) => {
      console.error("Error al iniciar la sesión : ", e);
    });
  };

  return { authGoogle };
}

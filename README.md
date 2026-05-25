# Plantia

Diario botánico personal. App móvil en React Native (Expo) con backend FastAPI + Firebase/Firestore.

## Requisitos

- Node.js 18+, Python 3.11+
- Android Studio (emulador o dispositivo físico)
- JDK 21 (usar el de Android Studio: `C:/Program Files/Android/Android Studio/jbr`)

## Setup

```bash
npm install
```

Crear `.env` en la raíz:

```env
EXPO_PUBLIC_API_URL=
```

| Escenario | Valor de `EXPO_PUBLIC_API_URL` |
|-----------|--------------------------------|
| Emulador + backend local | `http://10.0.2.2:8000` |
| Físico + backend local (USB) | `http://localhost:8000` + `adb reverse tcp:8000 tcp:8000` |
| Backend en nube (Render) | URL HTTPS del deploy |

**Credenciales** (no están en el repo):

- **`google-services.json`** → raíz. Firebase → proyecto **plantia-e7669** → app Android `com.plantia.app`. Registrar SHA-1 del debug keystore (`keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android`) y descargar el archivo.
- **`serviceAccountKey.json`** → `backend/`. Firebase → Service Accounts → Generate new private key.

## Post-prebuild

Reaplicar tras cada `npx expo prebuild`:

```powershell
Copy-Item google-services.json android/app/google-services.json -Force
Copy-Item "$env:USERPROFILE\.android\debug.keystore" android/app/debug.keystore -Force
```

En `android/gradle.properties`:

```properties
newArchEnabled=true
org.gradle.java.home=C:/Program Files/Android/Android Studio/jbr
```

## Desarrollo

**Reglas:**

- No Expo Go — usar la app instalada `com.plantia.app` (Google Sign-In es nativo).
- Build nativo **una vez**; día a día solo `npx expo start` + Fast Refresh.
- Rebuild si: nueva dependencia nativa, cambios en `app.json`, o `expo prebuild`.

| Cuándo | Comando |
|--------|---------|
| Primera vez / cambio nativo | `npx expo prebuild --platform android` → checklist post-prebuild → `npx expo run:android` |
| Día a día (JS/TS) | `npx expo start` → abrir app instalada |
| Backend local | `uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000` |

| | Metro `:8081` | API |
|--|---------------|-----|
| Debug | PC encendida + misma red; el JS no va en el APK | `.env` (local o Render) |
| Emulador | `$env:REACT_NATIVE_PACKAGER_HOSTNAME="10.0.2.2"` antes de `expo run:android` | `10.0.2.2:8000` si backend local |
| Físico | `npx expo start --lan`; IP de la PC, no `10.0.2.2` | Render no necesita PC; USB opcional |

- Cambio de `.env` → `npx expo start -c`
- App sin PC (producción) → build release/preview (EAS), no flujo debug

## Problemas frecuentes

| Síntoma | Solución |
|---------|----------|
| `Cannot connect to Metro` + IP WiFi en emulador | `$env:REACT_NATIVE_PACKAGER_HOSTNAME="10.0.2.2"` + `npx expo run:android` |
| Metro en emulador, puerto 8081 | `adb reverse tcp:8081 tcp:8081` |
| `host.exp.exponent` en logs | Cerrar Expo Go; usar `com.plantia.app` |
| Google Sign-In `DEVELOPER_ERROR` | Revisar checklist post-prebuild |
| Pantalla negra con Metro OK | Nuevo AVD en Android Studio |
| Backend local en físico vía USB | `adb reverse tcp:8000 tcp:8000` + `EXPO_PUBLIC_API_URL=http://localhost:8000` |

Si `adb` no se reconoce, agregar `Android/Sdk/platform-tools` al PATH.

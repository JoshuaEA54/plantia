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

Crear `.env` en la raíz con `EXPO_PUBLIC_API_URL` (valores en [Desarrollo → API](#api)).

```env
EXPO_PUBLIC_API_URL=
```

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

Plantia **no usa Expo Go**. Google Sign-In es nativo: hace falta la app `com.plantia.app` compilada e instalada en el dispositivo.

### Flujo habitual (teléfono por USB)

Cable USB + depuración USB activa. De momento este es el único flujo probado en físico.

```powershell
adb reverse tcp:8081 tcp:8081   # solo si Metro no conecta
npx expo run:android
```

`run:android` compila, instala, abre la app y arranca Metro. Repetirlo al empezar cada sesión. Fast Refresh funciona mientras Metro sigue corriendo.

**Rebuild completo** (`npx expo prebuild --platform android` → checklist post-prebuild → `run:android`) solo si hay dependencia nativa nueva, cambios en `app.json` o `expo prebuild`.

### API

La URL va en `EXPO_PUBLIC_API_URL`. El cable **no** es para llegar a Render: el teléfono usa internet directo.

| Backend | `EXPO_PUBLIC_API_URL` | Extra |
|---------|----------------------|-------|
| Render | URL HTTPS del deploy | Nada más |
| Local + teléfono USB | `http://localhost:8000` | `adb reverse tcp:8000 tcp:8000` + backend corriendo |
| Local + emulador | `http://10.0.2.2:8000` | Backend en la PC |

Backend local:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Cambio de `.env` → volver a ejecutar `npx expo run:android` (con `--clear` si hace falta).

### Emulador (alternativa)

Antes de `run:android`:

```powershell
$env:REACT_NATIVE_PACKAGER_HOSTNAME="10.0.2.2"
```

Si Metro no conecta: `adb reverse tcp:8081 tcp:8081`.

### Producción

Build release/preview con EAS. El JS va embebido; no depende de Metro ni de la PC.

## Problemas frecuentes

| Síntoma | Solución |
|---------|----------|
| `Cannot connect to Metro` en emulador | `$env:REACT_NATIVE_PACKAGER_HOSTNAME="10.0.2.2"` + `npx expo run:android` |
| `Cannot connect to Metro` en físico | USB conectado + `adb reverse tcp:8081 tcp:8081` |
| `host.exp.exponent` en logs | Cerrar Expo Go; usar `com.plantia.app` |
| Google Sign-In `DEVELOPER_ERROR` | Revisar checklist post-prebuild |
| Pantalla negra con Metro OK | Nuevo AVD en Android Studio |
| Backend local no responde en físico | `adb reverse tcp:8000 tcp:8000` + `EXPO_PUBLIC_API_URL=http://localhost:8000` |

Si `adb` no se reconoce, agregar `Android/Sdk/platform-tools` al PATH.

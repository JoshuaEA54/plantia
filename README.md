# Plantia

Diario botánico personal. App móvil en React Native (Expo) con backend FastAPI + Firebase/Firestore.

---

## Requisitos previos

- Node.js 18+
- Python 3.11+
- Android Studio (emulador o dispositivo físico)
- Java 17+ (ver nota sobre JDK más abajo)

---

## Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Crear un archivo `.env` en la raíz con:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000
```

> `10.0.2.2` es el localhost del emulador Android. Para dispositivo físico usá la IP local de tu máquina.

### 3. Archivos de credenciales (no están en el repo)

#### `google-services.json` (Android)

Necesario para Google Sign-In. Para obtenerlo:

1. Ir a [Firebase Console](https://console.firebase.google.com) → proyecto **plantia-e7669**
2. Project Settings → General → app Android (`com.plantia.app`)
3. Agregar el SHA-1 de tu keystore de debug:
   ```bash
   keytool -list -v -keystore "C:Users<TU_USUARIO>.androiddebug.keystore" -alias androiddebugkey -storepass android -keypass android
   ```
4. Descargar `google-services.json` y colocarlo en la raíz del proyecto (junto a `app.json`)

#### `serviceAccountKey.json` (Backend)

Necesario para el backend FastAPI. Obtenerlo desde Firebase Console → Project Settings → Service Accounts → Generate new private key. Colocarlo en `backend/`.

### 4. Ajustes post-prebuild (reaplicar cada vez que se corra `expo prebuild`)

#### a) Copiar `google-services.json` al directorio Android

```bash
cp google-services.json android/app/google-services.json
```

> Expo no lo copia automáticamente. Sin esto, Google Sign-In falla con `DEVELOPER_ERROR`.

#### b) Reemplazar el debug keystore

Expo genera un `debug.keystore` propio en `android/app/`, pero el SHA-1 registrado en Firebase es el del keystore estándar de Android (`~/.android/debug.keystore`). Hay que reemplazarlo:

```bash
cp "$HOME/.android/debug.keystore" android/app/debug.keystore
```

> Sin esto, Google Sign-In falla con `DEVELOPER_ERROR` aunque todo lo demás esté bien configurado.

#### c) Activar Nueva Arquitectura en `android/gradle.properties`

El prebuild genera este campo en `false`. Cambiarlo a `true`:

```properties
newArchEnabled=true
```

> Sin esto el build puede fallar o la app no abre. React Native 0.71+ y las librerías modernas asumen la nueva arquitectura (Fabric + TurboModules).

#### d) Forzar JDK 21 en `android/gradle.properties`

Agregar esta línea al archivo `android/gradle.properties`:

```properties
org.gradle.java.home=C:/Program Files/Android/Android Studio/jbr
```

> El sistema tiene Java 24 instalado, que rompe las tareas CMake de Prefab (expo-modules-core, react-native-screens, react-native-worklets). El JDK 21 embebido de Android Studio no tiene este problema.

---

## Correr en desarrollo

### Backend

```bash
cd plantia
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### App (primera vez o tras instalar paquetes nativos)

```bash
npx expo prebuild --platform android
npx expo run:android
```

### App (sin cambios nativos)

```bash
npx expo start
```

---

## Solución de problemas

### Pantalla negra en el emulador Android

#### Causa A — Metro usa IP de WiFi en lugar de `10.0.2.2`

Expo a veces detecta la IP de WiFi como hostname y la embebe en el bundle. El emulador no puede llegar a esa IP desde su red virtual. Se puede confirmar en los logs:

```
W ReactNativeJS: Cannot connect to Metro.
W ReactNativeJS: URL: 192.168.x.x:8081
```

**Solución:** forzar el hostname antes de construir:

```powershell
$env:REACT_NATIVE_PACKAGER_HOSTNAME="10.0.2.2"
npx expo run:android
```

`10.0.2.2` es la dirección especial que el emulador Android usa para referirse al localhost de la PC. No requiere `adb reverse`.

#### Causa B — Metro usa `10.0.2.2` pero el puerto no está redirigido

```
W ReactNativeJS: Cannot connect to Metro.
W ReactNativeJS: URL: 10.0.2.2:8081
```

**Solución:** ejecutar en PowerShell **cada vez que reinicies el emulador**, antes de abrir la app:

```powershell
adb reverse tcp:8081 tcp:8081
```

Luego presiona `R` en la terminal de Metro para recargar.

> **Nota:** si en los logs aparece `host.exp.exponent` con errores de módulos nativos, significa que Expo Go está abierto en el emulador. Cerrarlo — la app real es `com.plantia.app`.

#### Causa C — Emulador en estado corrupto (solución definitiva)

Si Metro conecta, el bundle carga y el menú de developer responde (`m` en Metro abre el menú), pero la pantalla sigue negra sin importar qué se haga — el emulador puede estar en un estado corrupto por múltiples ciclos de install/reinstall.

**Solución:** crear un nuevo dispositivo virtual en Android Studio:

Android Studio → **Device Manager** → **Create Virtual Device** → seleccionar modelo → Next → Finish.

El emulador nuevo arranca limpio, en modo claro (sin dark theme), sin apps instaladas.

> **¿Qué es ADB?** Android Debug Bridge — herramienta del SDK de Android que actúa como puente entre tu PC y el emulador/dispositivo. `adb reverse` redirige un puerto del emulador hacia tu PC.

Si `adb` no se reconoce, agrégalo al PATH permanente ejecutando esto **una sola vez** y reabriendo PowerShell:

```powershell
[System.Environment]::SetEnvironmentVariable(
  "PATH",
  [System.Environment]::GetEnvironmentVariable("PATH", "User") + ";C:\Users\Usuario\AppData\Local\Android\Sdk\platform-tools",
  "User"
)
```

### Reenvío de puertos para dispositivo físico

Con el celular conectado por USB y depuración USB activada:

```powershell
adb reverse tcp:8000 tcp:8000
```

Esto hace que `localhost:8000` en el celular apunte al backend de la PC. El `.env` debe tener:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

> Se pierde al desconectar el USB — hay que correrlo de nuevo cada vez.

---

## Autenticación Google

La app usa `@react-native-google-signin/google-signin`. El flujo es:

1. Usuario presiona "Continuar con Google"
2. Se abre el selector de cuenta de Google (nativo)
3. Se envía `{ googleId, email, fullName, photoURL }` al backend (`POST /api/auth/google`)
4. El backend busca o crea el usuario en Firestore y retorna el `userId`
5. El `userId` se guarda en `AuthContext` y se usa en todo el app

> Requiere `google-services.json` y un build nativo (`expo run:android`). No funciona con Expo Go.

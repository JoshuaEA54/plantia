# Plantia

Diario botánico personal. App móvil en React Native (Expo) con backend FastAPI + Firebase/Firestore.

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

#### b) Forzar JDK 21 en `android/gradle.properties`

Agregar esta línea al archivo `android/gradle.properties`:

```properties
org.gradle.java.home=C:/Program Files/Android/Android Studio/jbr
```

> El sistema tiene Java 24 instalado, que rompe las tareas CMake de Prefab (expo-modules-core, react-native-screens, react-native-worklets). El JDK 21 embebido de Android Studio no tiene este problema.

### 5. Correr el backend

```bash
cd plantia
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Correr la app (primera vez o tras instalar paquetes nativos)

```bash
npx expo prebuild --platform android
npx expo run:android
```

### 6. Correr la app (después, sin cambios nativos)

```bash
npx expo start
```

## Autenticación Google

La app usa `@react-native-google-signin/google-signin`. El flujo es:

1. Usuario presiona "Continuar con Google"
2. Se abre el selector de cuenta de Google (nativo)
3. Se envía `{ googleId, email, fullName, photoURL }` al backend (`POST /api/auth/google`)
4. El backend busca o crea el usuario en Firestore y retorna el `userId`
5. El `userId` se guarda en `AuthContext` y se usa en todo el app

> Requiere `google-services.json` y un build nativo (`expo run:android`). No funciona con Expo Go.

# Plantia — Backend API

API REST construida con FastAPI que expone los datos de Firestore para la app móvil de Plantia.

## Estructura

```
backend/
├── main.py            # Punto de entrada de FastAPI
└── app/
    ├── config.py      # Variables de entorno
    ├── firebase.py    # Inicialización de Firebase Admin
    ├── services.py    # Acceso genérico a Firestore
    ├── models.py      # Modelos Pydantic (herencia de FirestoreBaseModel)
    └── routes.py      # Endpoints REST
```

## Variables de entorno

Copia `.env.example` a `.env` dentro de `backend/` y ajusta:

```env
API_HOST=127.0.0.1
API_PORT=8000
API_ENV=development
FIREBASE_SERVICE_ACCOUNT_PATH=../src/data/migracionFirebase/serviceAccountKey.json
CORS_ORIGINS=http://localhost:8081,http://localhost:19006
```

## Instalación

El proyecto usa el `.venv` ubicado en la raíz de `plantia/`. Desde ahí:

```powershell
pip install -r requirements.txt
```

## Ejecutar

Todos los comandos se corren desde la raíz de `plantia/`.

### Desarrollo

```powershell
 uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Docs: `http://127.0.0.1:8000/docs`

### Dispositivo físico / emulador en red

Para que el celular pueda conectarse, el servidor debe escuchar en todas las interfaces (`0.0.0.0`):

```powershell
.venv\Scripts\uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Luego en el frontend (`plantia/.env`) apunta a la IP local de la máquina:

```env
EXPO_PUBLIC_API_URL=http://<IP-de-la-máquina>:8000
```

> Para saber la IP: `ipconfig` en Windows → "Dirección IPv4" de la red WiFi activa.

Docs: `http://<IP-de-la-máquina>:8000/docs`

> **Nota de seguridad:** `0.0.0.0` expone la API a toda la red local. Usar solo en desarrollo.

## Endpoints

### General
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Estado del servidor |

### Usuarios
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/users/{userId}` | Datos del usuario |
| GET | `/api/users/{userId}/profile` | Perfil completo (usuario + categorías + planta favorita) |
| GET | `/api/users/{userId}/plants` | Plantas del usuario (`user_plants`) |
| GET | `/api/users/{userId}/achievements` | Logros del usuario |
| GET | `/api/users/{userId}/calendar` | Entradas del calendario |
| GET | `/api/users/{userId}/reminders` | Recordatorios activos |
| GET | `/api/users/{userId}/likes` | Plantas que el usuario marcó como favoritas |

### Plantas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/plants/{plantId}` | Detalle de una planta del catálogo global |
| GET | `/api/categories` | Catálogo global de categorías |
| GET | `/api/plant-of-day` | Planta(s) del día |

### Logros
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/achievements` | Catálogo global de logros |

### Exploración
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/explore/filters` | Filtros de la pantalla de exploración |
| GET | `/api/explore/featured` | Plantas destacadas (ordenadas por `weeklyRank`) |

### Debug / Admin
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/collections/{collectionName}` | Lee cualquier colección de Firestore directamente |

> **Nota:** el endpoint `/api/collections/{collectionName}` es útil durante el desarrollo; conviene restringirlo o eliminarlo antes de exponer la API en producción.

## Modelos

Todos los modelos de dominio heredan de `FirestoreBaseModel` que provee:
- `id: str` — ID del documento en Firestore
- `createdAt: str | None` — timestamp de creación (opcional)
- `updatedAt: str | None` — timestamp de última actualización (opcional)

Los envelopes de respuesta (`UserProfileResponse`, `PlantDetailResponse`, `ApiCollectionResponse`) heredan directamente de `BaseModel` de Pydantic.

## Notas

- Usa Firebase Admin SDK, por lo que consulta Firestore del lado servidor.
- Si la service account no tiene permisos, la API devolverá errores al consultar Firestore.
- Las colecciones de Firestore esperadas son: `users`, `plants`, `user_plants`, `categories`, `plant_of_day`, `achievements`, `user_achievements`, `calendar_entries`, `reminders`, `explore_filters`, `explore_featured`, `plant_likes`.

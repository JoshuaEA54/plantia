from functools import lru_cache

import firebase_admin
from firebase_admin import credentials, firestore

from .config import get_settings


@lru_cache(maxsize=1)
def get_firestore_client() -> firestore.Client:
    settings = get_settings()

    if not settings.firebase_service_account_path.exists():
        raise FileNotFoundError(
            "No se encontro el archivo de credenciales de Firebase en "
            f"{settings.firebase_service_account_path}"
        )

    try:
        app = firebase_admin.get_app()
    except ValueError:
        credential = credentials.Certificate(
            str(settings.firebase_service_account_path)
        )
        try:
            app = firebase_admin.initialize_app(credential)
        except ValueError:
            app = firebase_admin.get_app()

    return firestore.client(app=app)

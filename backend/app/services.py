from typing import Any

import httpx
from fastapi import HTTPException
from google.cloud.firestore_v1.base_query import FieldFilter

from .config import get_settings
from .firebase import get_firestore_client


def _serialize_value(value: Any) -> Any:
    if hasattr(value, "isoformat"):
        return value.isoformat()

    if isinstance(value, list):
        return [_serialize_value(item) for item in value]

    if isinstance(value, dict):
        return {
            nested_key: _serialize_value(nested_value)
            for nested_key, nested_value in value.items()
        }

    return value


def _serialize_document(document) -> dict[str, Any]:
    payload = {
        key: _serialize_value(value) for key, value in document.to_dict().items()
    }
    payload["id"] = document.id
    return payload


def get_document(collection_name: str, document_id: str) -> dict[str, Any]:
    db = get_firestore_client()
    snapshot = db.collection(collection_name).document(document_id).get()

    if not snapshot.exists:
        raise HTTPException(
            status_code=404,
            detail=f"No se encontro el documento '{document_id}' en '{collection_name}'.",
        )

    return _serialize_document(snapshot)


def get_collection(
    collection_name: str,
    *,
    filters: list[tuple[str, str, Any]] | None = None,
    order_by: str | None = None,
) -> list[dict[str, Any]]:
    db = get_firestore_client()
    query = db.collection(collection_name)

    for field_name, operator, value in filters or []:
        query = query.where(filter=FieldFilter(field_name, operator, value))

    if order_by:
        query = query.order_by(order_by)

    return [_serialize_document(document) for document in query.stream()]


def update_document(collection_name: str, document_id: str, data: dict) -> dict[str, Any]:
    db = get_firestore_client()
    ref = db.collection(collection_name).document(document_id)
    if not ref.get().exists:
        raise HTTPException(
            status_code=404,
            detail=f"No se encontró el documento '{document_id}' en '{collection_name}'.",
        )
    ref.update(data)
    return _serialize_document(ref.get())


async def identify_plant_from_image(image_bytes: bytes, filename: str) -> dict:
    settings = get_settings()
    if not settings.plantnet_api_key:
        raise HTTPException(status_code=503, detail="Servicio de identificación no configurado")

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(
                settings.plantnet_url,
                params={
                    "api-key": settings.plantnet_api_key,
                    "lang": "es",
                    "nb-results": 5,
                    "include-related-images": "true",
                },
                files={"images": (filename, image_bytes, "image/jpeg")},
            )
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Error al identificar la planta")
        except httpx.RequestError:
            raise HTTPException(status_code=502, detail="No se pudo conectar con el servicio de identificación")

    raw = response.json()
    results = []
    for item in raw.get("results", []):
        species = item.get("species", {})
        common_names: list[str] = species.get("commonNames", [])
        similar_images: list[dict] = item.get("images", [])
        image_url = similar_images[0].get("url", {}).get("m") if similar_images else None
        results.append({
            "scientificName": species.get("scientificNameWithoutAuthor", ""),
            "commonName": common_names[0] if common_names else None,
            "confidence": round(item.get("score", 0) * 100),
            "family": species.get("family", {}).get("scientificNameWithoutAuthor"),
            "imageUrl": image_url,
        })

    best_match: str = raw.get("bestMatch", results[0]["scientificName"] if results else "")
    return {"bestMatch": best_match, "results": results}


def save_identified_plant(user_id: str, scientific_name: str, common_name: str | None, family: str | None, image_url: str | None) -> dict:
    from datetime import datetime, timezone

    db = get_firestore_client()
    now = datetime.now(timezone.utc).isoformat()

    plants_ref = db.collection("plants")
    existing = list(
        plants_ref.where(filter=FieldFilter("name", "==", scientific_name)).limit(1).stream()
    )

    if existing:
        plant_id = existing[0].id
    else:
        _, new_plant = plants_ref.add({
            "name": scientific_name,
            "family": family or "",
            "habitat": "",
            "categoryId": "",
            "imageUrl": image_url or "",
            "description": common_name or "",
            "createdAt": now,
            "updatedAt": now,
        })
        plant_id = new_plant.id

    _, new_user_plant = db.collection("user_plants").add({
        "userId": user_id,
        "plantId": plant_id,
        "photoUrl": image_url or "",
        "status": "healthy",
        "addedAt": now,
        "createdAt": now,
        "updatedAt": now,
    })

    return {"userPlantId": new_user_plant.id, "plantId": plant_id}


def find_or_create_user_by_google(
    google_id: str,
    email: str,
    full_name: str,
    photo_url: str,
) -> str:
    from datetime import datetime, timezone

    db = get_firestore_client()
    users_ref = db.collection("users")

    results = list(
        users_ref.where(filter=FieldFilter("email", "==", email)).limit(1).stream()
    )
    if results:
        return results[0].id

    now = datetime.now(timezone.utc).isoformat()
    username = email.split("@")[0]
    _, new_doc = users_ref.add({
        "fullName": full_name,
        "username": username,
        "email": email,
        "bio": "",
        "birthdate": "",
        "photoURL": photo_url,
        "stats": {"plantsCount": 0, "streakDays": 0},
        "acceptedTerms": True,
        "googleId": google_id,
        "createdAt": now,
        "updatedAt": now,
    })
    return new_doc.id

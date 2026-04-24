from typing import Any

from fastapi import HTTPException
from google.cloud.firestore_v1.base_query import FieldFilter

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

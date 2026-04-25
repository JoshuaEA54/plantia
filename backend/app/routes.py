from fastapi import APIRouter, UploadFile, File

from .models import (
    AchievementModel,
    ApiCollectionResponse,
    CalendarEntryModel,
    CategoryModel,
    ExploreFeaturedModel,
    ExploreFilterModel,
    IdentifyResponse,
    PlantDetailResponse,
    PlantLikeModel,
    PlantModel,
    PlantOfDayModel,
    PlantUpdateDTO,
    ReminderModel,
    SaveIdentifiedPlantDTO,
    SaveIdentifiedPlantResponse,
    UserAchievementModel,
    UserModel,
    UserPlantModel,
    UserProfileResponse,
    UserUpdateDTO,
    GoogleAuthRequest,
    GoogleAuthResponse,
)
from .services import (
    get_collection,
    get_document,
    update_document,
    find_or_create_user_by_google,
    identify_plant_from_image,
    save_identified_plant,
)

router = APIRouter()


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------


@router.get("/api/users/{user_id}", response_model=UserModel)
def read_user(user_id: str) -> dict:
    return get_document("users", user_id)


@router.put("/api/users/{user_id}", response_model=UserModel)
def update_user(user_id: str, body: UserUpdateDTO) -> dict:
    data = {k: v for k, v in body.model_dump().items() if v is not None}
    return update_document("users", user_id, data)


@router.get("/api/users/{user_id}/profile", response_model=UserProfileResponse)
def read_user_profile(user_id: str) -> dict:
    user = get_document("users", user_id)
    categories = get_collection("categories")

    favorite_plant = None
    # profile doesn't have favoritePlantId in new schema; kept for forward-compat
    favorite_plant_id = user.get("favoritePlantId")
    if isinstance(favorite_plant_id, str) and favorite_plant_id:
        favorite_plant = get_document("plants", favorite_plant_id)

    return {
        "user": user,
        "categories": categories,
        "favoritePlant": favorite_plant,
    }


# ---------------------------------------------------------------------------
# Plants
# ---------------------------------------------------------------------------


@router.get("/api/plants/{plant_id}", response_model=PlantDetailResponse)
def read_plant_detail(plant_id: str) -> dict:
    plant = get_document("plants", plant_id)
    return {"plant": plant, "userPlant": None}


@router.put("/api/plants/{plant_id}", response_model=PlantModel)
def update_plant(plant_id: str, body: PlantUpdateDTO) -> dict:
    data = {k: v for k, v in body.model_dump().items() if v is not None}
    return update_document("plants", plant_id, data)


@router.get("/api/users/{user_id}/plants", response_model=list[UserPlantModel])
def read_user_plants(user_id: str) -> list[dict]:
    return get_collection("user_plants", filters=[("userId", "==", user_id)])


# ---------------------------------------------------------------------------
# Categories
# ---------------------------------------------------------------------------


@router.get("/api/categories", response_model=list[CategoryModel])
def read_categories() -> list[dict]:
    return get_collection("categories")


# ---------------------------------------------------------------------------
# Plant of the day
# ---------------------------------------------------------------------------


@router.get("/api/plant-of-day", response_model=list[PlantOfDayModel])
def read_plant_of_day() -> list[dict]:
    return get_collection("plant_of_day")


# ---------------------------------------------------------------------------
# Achievements
# ---------------------------------------------------------------------------


@router.get("/api/achievements", response_model=list[AchievementModel])
def read_achievements() -> list[dict]:
    return get_collection("achievements")


@router.get("/api/users/{user_id}/achievements", response_model=list[UserAchievementModel])
def read_user_achievements(user_id: str) -> list[dict]:
    return get_collection("user_achievements", filters=[("userId", "==", user_id)])


# ---------------------------------------------------------------------------
# Calendar & reminders
# ---------------------------------------------------------------------------


@router.get("/api/users/{user_id}/calendar", response_model=list[CalendarEntryModel])
def read_user_calendar(user_id: str) -> list[dict]:
    return get_collection("calendar_entries", filters=[("userId", "==", user_id)])


@router.get("/api/users/{user_id}/reminders", response_model=list[ReminderModel])
def read_user_reminders(user_id: str) -> list[dict]:
    return get_collection("reminders", filters=[("userId", "==", user_id)])


# ---------------------------------------------------------------------------
# Explore
# ---------------------------------------------------------------------------


@router.get("/api/explore/filters", response_model=list[ExploreFilterModel])
def read_explore_filters() -> list[dict]:
    return get_collection("explore_filters")


@router.get("/api/explore/featured", response_model=list[ExploreFeaturedModel])
def read_explore_featured() -> list[dict]:
    return get_collection("explore_featured", order_by="weeklyRank")


# ---------------------------------------------------------------------------
# Social
# ---------------------------------------------------------------------------


@router.get("/api/users/{user_id}/likes", response_model=list[PlantLikeModel])
def read_user_likes(user_id: str) -> list[dict]:
    return get_collection("plant_likes", filters=[("userId", "==", user_id)])


# ---------------------------------------------------------------------------
# Generic collection (debug / admin)
# ---------------------------------------------------------------------------


@router.get("/api/collections/{collection_name}", response_model=ApiCollectionResponse)
def read_collection(collection_name: str) -> dict:
    items = get_collection(collection_name)
    return {
        "collection": collection_name,
        "count": len(items),
        "items": items,
    }


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------


@router.post("/api/auth/google", response_model=GoogleAuthResponse)
def google_auth(body: GoogleAuthRequest) -> dict:
    user_id = find_or_create_user_by_google(
        google_id=body.googleId,
        email=body.email,
        full_name=body.fullName,
        photo_url=body.photoURL,
    )
    return {"userId": user_id}


# ---------------------------------------------------------------------------
# Plant identification
# ---------------------------------------------------------------------------


@router.post("/api/plants/identify", response_model=IdentifyResponse)
async def identify_plant(image: UploadFile = File(...)) -> dict:
    image_bytes = await image.read()
    return await identify_plant_from_image(image_bytes, image.filename or "plant.jpg")


# ---------------------------------------------------------------------------
# Save identified plant to user collection
# ---------------------------------------------------------------------------


@router.post("/api/users/{user_id}/plants/identified", response_model=SaveIdentifiedPlantResponse)
def save_identified_plant_route(user_id: str, body: SaveIdentifiedPlantDTO) -> dict:
    return save_identified_plant(
        user_id=user_id,
        scientific_name=body.scientificName,
        common_name=body.commonName,
        family=body.family,
        image_url=body.imageUrl,
    )

from typing import Literal

from pydantic import BaseModel


# ---------------------------------------------------------------------------
# Base Firestore document
# ---------------------------------------------------------------------------


class FirestoreBaseModel(BaseModel):
    id: str
    createdAt: str | None = None
    updatedAt: str | None = None


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------


class UserStatsModel(BaseModel):
    plantsCount: int
    streakDays: int


class UserModel(FirestoreBaseModel):
    fullName: str
    username: str
    email: str
    bio: str
    birthdate: str
    photoURL: str
    stats: UserStatsModel
    acceptedTerms: bool


# ---------------------------------------------------------------------------
# Categories (global catalog)
# ---------------------------------------------------------------------------


class CategoryModel(FirestoreBaseModel):
    name: str
    iconName: str


# ---------------------------------------------------------------------------
# Plants (global catalog)
# ---------------------------------------------------------------------------


class PlantModel(FirestoreBaseModel):
    name: str
    family: str
    habitat: str
    categoryId: str
    imageUrl: str
    description: str


# ---------------------------------------------------------------------------
# User–Plant relationship
# ---------------------------------------------------------------------------


class UserPlantModel(FirestoreBaseModel):
    userId: str
    plantId: str
    photoUrl: str
    status: str  # e.g. "healthy"
    addedAt: str


# ---------------------------------------------------------------------------
# Plant of the day
# ---------------------------------------------------------------------------


class PlantOfDayModel(FirestoreBaseModel):
    plantId: str
    date: str


# ---------------------------------------------------------------------------
# Achievements
# ---------------------------------------------------------------------------


class AchievementModel(FirestoreBaseModel):
    key: str
    name: str
    iconName: str
    type: Literal["boolean", "progress"]
    goal: int | None


class UserAchievementModel(FirestoreBaseModel):
    userId: str
    achievementId: str
    completed: bool
    progress: int | None
    unlockedAt: str | None


# ---------------------------------------------------------------------------
# Calendar & reminders
# ---------------------------------------------------------------------------


class CalendarEntryModel(FirestoreBaseModel):
    userId: str
    date: str


class ReminderModel(FirestoreBaseModel):
    userId: str
    plantId: str
    type: str        # e.g. "water"
    recurrence: str  # e.g. "weekly"
    nextScheduledAt: str
    lastCompletedAt: str


# ---------------------------------------------------------------------------
# Explore
# ---------------------------------------------------------------------------


class ExploreFilterModel(FirestoreBaseModel):
    key: str
    label: str


class ExploreFeaturedModel(FirestoreBaseModel):
    plantId: str
    weeklyRank: int
    featured: bool
    trending: bool
    identifiedByHandle: str | None


# ---------------------------------------------------------------------------
# Social
# ---------------------------------------------------------------------------


class PlantLikeModel(FirestoreBaseModel):
    userId: str
    plantId: str
    likedAt: str


# ---------------------------------------------------------------------------
# Response envelopes
# ---------------------------------------------------------------------------


class UserProfileResponse(BaseModel):
    user: UserModel
    categories: list[CategoryModel]
    favoritePlant: PlantModel | None = None


class PlantDetailResponse(BaseModel):
    plant: PlantModel
    userPlant: UserPlantModel | None = None


class ApiCollectionResponse(BaseModel):
    collection: str
    count: int
    items: list[dict]


# ---------------------------------------------------------------------------
# Update DTOs
# ---------------------------------------------------------------------------


class UserUpdateDTO(BaseModel):
    fullName: str | None = None
    username: str | None = None
    bio: str | None = None
    birthdate: str | None = None


class PlantUpdateDTO(BaseModel):
    name: str | None = None
    family: str | None = None
    habitat: str | None = None
    description: str | None = None


# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------


class GoogleAuthRequest(BaseModel):
    googleId: str
    email: str
    fullName: str
    photoURL: str


class GoogleAuthResponse(BaseModel):
    userId: str


# ---------------------------------------------------------------------------
# Plant identification
# ---------------------------------------------------------------------------


class PlantSuggestion(BaseModel):
    scientificName: str
    commonName: str | None
    confidence: int
    family: str | None
    imageUrl: str | None


class IdentifyResponse(BaseModel):
    bestMatch: str
    results: list[PlantSuggestion]


class SaveIdentifiedPlantDTO(BaseModel):
    scientificName: str
    commonName: str | None = None
    family: str | None = None
    imageUrl: str | None = None
    confidence: int


class SaveIdentifiedPlantResponse(BaseModel):
    userPlantId: str
    plantId: str

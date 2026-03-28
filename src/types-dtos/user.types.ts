// ---------------------------------------------------------------------------
// Frontend types (usados por los componentes de UI)
// ---------------------------------------------------------------------------

export type Plant = {
  id: string;
  name: string;
  status: string;
  image: string;
};

export type Category = {
  iconName: string;
  name: string;
};

export type UserProfileData = {
  name: string;
  handle: string;
  bio: string;
  birthdate: string;
  avatarUrl: string;
  stats: {
    plants: number;
    friends: number;
    streak: number;
  };
};

// ---------------------------------------------------------------------------
// DTOs del backend (reflejan los modelos Pydantic de backend/app/models.py)
// ---------------------------------------------------------------------------

export type ApiUserStats = {
  plantsCount: number;
  streakDays: number;
};

export type ApiUser = {
  id: string;
  fullName: string;
  username: string;
  bio: string;
  birthdate: string;
  photoURL: string;
  stats: ApiUserStats;
};

export type ApiCategory = {
  id: string;
  name: string;
  iconName: string;
};

export type ApiUserProfileResponse = {
  user: ApiUser;
  categories: ApiCategory[];
  favoritePlant: unknown;
};

export type ApiUserPlant = {
  id: string;
  userId: string;
  plantId: string;
  photoUrl: string;
  status: string;
  addedAt: string;
};

export type ApiPlant = {
  id: string;
  name: string;
  family: string;
  habitat: string;
  categoryId: string;
  imageUrl: string;
  description: string;
};

export type ApiPlantDetailResponse = {
  plant: ApiPlant;
  userPlant: ApiUserPlant | null;
};

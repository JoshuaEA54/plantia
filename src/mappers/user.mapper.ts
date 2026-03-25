import {
  ApiCategory,
  ApiPlant,
  ApiUser,
  ApiUserPlant,
  Category,
  Plant,
  UserProfileData,
} from '@/src/types-dtos/user.types';
import { formatBirthdate } from '@/src/utils/date';

export function mapUser(user: ApiUser): UserProfileData {
  return {
    name: user.fullName,
    handle: user.username,
    bio: user.bio,
    birthdate: formatBirthdate(user.birthdate),
    avatarUrl: user.photoURL,
    stats: {
      plants: user.stats.plantsCount,
      friends: 0,
      streak: user.stats.streakDays,
    },
  };
}

export function mapCategory(category: ApiCategory): Category {
  return {
    iconName: category.iconName,
    name: category.name,
  };
}

export function mapPlant(userPlant: ApiUserPlant, plant: ApiPlant): Plant {
  const statusMap: Record<string, string> = {
    healthy: '🌱 Saludable',
  };

  return {
    id: userPlant.id,
    name: plant.name,
    status: statusMap[userPlant.status] ?? '🌿 En cuidado',
    image: userPlant.photoUrl,
  };
}
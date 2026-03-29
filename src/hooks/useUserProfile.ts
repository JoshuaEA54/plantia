import { useCallback, useState } from 'react';
import { useAuthContext } from '@/src/context/AuthContext';
import { mapPlant, mapUser } from '@/src/mappers/user.mapper';
import { ApiError } from '@/src/services/api';
import {
  fetchPlantDetail,
  fetchUserPlants,
  fetchUserProfile,
} from '@/src/services/userProfile.service';
import {
  ApiUser,
  Category,
  Plant,
  UserProfileData,
} from '@/src/types-dtos/user.types';
import { AsyncState } from '@/src/types-dtos/async-state';

export type ProfileState = AsyncState<{
  user: UserProfileData;
  categories: Category[];
  plants: Plant[];
  rawUser: ApiUser;
}>;

export function useUserProfile(): { state: ProfileState; refetch: () => void } {
  const { userId } = useAuthContext();
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  const load = useCallback(() => {
    if (!userId) {
      setState({ status: 'error', message: 'No has iniciado sesión' });
      return;
    }
    let cancelled = false;

    async function doFetch() {
      try {
        const [profile, userPlants] = await Promise.all([
          fetchUserProfile(userId!),
          fetchUserPlants(userId!),
        ]);

        const plantDetails = await Promise.all(
          userPlants.map((up) => fetchPlantDetail(up.plantId)),
        );

        if (cancelled) return;

        const categoryNameById = new Map(
          profile.categories.map((category) => [category.id, category.name]),
        );
        const userCategoryIds = new Set(
          plantDetails
            .map((detail) => detail.plant.categoryId)
            .filter((categoryId): categoryId is string => Boolean(categoryId)),
        );
        const categories = [...userCategoryIds]
          .map((categoryId) => categoryNameById.get(categoryId))
          .filter((name): name is string => Boolean(name))
          .map((name) => ({ name }));

        setState({
          status: 'success',
          user: mapUser(profile.user),
          categories,
          plants: userPlants.map((up, i) => mapPlant(up, plantDetails[i].plant)),
          rawUser: profile.user,
        });
      } catch (err) {
        if (cancelled) return;
        setState({
          status: 'error',
          message: err instanceof ApiError ? err.message : 'Error de conexión',
        });
      }
    }

    doFetch();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { state, refetch: load };
}

import { useCallback, useState } from 'react';
import { useAuthContext } from '@/src/context/AuthContext';
import { mapCategory, mapPlant, mapUser } from '@/src/mappers/user.mapper';
import { ApiError } from '@/src/services/api';
import {
  fetchPlantDetail,
  fetchUserPlants,
  fetchUserProfile,
} from '@/src/services/userProfile.service';
import {
  ApiPlant,
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
  rawPlants: ApiPlant[];
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

        setState({
          status: 'success',
          user: mapUser(profile.user),
          categories: profile.categories.map(mapCategory),
          plants: userPlants.map((up, i) => mapPlant(up, plantDetails[i].plant)),
          rawUser: profile.user,
          rawPlants: plantDetails.map((d) => d.plant),
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

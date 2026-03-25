import { useEffect, useState } from 'react';
import { mapCategory, mapPlant, mapUser } from '@/src/mappers/user.mapper';
import { ApiError } from '@/src/services/api';
import {
  fetchPlantDetail,
  fetchUserPlants,
  fetchUserProfile,
} from '@/src/services/userProfile.service';
import {
  Category,
  Plant,
  UserProfileData,
} from '@/src/types-dtos/user.types';

// TODO: reemplazar con auth context cuando exista
const USER_ID = 'user_1';

// ---------------------------------------------------------------------------
// Máquina de estados
// ---------------------------------------------------------------------------

export type ProfileState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; user: UserProfileData; categories: Category[]; plants: Plant[] };

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useUserProfile(): ProfileState {
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profile, userPlants] = await Promise.all([
          fetchUserProfile(USER_ID),
          fetchUserPlants(USER_ID),
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
        });
      } catch (err) {
        if (cancelled) return;
        setState({
          status: 'error',
          message: err instanceof ApiError ? err.message : 'Error de conexión',
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

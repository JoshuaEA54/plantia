import { useEffect, useState } from 'react';
import { useAuthContext } from '@/src/context/AuthContext';
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
  const { userId } = useAuthContext();
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    async function load() {
      try {
        const [profile, userPlants] = await Promise.all([
          fetchUserProfile(userId),
          fetchUserPlants(userId),
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
  }, [userId]);

  return state;
}

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
  ApiPlant,
  ApiUser,
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
  | { status: 'success'; user: UserProfileData; categories: Category[]; plants: Plant[]; rawUser: ApiUser; rawPlants: ApiPlant[] };

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useUserProfile(): ProfileState {
  const { userId } = useAuthContext();
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  useEffect(() => {
    if (!userId) {
      setState({ status: 'error', message: 'No has iniciado sesión' });
      return;
    }
    const currentUserId = userId;
    let cancelled = false;

    async function load() {
      try {
        const [profile, userPlants] = await Promise.all([
          fetchUserProfile(currentUserId),
          fetchUserPlants(currentUserId),
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

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return state;
}

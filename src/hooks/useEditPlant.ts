import { AsyncState } from '@/src/types-dtos/async-state';
import { ApiPlant } from '@/src/types-dtos/user.types';
import { useUserProfile } from './useUserProfile';

export function useEditPlant(plantId: string): AsyncState<ApiPlant> {
  const profile = useUserProfile();

  if (profile.status === 'loading') return { status: 'loading' };
  if (profile.status === 'error') return { status: 'error', error: profile.message };

  const plant = profile.rawPlants.find((p) => p.id === plantId);
  if (!plant) return { status: 'error', error: 'Planta no encontrada' };

  return { status: 'success', data: plant };
}

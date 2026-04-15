import { AsyncState } from '@/src/types-dtos/async-state';
import { ApiPlant } from '@/src/types-dtos/user.types';
import { useUserProfile } from './useUserProfile';

export function useEditPlant(plantId: string): AsyncState<{ plant: ApiPlant }> {
  const profile = useUserProfile();

  if (profile.status === 'loading') return { status: 'loading' };
  if (profile.status === 'error') return { status: 'error', message: profile.message };

  const plant = profile.rawPlants.find((p) => p.id === plantId);
  if (!plant) return { status: 'error', message: 'Planta no encontrada' };

  return { status: 'success', plant };
}

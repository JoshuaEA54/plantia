import { AsyncState } from '@/src/types-dtos/async-state';
import { ApiUser } from '@/src/types-dtos/user.types';
import { useUserProfile } from './useUserProfile';

export function useEditProfile(): AsyncState<{ user: ApiUser }> {
  const profile = useUserProfile();

  if (profile.status === 'loading') return { status: 'loading' };
  if (profile.status === 'error') return { status: 'error', message: profile.message };

  return { status: 'success', user: profile.rawUser };
}

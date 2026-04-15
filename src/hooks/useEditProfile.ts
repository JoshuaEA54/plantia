import { useEffect } from 'react';
import { AsyncState } from '@/src/types-dtos/async-state';
import { ApiUser } from '@/src/types-dtos/user.types';
import { useUserProfile } from './useUserProfile';

export function useEditProfile(): AsyncState<{ user: ApiUser }> {
  const { state, refetch } = useUserProfile();

  useEffect(() => {
    return refetch();
  }, [refetch]);

  if (state.status === 'loading') return { status: 'loading' };
  if (state.status === 'error') return { status: 'error', message: state.message };

  return { status: 'success', user: state.rawUser };
}

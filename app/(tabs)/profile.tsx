import { useFocusEffect } from 'expo-router';
import { useUserProfile } from '@/src/hooks/useUserProfile';
import UserProfile from '@/src/screens/userProfile/UserProfile';
import LoadingScreen from '@/src/components/common/LoadingScreen';
import ErrorScreen from '@/src/components/common/ErrorScreen';

export default function ProfileTab() {
  const { state, refetch } = useUserProfile();

  useFocusEffect(refetch);

  if (state.status === 'loading') return <LoadingScreen />;
  if (state.status === 'error') return <ErrorScreen message={state.message} />;

  return (
    <UserProfile
      user={state.user}
      categories={state.categories}
      plants={state.plants}
    />
  );
}

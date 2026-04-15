import { useEditProfile } from '@/src/hooks/useEditProfile';
import EditProfileScreen from '@/src/screens/editProfile/EditProfile';
import LoadingScreen from '@/src/components/common/LoadingScreen';
import ErrorScreen from '@/src/components/common/ErrorScreen';

export default function EditProfileRoute() {
  const state = useEditProfile();

  if (state.status === 'loading') return <LoadingScreen />;
  if (state.status === 'error') return <ErrorScreen message={state.message} />;

  return <EditProfileScreen user={state.user} />;
}

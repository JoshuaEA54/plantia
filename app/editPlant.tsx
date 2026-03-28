import { useLocalSearchParams } from 'expo-router';
import { useEditPlant } from '@/src/hooks/useEditPlant';
import EditPlantScreen from '@/src/screens/editPlant/EditPlant';
import LoadingScreen from '@/src/components/common/LoadingScreen';
import ErrorScreen from '@/src/components/common/ErrorScreen';

export default function EditPlantRoute() {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();
  const state = useEditPlant(plantId);

  if (state.status === 'loading') return <LoadingScreen />;
  if (state.status === 'error') return <ErrorScreen message={state.message} />;

  return <EditPlantScreen plant={state.plant} />;
}

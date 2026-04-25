import { useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { CameraView } from 'expo-camera';
import { useCameraScreenTheme } from './CameraScreen.styles';
import { useCamera } from '@/src/hooks/useCamera';
import { usePlantIdentification } from '@/src/hooks/usePlantIdentification';
import { useAuthContext } from '@/src/context/AuthContext';
import { saveIdentifiedPlant } from '@/src/services/plantnet.service';
import CameraControls from './components/CameraControls';
import PhotoPreviewScreen from './components/PhotoPreviewScreen';
import IdentificationBottomSheet from './components/IdentificationBottomSheet';
import type { PlantSuggestion } from '@/src/types-dtos/plantnet.types';

type Props = {
  onBack: () => void;
};

export default function CameraScreen({ onBack }: Props) {
  const { styles } = useCameraScreenTheme();
  const { userId } = useAuthContext();
  const {
    cameraRef,
    permissions,
    isPermissionGranted,
    isLoadingPermissions,
    isCameraReady,
    facing,
    flashMode,
    handleCameraReady,
    toggleFacing,
    toggleFlash,
    takePhoto,
    previewPhoto,
    openGallery,
    clearPreview,
  } = useCamera({ requestOnMount: true, onBack });

  const { identificationState, identify, reset } = usePlantIdentification();

  const handleIdentify = useCallback(() => {
    if (!previewPhoto?.uri) return;
    identify(previewPhoto.uri);
  }, [previewPhoto, identify]);

  const handleRetake = useCallback(() => {
    reset();
    clearPreview();
  }, [reset, clearPreview]);

  const handleSave = useCallback(async (suggestion: PlantSuggestion) => {
    if (!userId) return;
    await saveIdentifiedPlant(userId, suggestion);
    reset();
    clearPreview();
  }, [userId, reset, clearPreview]);

  if (isLoadingPermissions || permissions === null) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  if (!isPermissionGranted) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* CameraView stays mounted to avoid SurfaceView layer conflicts on Android */}
      <CameraView
        ref={cameraRef}
        style={styles.cameraView}
        facing={facing}
        flash={flashMode}
        onCameraReady={handleCameraReady}
      />

      {!previewPhoto && (
        <CameraControls
          flashMode={flashMode}
          isCameraReady={isCameraReady}
          onBack={onBack}
          onToggleFlash={toggleFlash}
          onToggleFacing={toggleFacing}
          onShutter={takePhoto}
          onOpenGallery={openGallery}
        />
      )}

      {previewPhoto && (
        <PhotoPreviewScreen
          photo={previewPhoto}
          onBack={handleRetake}
          onIdentify={handleIdentify}
        />
      )}

      <IdentificationBottomSheet
        identificationState={identificationState}
        onRetake={handleRetake}
        onSave={handleSave}
      />
    </View>
  );
}

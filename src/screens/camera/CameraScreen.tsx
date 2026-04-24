import { View, ActivityIndicator } from 'react-native';
import { CameraView } from 'expo-camera';
import { useCameraScreenTheme } from './CameraScreen.styles';
import { useCamera } from '@/src/hooks/useCamera';
import CameraControls from './components/CameraControls';
import PhotoPreviewScreen from './components/PhotoPreviewScreen';

type Props = {
  onBack: () => void;
};

export default function CameraScreen({ onBack }: Props) {
  const { styles } = useCameraScreenTheme();
  const {
    cameraRef,
    permissions,
    isPermissionGranted,
    isLoadingPermissions,
    facing,
    flashMode,
    toggleFacing,
    toggleFlash,
    takePhoto,
    previewPhoto,
    openGallery,
    clearPreview,
  } = useCamera({ requestOnMount: true, onBack });

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
      />

      {!previewPhoto && (
        <CameraControls
          flashMode={flashMode}
          onBack={onBack}
          onToggleFlash={toggleFlash}
          onToggleFacing={toggleFacing}
          onShutter={takePhoto}
          onOpenGallery={openGallery}
        />
      )}

      {previewPhoto && (
        <PhotoPreviewScreen photo={previewPhoto} onBack={clearPreview} />
      )}
    </View>
  );
}

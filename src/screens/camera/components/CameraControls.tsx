import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashMode } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CameraControls.styles';

const FLASH_ICONS: Record<FlashMode, keyof typeof Ionicons.glyphMap> = {
  off: 'flash-off-outline',
  on: 'flash-outline',
  auto: 'flash-outline',
};

type Props = {
  flashMode: FlashMode;
  isCameraReady: boolean;
  onBack: () => void;
  onToggleFlash: () => void;
  onToggleFacing: () => void;
  onShutter: () => void;
  onOpenGallery: () => void;
};

export default function CameraControls({
  flashMode,
  isCameraReady,
  onBack,
  onToggleFlash,
  onToggleFacing,
  onShutter,
  onOpenGallery,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ flex: 1 }]} pointerEvents="box-none">
      {/* Top row */}
      <View style={[styles.topRow, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onToggleFlash} activeOpacity={0.7}>
          <Ionicons
            name={flashMode === 'auto' ? 'flash-outline' : FLASH_ICONS[flashMode]}
            size={24}
            color={flashMode === 'on' || flashMode === 'auto' ? '#FFD700' : 'white'}
          />
          {flashMode === 'auto' && <View style={styles.autoBadge} />}
        </TouchableOpacity>
      </View>

      {/* Bottom row: [Gallery] [Shutter] [Flip] */}
      <View style={[styles.bottomRow, { paddingBottom: insets.bottom + 32 }]}>
        <View style={[styles.bottomCell, styles.bottomCellLeft]}>
          <TouchableOpacity style={styles.iconButton} onPress={onOpenGallery} activeOpacity={0.7}>
            <Ionicons name="images-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomCell}>
          <TouchableOpacity style={styles.shutterButton} onPress={onShutter} activeOpacity={0.8} disabled={!isCameraReady}>
            <View style={[styles.shutterInner, !isCameraReady && { opacity: 0.4 }]} />
          </TouchableOpacity>
        </View>

        <View style={[styles.bottomCell, styles.bottomCellRight]}>
          <TouchableOpacity style={styles.iconButton} onPress={onToggleFacing} activeOpacity={0.7}>
            <Ionicons name="camera-reverse-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

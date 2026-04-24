import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useFloatingCameraButtonTheme } from './FloatingCameraButton.styles';
import { TAB_BAR_HEIGHT } from '@/src/constants/dimensions';
import { CAMERA_BUTTON_SIZE } from '@/src/constants/camera';

type Props = {
  isCameraActive: boolean;
  onOpenCamera: () => void;
};

export default function FloatingCameraButton({ isCameraActive, onOpenCamera }: Props) {
  const { styles } = useFloatingCameraButtonTheme();
  const insets = useSafeAreaInsets();

  if (isCameraActive) return null;

  const bottomBase = insets.bottom + TAB_BAR_HEIGHT / 2 - CAMERA_BUTTON_SIZE / 2 + 4;

  return (
    <Animated.View style={[styles.container, { bottom: bottomBase }]}>
      <TouchableOpacity activeOpacity={0.85} onPress={onOpenCamera} style={styles.button}>
        <Ionicons name="camera-outline" size={26} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

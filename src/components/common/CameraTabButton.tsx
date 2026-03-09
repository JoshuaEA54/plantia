import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCameraTabButtonTheme } from './CameraTabButton.styles';

type Props = {
  onPress?: () => void;
};

export default function CameraTabButton({ onPress }: Props) {
  const { styles } = useCameraTabButtonTheme();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.button}>
        <Ionicons name="camera-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

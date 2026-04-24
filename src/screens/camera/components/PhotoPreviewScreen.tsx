import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './PhotoPreviewScreen.styles';
import type { PhotoResult } from '@/src/types-dtos/camera.types';

type Props = {
  photo: PhotoResult;
  onBack: () => void;
};

export default function PhotoPreviewScreen({ photo, onBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.photo} resizeMode="contain" />

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.closeButton} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity style={styles.sendButton} disabled>
          <Ionicons name="arrow-forward" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

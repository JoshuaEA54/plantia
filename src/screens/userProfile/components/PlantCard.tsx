import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Plant } from '@/src/types-dtos/user.types';
import { usePlantCardTheme } from './PlantCard.styles';

type PlantCardProps = Plant & { onEdit?: () => void };

export default function PlantCard({ name, status, image, onEdit }: PlantCardProps) {
  const { theme, styles } = usePlantCardTheme();

  return (
    <TouchableOpacity style={styles.plantCard}>
      <Image source={{ uri: image }} style={styles.plantImage} />
      <View style={styles.plantInfo}>
        <Text style={styles.plantName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.plantStatus}>{status}</Text>
      </View>
      {onEdit && (
        <TouchableOpacity
          onPress={onEdit}
          style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: 4 }}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Ionicons name="pencil" size={14} color="#fff" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

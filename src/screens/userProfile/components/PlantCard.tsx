import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Plant } from '@/src/types-dtos/user.types';
import { usePlantCardTheme } from './PlantCard.styles';

type PlantCardProps = Plant;

export default function PlantCard({ name, status, image }: PlantCardProps) {
  const { styles } = usePlantCardTheme();

  return (
    <TouchableOpacity style={styles.plantCard}>
      <Image source={{ uri: image }} style={styles.plantImage} />
      <View style={styles.plantInfo}>
        <Text style={styles.plantName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.plantStatus}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
}

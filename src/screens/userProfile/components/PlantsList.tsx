import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Plant } from '@/src/types-dtos/user.types';
import PlantCard from './PlantCard';
import { usePlantsListTheme } from './PlantsList.styles';

interface PlantsListProps {
  plants: Plant[];
}

export default function PlantsList({ plants }: PlantsListProps) {
  const { theme, styles } = usePlantsListTheme();

  return (
    <>
      <View style={styles.plantsHeader}>
        <Text style={styles.sectionTitle}>Mis plantas</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{plants.length}</Text>
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.verTodasButton}>
          <Text style={styles.verTodasText}>Ver todas</Text>
          <Ionicons name="chevron-forward" size={13} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.plantsGrid}>
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            id={plant.id}
            name={plant.name}
            status={plant.status}
            image={plant.image}
          />
        ))}
      </View>
    </>
  );
}

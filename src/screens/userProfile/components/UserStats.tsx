import { Text, View } from 'react-native';
import { UserProfileData } from '@/src/types-dtos/user.types';
import { useUserStatsTheme } from './UserStats.styles';

interface UserStatsProps {
  stats: UserProfileData['stats'];
}

export default function UserStats({ stats }: UserStatsProps) {
  const { styles } = useUserStatsTheme();

  return (
    <View style={styles.statsCard}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.plants}</Text>
        <Text style={styles.statLabel}>Plantas</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.friends}</Text>
        <Text style={styles.statLabel}>Amigos</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.streak}🔥</Text>
        <Text style={styles.statLabel}>Racha</Text>
      </View>
    </View>
  );
}

import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { useUserProfile } from '@/src/hooks/useUserProfile';
import { useProfileTheme } from './UserProfile.styles';
import ProfileHeader from './components/ProfileHeader';
import UserStats from './components/UserStats';
import CategoryList from './components/CategoryList';
import PlantsList from './components/PlantsList';

export default function UserProfile() {
  const insets = useSafeAreaInsets();
  const { styles } = useProfileTheme();
  const router = useRouter();
  const { state, refetch } = useUserProfile();

  useFocusEffect(refetch);

  if (state.status === 'loading') {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (state.status === 'error') {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>{state.message}</Text>
      </View>
    );
  }

  const { user, categories, plants, rawPlants } = state;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <ProfileHeader
          user={user}
          topInset={insets.top}
          onEditPress={() => router.push('/editProfile')}
        />

        <UserStats stats={user.stats} />
        <CategoryList categories={categories} />
        <PlantsList
          plants={plants}
          rawPlantIds={rawPlants.map((p) => p.id)}
          onEditPlant={(plantId) => router.push({ pathname: '/editPlant', params: { plantId } })}
        />
      </ScrollView>
    </View>
  );
}

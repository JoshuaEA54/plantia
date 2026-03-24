import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserProfile } from '@/src/hooks/useUserProfile';
import { useProfileTheme } from './UserProfile.styles';
import ProfileHeader from './components/ProfileHeader';
import UserStats from './components/UserStats';
import CategoryList from './components/CategoryList';
import PlantsList from './components/PlantsList';

export default function UserProfile() {
  const insets = useSafeAreaInsets();
  const state = useUserProfile();
  const { styles } = useProfileTheme();

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

  const { user, categories, plants } = state;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <ProfileHeader user={user} topInset={insets.top} />
        <UserStats stats={user.stats} />
        <CategoryList categories={categories} />
        <PlantsList plants={plants} />
      </ScrollView>
    </View>
  );
}

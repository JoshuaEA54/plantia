import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBar from '@/src/components/common/TabBar';
import { useUserProfile } from '@/src/hooks/useUserProfile';
import { useProfileTheme } from './UserProfile.styles';
import ProfileHeader from './components/ProfileHeader';
import UserStats from './components/UserStats';
import CategoryList from './components/CategoryList';
import PlantsList from './components/PlantsList';

export default function UserProfile() {
  const insets = useSafeAreaInsets(); //Devuelve los márgenes seguros del dispositivo
  const { user, categories, plants } = useUserProfile();
  const { theme, styles } = useProfileTheme();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 96 }}
      >
        <ProfileHeader user={user} topInset={insets.top} />
        <UserStats stats={user.stats} />
        <CategoryList categories={categories} />
        <PlantsList plants={plants} />
      </ScrollView>

      <TabBar activeTab="profile" />
    </View>
  );
}

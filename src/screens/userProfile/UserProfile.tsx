import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useProfileTheme } from './UserProfile.styles';
import ProfileHeader from './components/ProfileHeader';
import UserStats from './components/UserStats';
import CategoryList from './components/CategoryList';
import PlantsList from './components/PlantsList';
import { Category, Plant, UserProfileData } from '@/src/types-dtos/user.types';

type Props = {
  user: UserProfileData;
  categories: Category[];
  plants: Plant[];
};

export default function UserProfile({ user, categories, plants }: Props) {
  const insets = useSafeAreaInsets();
  const { styles } = useProfileTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
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
        <PlantsList plants={plants} />
      </ScrollView>
    </View>
  );
}

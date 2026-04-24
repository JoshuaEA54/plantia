import { ActivityIndicator, View } from 'react-native';
import { useAppTheme } from '@/src/theme/desingSystem';

export default function LoadingScreen() {
  const { colors } = useAppTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

import { Text, View } from 'react-native';
import { useAppTheme } from '@/src/theme/desingSystem';

type Props = { message: string };

export default function ErrorScreen({ message }: Props) {
  const { colors, fontFamily } = useAppTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ fontFamily: fontFamily.regular, color: colors.textPrimary }}>{message}</Text>
    </View>
  );
}

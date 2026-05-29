import { Image, Text, View } from 'react-native';
import PlantFrameDecoration from '@/src/components/auth/plantFrame';
import { createWelcomeBrandStyles } from '@/src/components/auth/welcomeBrand.styles';
import { useAppTheme } from '@/src/theme/desingSystem';

type Props = {
  isReady: boolean;
  onComplete: () => void;
};

export default function AnimatedSplash({ isReady, onComplete }: Props) {
  const theme = useAppTheme();
  const styles = createWelcomeBrandStyles(theme);

  return (
    <PlantFrameDecoration mode="splash" isReady={isReady} onComplete={onComplete}>
      <View style={styles.center} pointerEvents="none">
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.title}>Plantia</Text>
      </View>
    </PlantFrameDecoration>
  );
}

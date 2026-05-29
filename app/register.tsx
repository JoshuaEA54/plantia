import { Image, Text, View } from 'react-native';
import PlantFrameDecoration from '@/src/components/auth/plantFrame';
import GoogleSignInButton from '@/src/components/common/GoogleSignInButton';
import { useAuth } from '@/src/hooks/useAuth';
import { useWelcomeTheme } from '@/src/screens/register/Welcome.styles';

export default function RegisterRoute() {
  const { styles } = useWelcomeTheme();
  const { authGoogle, isLoading } = useAuth();

  return (
    <PlantFrameDecoration mode="ambient">
      <View style={styles.center}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.title}>Plantia</Text>
        <Text style={styles.subtitle}>Tu diario botánico personal</Text>

        <View style={styles.cta}>
          <GoogleSignInButton onPress={authGoogle} disabled={isLoading} />
          <Text style={styles.hint}>
            Inicia sesión para guardar y sincronizar tus plantas
          </Text>
        </View>
      </View>
    </PlantFrameDecoration>
  );
}

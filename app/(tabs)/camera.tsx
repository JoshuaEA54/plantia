import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@/src/theme/desingSystem';

export default function CameraTab() {
  const theme = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.textPrimary }}>Cámara</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

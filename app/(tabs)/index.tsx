import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@/src/theme/desingSystem';

export default function HomeTab() {
  const theme = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.textPrimary }}>Inicio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

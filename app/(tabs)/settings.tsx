import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/src/theme/desingSystem';
import { useAuthContext } from '@/src/context/AuthContext';

export default function SettingsTab() {
  const theme = useAppTheme();
  const { setUserId } = useAuthContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.textPrimary }}>Ajustes</Text>

      <TouchableOpacity
        onPress={() => setUserId(null)}
        style={[styles.logoutButton, { borderColor: theme.colors.error }]}
      >
        <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
        <Text style={[styles.logoutText, { color: theme.colors.error, fontFamily: theme.fontFamily.medium }]}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  logoutText: { fontSize: 15 },
});

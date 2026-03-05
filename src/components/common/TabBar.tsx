import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTabBarTheme } from './TabBar.styles';

type TabName = 'home' | 'explore' | 'camera' | 'profile' | 'settings';

type Props = {
  activeTab?: TabName;
};

export default function TabBar({ activeTab = 'profile' }: Props) {
  const insets = useSafeAreaInsets();
  const { theme, styles } = useTabBarTheme();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons
          name="home-outline"
          size={22}
          color={activeTab === 'home' ? theme.colors.primary : theme.colors.textMuted}
        />
        <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Ionicons
          name="compass-outline"
          size={22}
          color={activeTab === 'explore' ? theme.colors.primary : theme.colors.textMuted}
        />
        <Text style={[styles.tabLabel, activeTab === 'explore' && styles.tabLabelActive]}>
          Explorar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabFab}>
        <Ionicons name="camera-outline" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Ionicons
          name="person"
          size={22}
          color={activeTab === 'profile' ? theme.colors.primary : theme.colors.textMuted}
        />
        <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>
          Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Ionicons
          name="settings-outline"
          size={22}
          color={activeTab === 'settings' ? theme.colors.primary : theme.colors.textMuted}
        />
        <Text style={[styles.tabLabel, activeTab === 'settings' && styles.tabLabelActive]}>
          Ajustes
        </Text>
      </TouchableOpacity>
    </View>
  );
}

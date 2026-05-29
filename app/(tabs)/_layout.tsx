import { View } from 'react-native';
import { Tabs, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingCameraButton from '@/src/screens/camera/components/FloatingCameraButton';
import CameraScreen from '@/src/screens/camera/CameraScreen';
import { useTabLayoutTheme } from '@/src/styles/tabLayout.styles';
import AppStatusBar from '@/src/components/common/AppStatusBar';
import { useTabCamera } from '@/src/hooks/useTabCamera';
import { CAMERA_BUTTON_SIZE } from '@/src/constants/camera';
import { TAB_BAR_HEIGHT } from '@/src/constants/dimensions';

export default function TabLayout() {
  const { theme, styles } = useTabLayoutTheme();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isProfileTab = pathname.includes('/profile');
  const statusBarBackground = isProfileTab
    ? theme.colors.primaryDark
    : theme.colors.background;
  const {
    isCameraActive,
    cameraKey,
    overlayAnimatedStyle,
    handleOpenCamera,
    handleCloseCamera,
  } = useTabCamera();

  return (
    <View style={styles.root}>
      <AppStatusBar backgroundColor={statusBarBackground} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: {
            ...styles.tabBar,
            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom + theme.spacing.sm,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explorar',
            tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: '',
            tabBarIcon: () => null,
            tabBarButton: () => <View style={{ width: CAMERA_BUTTON_SIZE }} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Ajustes',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          }}
        />
      </Tabs>

      {/* Animated overlay always present for smooth animation.
          CameraScreen mounts/unmounts with isCameraActive to guarantee fresh state on each open. */}
      <Animated.View
        style={overlayAnimatedStyle}
        pointerEvents={isCameraActive ? 'auto' : 'none'}
      >
        {isCameraActive && (
          <CameraScreen key={cameraKey} onBack={handleCloseCamera} />
        )}
      </Animated.View>

      <FloatingCameraButton
        isCameraActive={isCameraActive}
        onOpenCamera={handleOpenCamera}
      />
    </View>
  );
}

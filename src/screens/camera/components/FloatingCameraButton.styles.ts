import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';
import { CAMERA_BUTTON_SIZE } from '@/src/constants/camera';

const createFloatingCameraButtonStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    },
    button: {
      width: CAMERA_BUTTON_SIZE,
      height: CAMERA_BUTTON_SIZE,
      borderRadius: CAMERA_BUTTON_SIZE / 2,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 10,
    },
    shutterRing: {
      width: CAMERA_BUTTON_SIZE + 10,
      height: CAMERA_BUTTON_SIZE + 10,
      borderRadius: (CAMERA_BUTTON_SIZE + 10) / 2,
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.6)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    shutterInner: {
      width: CAMERA_BUTTON_SIZE - 6,
      height: CAMERA_BUTTON_SIZE - 6,
      borderRadius: (CAMERA_BUTTON_SIZE - 6) / 2,
      backgroundColor: 'white',
    },
  });

export const useFloatingCameraButtonTheme = createThemedStyles(createFloatingCameraButtonStyle);

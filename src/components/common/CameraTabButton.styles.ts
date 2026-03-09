import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createCameraTabButtonStyle = (theme: AppTheme) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      top: -theme.spacing.lg,
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 8,
    },
  });

export const useCameraTabButtonTheme = createThemedStyles(createCameraTabButtonStyle);

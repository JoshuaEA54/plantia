import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { AppTheme } from '@/src/theme/desingSystem';

type WelcomeBrandStyles = {
  center: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;
};

/** Objetos de estilo compartidos entre splash y auth */
export function getWelcomeBrandStyleObjects(theme: AppTheme): WelcomeBrandStyles {
  return {
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xl,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 24,
    },
    title: {
      marginTop: 12,
      fontSize: 36,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.primaryDark,
      letterSpacing: 1,
      includeFontPadding: false,
    },
  };
}

export function createWelcomeBrandStyles(theme: AppTheme) {
  return StyleSheet.create(getWelcomeBrandStyleObjects(theme));
}

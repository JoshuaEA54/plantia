import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createTabBarStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    tabBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: theme.colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 8,
      borderTopWidth: 0.8,
      borderTopColor: theme.colors.border,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 10,
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      minWidth: 42,
    },
    tabLabel: {
      fontSize: 10,
      color: theme.colors.textMuted,
      marginTop: 4,
    },
    tabLabelActive: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    tabFab: {
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 8,
    },
  });
};

export const useTabBarTheme = createThemedStyles(createTabBarStyle);

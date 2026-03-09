import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createTabLayoutStyle = (theme: AppTheme) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.white,
      borderTopColor: theme.colors.border,
      borderTopWidth: 0.8,
      height: 64,
      paddingBottom: theme.spacing.sm,
      paddingTop: theme.spacing.xs,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 10,
    },
    tabBarLabel: {
      fontSize: 10,
    },
  });

export const useTabLayoutTheme = createThemedStyles(createTabLayoutStyle);

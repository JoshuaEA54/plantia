import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createUserStatsStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    statsCard: {
      backgroundColor: theme.colors.white,
      marginHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.lg,
      borderRadius: 14,
      flexDirection: 'row',
      paddingVertical: 14,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statDivider: {
      width: 0.8,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.sm,
    },
    statNumber: {
      fontSize: theme.fontSize.display,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.textPrimary,
      lineHeight: 26,
    },
    statLabel: {
      fontSize: theme.fontSize.label,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
  });
};

export const useUserStatsTheme = createThemedStyles(createUserStatsStyle);

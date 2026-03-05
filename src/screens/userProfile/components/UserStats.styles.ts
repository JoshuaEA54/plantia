import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createUserStatsStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    statsCard: {
      backgroundColor: theme.colors.white,
      marginHorizontal: 16,
      marginTop: 16,
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
      marginVertical: 8,
    },
    statNumber: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      lineHeight: 26,
    },
    statLabel: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
  });
};

export const useUserStatsTheme = createThemedStyles(createUserStatsStyle);

import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createPlantsListStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    plantsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: theme.spacing.lg,
      marginTop: 20,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: theme.fontSize.overline,
      fontFamily: theme.fontFamily.semiBold,
      color: theme.colors.textSecondary,
      letterSpacing: 0.52,
      textTransform: 'uppercase',
    },
    countBadge: {
      backgroundColor: theme.colors.primaryLight,
      borderRadius: 8,
      paddingHorizontal: 7,
      paddingVertical: 1,
      marginLeft: theme.spacing.sm,
    },
    countText: {
      fontSize: theme.fontSize.label,
      fontFamily: theme.fontFamily.semiBold,
      color: theme.colors.primary,
    },
    spacer: {
      flex: 1,
    },
    verTodasButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    verTodasText: {
      fontSize: theme.fontSize.bodySmall,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primary,
    },
    plantsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });
};

export const usePlantsListTheme = createThemedStyles(createPlantsListStyle);

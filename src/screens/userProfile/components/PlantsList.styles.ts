import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createPlantsListStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    plantsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 20,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      letterSpacing: 0.52,
      textTransform: 'uppercase',
    },
    countBadge: {
      backgroundColor: theme.colors.primaryLight,
      borderRadius: 8,
      paddingHorizontal: 7,
      paddingVertical: 1,
      marginLeft: 8,
    },
    countText: {
      fontSize: 11,
      fontWeight: '600',
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
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.primary,
    },
    plantsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 16,
      gap: 12,
    },
  });
};

export const usePlantsListTheme = createThemedStyles(createPlantsListStyle);

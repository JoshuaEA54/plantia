import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createCategoryListStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    sectionLabel: {
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
    categoriesScroll: {
      marginTop: theme.spacing.sm,
    },
    categoriesContent: {
      paddingHorizontal: theme.spacing.lg,
      gap: theme.spacing.sm,
      flexDirection: 'row',
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryLight,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 7,
      gap: 6,
    },
    categoryEmoji: {
      fontSize: 13,
    },
    categoryName: {
      fontSize: theme.fontSize.bodySmall,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primaryDark,
    },
  });
};

export const useCategoryListTheme = createThemedStyles(createCategoryListStyle);

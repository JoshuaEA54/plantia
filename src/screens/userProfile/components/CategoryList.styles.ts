import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createCategoryListStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    sectionLabel: {
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
    categoriesScroll: {
      marginTop: 8,
    },
    categoriesContent: {
      paddingHorizontal: 16,
      gap: 8,
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
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.primaryDark,
    },
  });
};

export const useCategoryListTheme = createThemedStyles(createCategoryListStyle);

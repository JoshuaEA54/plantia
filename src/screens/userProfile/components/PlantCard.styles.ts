import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';
import { PLANT_CARD } from '@/src/constants/dimensions';

const createPlantCardStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    plantCard: {
      width: PLANT_CARD.WIDTH,
      backgroundColor: theme.colors.white,
      borderRadius: 14,
      overflow: 'hidden',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 5,
      elevation: 3,
    },
    plantImage: {
      width: '100%',
      height: PLANT_CARD.IMAGE_HEIGHT,
      resizeMode: 'cover',
    },
    plantInfo: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 12,
    },
    plantName: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    plantStatus: {
      fontSize: 10,
      color: theme.colors.textSecondary,
    },
  });
};

export const usePlantCardTheme = createThemedStyles(createPlantCardStyle);

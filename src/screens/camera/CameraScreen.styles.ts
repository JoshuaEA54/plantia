import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createCameraScreenStyle = (_theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    cameraView: {
      ...StyleSheet.absoluteFillObject,
    },
  });

export const useCameraScreenTheme = createThemedStyles(createCameraScreenStyle);

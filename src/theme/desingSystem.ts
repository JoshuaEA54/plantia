import { ColorSchemeName, useColorScheme } from 'react-native';
import { AppTheme, ThemeMode, sharedSpacing, sharedRadius, fontFamily, fontSize } from './theme.base';
import { lightColors } from './light';
import { darkColors } from './dark';

const themes: Record<ThemeMode, AppTheme> = {
  light: {
    mode: 'light',
    colors: lightColors,
    spacing: sharedSpacing,
    radius: sharedRadius,
    fontFamily,
    fontSize,
  },
  dark: {
    mode: 'dark',
    colors: darkColors,
    spacing: sharedSpacing,
    radius: sharedRadius,
    fontFamily,
    fontSize,
  },
};

export function getAppTheme(mode: ColorSchemeName): AppTheme {
  return themes[mode === 'dark' ? 'dark' : 'light'];
}

export function useAppTheme(): AppTheme {
  return getAppTheme(useColorScheme()); // el useColorScheme devuelve el tema del celular
}

// Helper para retornar un hook con el tema y estilos ya creados
export function createThemedStyles<T>(styleCreator: (theme: AppTheme) => T) {
  // cached se crea una vez y se mantiene en memoria gracias al closure
  const cached = {
    light: styleCreator(getAppTheme('light')),
    dark: styleCreator(getAppTheme('dark')),
  };

  return () => {
    const theme = useAppTheme();
    return { theme, styles: cached[theme.mode] as T };
  };
}

export type { AppTheme, ThemeMode, ThemeColors, ThemeSpacing, ThemeRadius } from './theme.base';

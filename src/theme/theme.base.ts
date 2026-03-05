// Este archivo contiene los tipos, interfaces y valores compartidos del tema

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  white: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface AppTheme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
}

// Regla del 4 para los spaciados: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
export const sharedSpacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
};

export const sharedRadius: ThemeRadius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 28,
  full: 999,
};

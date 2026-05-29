import { StyleSheet } from 'react-native';
import { getWelcomeBrandStyleObjects } from '@/src/components/auth/welcomeBrand.styles';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createWelcomeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    ...getWelcomeBrandStyleObjects(theme),
    subtitle: {
      marginTop: theme.spacing.sm,
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    cta: {
      width: '100%',
      maxWidth: 320,
      marginTop: theme.spacing.xl,
      alignItems: 'center',
    },
    hint: {
      marginTop: theme.spacing.md,
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.caption,
      color: theme.colors.textMuted,
      textAlign: 'center',
      lineHeight: 16,
    },
  });

export const useWelcomeTheme = createThemedStyles(createWelcomeStyles);

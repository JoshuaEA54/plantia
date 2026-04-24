import { Dimensions, StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const HERO_HEIGHT = 280;
const ERROR_COLOR = '#d32f2f';

const createRegisterStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    keyboardAvoid: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    scrollContent: {
      flexGrow: 1,
    },
    hero: {
      minHeight: HERO_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.38)',
    },
    heroContent: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xxl,
    },
    logoIcon: {
      marginBottom: theme.spacing.md,
    },
    appName: {
      fontFamily: theme.fontFamily.extraBold,
      fontSize: theme.fontSize.display,
      color: theme.colors.white,
    },
    appSubtitle: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.body,
      color: 'rgba(255,255,255,0.75)',
      marginTop: theme.spacing.xs,
    },
    formSheet: {
      flex: 1,
      minHeight: SCREEN_HEIGHT - HERO_HEIGHT,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl,
    },
    sectionTitle: {
      fontFamily: theme.fontFamily.extraBold,
      fontSize: theme.fontSize.title,
      color: theme.colors.textPrimary,
    },
    sectionSubtitle: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.body,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
      marginBottom: theme.spacing.lg,
    },
    fieldWrapper: {
      marginBottom: theme.spacing.lg,
    },
    fieldLabel: {
      fontFamily: theme.fontFamily.semiBold,
      fontSize: theme.fontSize.bodySmall,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.xs,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing.md,
      height: 48,
    },
    inputRowNormal: {
      borderColor: theme.colors.border,
    },
    inputRowError: {
      borderColor: ERROR_COLOR,
    },
    inputIcon: {
      marginRight: theme.spacing.sm,
    },
    input: {
      flex: 1,
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.body,
      color: theme.colors.textPrimary,
    },
    eyeButton: {
      padding: theme.spacing.xs,
    },
    errorText: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.caption,
      color: ERROR_COLOR,
      marginTop: theme.spacing.xs,
    },
    termsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: theme.radius.sm,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 1,
    },
    checkboxUnchecked: {
      borderColor: theme.colors.textMuted,
      backgroundColor: 'transparent',
    },
    checkboxChecked: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    termsText: {
      flex: 1,
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.bodySmall,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    termsLink: {
      fontFamily: theme.fontFamily.semiBold,
      color: theme.colors.primary,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.full,
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.xl,
    },
    submitButtonText: {
      fontFamily: theme.fontFamily.bold,
      fontSize: theme.fontSize.body,
      color: theme.colors.white,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.bodySmall,
      color: theme.colors.textMuted,
    },
  });
};

export const useRegisterTheme = createThemedStyles(createRegisterStyle);

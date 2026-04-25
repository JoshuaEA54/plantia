import { StyleSheet } from 'react-native';
import type { AppTheme } from '@/src/theme/desingSystem';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      paddingTop: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    handle: {
      alignSelf: 'center',
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginBottom: theme.spacing.xs,
    },
    centeredPanel: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
      gap: theme.spacing.sm,
    },
    panelTitle: {
      fontFamily: theme.fontFamily.bold,
      fontSize: theme.fontSize.title,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    panelSubtitle: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    panelError: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.body,
      color: theme.colors.error,
      textAlign: 'center',
    },
    cardsScrollContent: {
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    cardWrapper: {
      borderRadius: 14,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    cardWrapperSelected: {
      borderColor: theme.colors.primary,
    },
    checkmarkBadge: {
      position: 'absolute',
      top: 6,
      right: 6,
      backgroundColor: theme.colors.white,
      borderRadius: 11,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    buttonOutlineFull: {
      alignSelf: 'stretch',
      paddingVertical: 12,
      borderRadius: theme.radius.md,
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },
    buttonOutline: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: theme.radius.md,
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      alignItems: 'center',
    },
    buttonOutlineText: {
      fontFamily: theme.fontFamily.semiBold,
      fontSize: theme.fontSize.body,
      color: theme.colors.primary,
    },
    buttonPrimary: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
    },
    buttonPrimaryText: {
      fontFamily: theme.fontFamily.semiBold,
      fontSize: theme.fontSize.body,
      color: theme.colors.white,
    },
  });

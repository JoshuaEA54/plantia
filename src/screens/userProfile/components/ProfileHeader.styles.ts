import { StyleSheet } from 'react-native';
import { AppTheme, createThemedStyles } from '@/src/theme/desingSystem';

const createProfileHeaderStyle = (theme: AppTheme) => {
  return StyleSheet.create({
    header: {
      backgroundColor: theme.colors.primary,
      paddingBottom: theme.spacing.xxl,
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
    },
    settingsButton: {
      position: 'absolute',
      top: 52,
      right: theme.spacing.lg,
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarWrapper: {
      marginTop: 48,
      marginBottom: theme.spacing.md,
      width: 84,
      height: 84,
    },
    avatarBorder: {
      width: 84,
      height: 84,
      borderRadius: 42,
      borderWidth: 2,
      borderColor: theme.colors.white,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
      elevation: 8,
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: 40,
    },
    editAvatarButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 26,
      height: 26,
      borderRadius: 11,
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    userName: {
      fontSize: theme.fontSize.display,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.white,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
    },
    userHandle: {
      fontSize: theme.fontSize.body,
      fontFamily: theme.fontFamily.medium,
      color: theme.colors.primaryLight,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    userBio: {
      fontSize: theme.fontSize.bodySmall,
      fontFamily: theme.fontFamily.regular,
      color: 'rgba(255,255,255,0.82)',
      textAlign: 'center',
      lineHeight: 19,
      maxWidth: 254,
      marginBottom: theme.spacing.md,
    },
    birthdateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    birthdateText: {
      fontSize: theme.fontSize.label,
      fontFamily: theme.fontFamily.regular,
      color: 'rgba(255,255,255,0.7)',
    },
  });
};

export const useProfileHeaderTheme = createThemedStyles(createProfileHeaderStyle);

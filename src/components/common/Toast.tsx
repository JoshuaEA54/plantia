import React, { useEffect } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/src/theme/desingSystem';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

const ICON: Record<ToastType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  warning: 'warning',
};

// success y warning: auto-cierre a los 5 segundos
// error: sin auto-cierre, requiere acción manual
const AUTO_DISMISS_MS: Record<ToastType, number | null> = {
  success: 5000,
  warning: 5000,
  error: null,
};

export function Toast({ visible, message, type, onDismiss }: ToastProps) {
  const theme = useAppTheme();
  const { colors, fontFamily, fontSize } = theme;
  const opacity = React.useRef(new Animated.Value(0)).current;

  const BG: Record<ToastType, string> = {
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
  };

  useEffect(() => {
    if (!visible) return;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    const duration = AUTO_DISMISS_MS[type];
    if (duration === null) return; // error: espera acción manual

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(onDismiss);
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, type]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 90,
        left: 16,
        right: 16,
        backgroundColor: BG[type],
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        opacity,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    >
      <Ionicons name={ICON[type]} size={20} color="#fff" style={{ marginRight: 10 }} />
      <Text
        style={{
          flex: 1,
          fontFamily: fontFamily.medium,
          color: '#fff',
          fontSize: fontSize.body,
        }}
      >
        {message}
      </Text>
      <TouchableOpacity onPress={onDismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="close" size={18} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

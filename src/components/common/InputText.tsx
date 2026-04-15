import React from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Control, Controller, FieldValues, Path, FieldError } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/src/theme/desingSystem';

interface InputTextProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  error?: FieldError;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
}

export function InputText<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  icon,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  multiline,
  numberOfLines,
  editable = true,
}: InputTextProps<T>) {
  const theme = useAppTheme();
  const { colors, fontFamily, fontSize } = theme;
  const [showPassword, setShowPassword] = React.useState(false);
  const isSecure = secureTextEntry && !showPassword;

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontFamily: fontFamily.medium,
          color: colors.textPrimary,
          marginBottom: 6,
          fontSize: fontSize.body,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: error ? colors.error : colors.border,
          borderRadius: 12,
          paddingHorizontal: 12,
          backgroundColor: editable ? colors.inputBackground : colors.disabled,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={error ? colors.error : colors.textSecondary}
            style={{ marginRight: 8 }}
          />
        )}
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={{
                flex: 1,
                fontFamily: fontFamily.regular,
                color: colors.textPrimary,
                paddingVertical: 12,
                fontSize: fontSize.body,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={colors.textMuted}
              secureTextEntry={isSecure}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              multiline={multiline}
              numberOfLines={numberOfLines}
              editable={editable}
            />
          )}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={{
            fontFamily: fontFamily.regular,
            color: colors.error,
            fontSize: fontSize.bodySmall,
            marginTop: 4,
          }}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}

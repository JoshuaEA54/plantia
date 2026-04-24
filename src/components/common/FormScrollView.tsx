import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps } from 'react-native';

type Props = PropsWithChildren<ScrollViewProps>;

export function FormScrollView({ children, ...scrollProps }: Props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView keyboardShouldPersistTaps="handled" {...scrollProps}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

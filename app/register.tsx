import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRegisterTheme } from '@/src/screens/register/Register.styles';
import { useAuth } from '@/src/hooks/useAuth';
import GoogleSignInButton from '@/src/components/common/GoogleSignInButton';

export default function RegisterRoute() {
  const { theme, styles } = useRegisterTheme();
  const router = useRouter();
  const { authGoogle, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const passwordsMatch =
    confirmPassword === '' || password === confirmPassword;

  const eyeColor = (visible: boolean) =>
    visible ? theme.colors.primary : theme.colors.textMuted;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        bounces={false}
      >
        {/* Hero */}
        <ImageBackground
          source={require('@/assets/images/background_register.jpg')}
          style={styles.hero}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Ionicons name="leaf" size={36} color="white" style={styles.logoIcon} />
            <Text style={styles.appName}>Plantia</Text>
            <Text style={styles.appSubtitle}>Tu diario botánico personal.</Text>
          </View>
        </ImageBackground>

        {/* Form sheet */}
        <View style={styles.formSheet}>
          <Text style={styles.sectionTitle}>Crear cuenta</Text>
          <Text style={styles.sectionSubtitle}>Únete a la comunidad Plantia.</Text>

          {/* Nombre completo */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Nombre completo</Text>
            <View style={[styles.inputRow, styles.inputRowNormal]}>
              <Ionicons
                name="person-outline"
                size={18}
                color={theme.colors.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Sofía Martínez"
                placeholderTextColor={theme.colors.textMuted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Correo electrónico */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Correo electrónico</Text>
            <View style={[styles.inputRow, styles.inputRowNormal]}>
              <Ionicons
                name="mail-outline"
                size={18}
                color={theme.colors.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                placeholderTextColor={theme.colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Contraseña */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Contraseña</Text>
            <View style={[styles.inputRow, styles.inputRowNormal]}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={theme.colors.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor={theme.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="next"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((v) => !v)}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color={eyeColor(showPassword)}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmar contraseña */}
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Confirmar contraseña</Text>
            <View
              style={[
                styles.inputRow,
                passwordsMatch ? styles.inputRowNormal : styles.inputRowError,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={passwordsMatch ? theme.colors.textMuted : '#d32f2f'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Repite tu contraseña"
                placeholderTextColor={theme.colors.textMuted}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword((v) => !v)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color={passwordsMatch ? eyeColor(showConfirmPassword) : '#d32f2f'}
                />
              </TouchableOpacity>
            </View>
            {!passwordsMatch && (
              <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
            )}
          </View>

          {/* Términos y condiciones */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAcceptedTerms((v) => !v)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                acceptedTerms ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
              {acceptedTerms && (
                <Ionicons name="checkmark" size={13} color={theme.colors.white} />
              )}
            </View>
            <Text style={styles.termsText}>
              Acepto los{' '}
              <Text style={styles.termsLink}>Términos de servicio</Text>
              {' '}y la{' '}
              <Text style={styles.termsLink}>Política de privacidad</Text>
            </Text>
          </TouchableOpacity>

          {/* Botón */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.submitButtonText}>Crear mi cuenta</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google */}
          <GoogleSignInButton onPress={authGoogle} disabled={isLoading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FormScrollView } from "@/src/components/common/FormScrollView";
import { useRouter } from "expo-router";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema, EditUserForm } from "@/src/schemas/editProfile.schema";
import { InputText } from "@/src/components/common/InputText";
import { Toast } from "@/src/components/common/Toast";
import { useToast } from "@/src/hooks/useToast";
import { updateUserProfile } from "@/src/services/userProfile.service";
import { useAppTheme } from "@/src/theme/desingSystem";
import { ApiUser } from "@/src/types-dtos/user.types";

type Props = { user: ApiUser };

export default function EditProfileScreen({ user }: Props) {
  const router = useRouter();
  const theme = useAppTheme();
  const { colors, fontFamily, fontSize } = theme;
  const { toast, show, hide } = useToast();
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: user.fullName,
      username: user.username,
      bio: user.bio ?? "",
      birthdate: user.birthdate ?? "",
    },
  });

  const onSubmit = async (data: EditUserForm) => {
    setLoading(true);
    try {
      await updateUserProfile(user.id, data);
      show("Perfil actualizado correctamente", "success");
      setTimeout(() => router.back(), 1500);
    } catch {
      show("Error al actualizar el perfil. Intenta de nuevo.", "error");
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (formErrors: FieldErrors<EditUserForm>) => {
    if (formErrors.fullName) {
      show("Revisa el nombre completo.", "error");
      return;
    }
    if (formErrors.username) {
      show("Revisa el nombre de usuario.", "error");
      return;
    }
    if (formErrors.bio) {
      show("Revisa la biografia.", "error");
      return;
    }
    if (formErrors.birthdate) {
      show("Revisa la fecha de nacimiento.", "error");
      return;
    }
    show(
      "Hay errores en el formulario. Corrigelos e intenta de nuevo.",
      "error",
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FormScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        <Text
          style={{
            fontFamily: fontFamily.regular,
            fontSize: fontSize.body,
            color: colors.textSecondary,
            marginBottom: 24,
          }}
        >
          Los cambios se guardarán en tu cuenta.
        </Text>

        <InputText
          control={control}
          name="fullName"
          label="Nombre completo"
          icon="person-outline"
          error={errors.fullName}
          placeholder="Tu nombre"
          autoCapitalize="words"
        />

        <InputText
          control={control}
          name="username"
          label="Usuario"
          icon="at-outline"
          error={errors.username}
          placeholder="tu_usuario"
          autoCapitalize="none"
        />

        <InputText
          control={control}
          name="bio"
          label="Biografía"
          icon="chatbubble-outline"
          error={errors.bio}
          placeholder="Cuéntanos algo sobre ti..."
          multiline
          numberOfLines={3}
        />

        <InputText
          control={control}
          name="birthdate"
          label="Fecha de nacimiento"
          icon="calendar-outline"
          error={errors.birthdate}
          placeholder="YYYY-MM-DD"
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit, onInvalid)}
          disabled={loading}
          style={{
            backgroundColor: loading ? colors.disabled : colors.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 8,
          }}
          activeOpacity={0.85}
        >
          <Text
            style={{
              fontFamily: fontFamily.bold,
              color: "#fff",
              fontSize: fontSize.body,
            }}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Text>
        </TouchableOpacity>
      </FormScrollView>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onDismiss={hide}
      />
    </View>
  );
}

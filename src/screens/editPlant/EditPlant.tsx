import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FormScrollView } from '@/src/components/common/FormScrollView';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editPlantSchema, EditPlantForm } from '@/src/schemas/editProfile.schema';
import { InputText } from '@/src/components/common/InputText';
import { Toast } from '@/src/components/common/Toast';
import { useToast } from '@/src/hooks/useToast';
import { updatePlant } from '@/src/services/userProfile.service';
import { useAppTheme } from '@/src/theme/desingSystem';
import { ApiPlant } from '@/src/types-dtos/user.types';

type Props = { plant: ApiPlant };

export default function EditPlantScreen({ plant }: Props) {
  const router = useRouter();
  const theme = useAppTheme();
  const { colors, fontFamily, fontSize } = theme;
  const { toast, show, hide } = useToast();
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPlantForm>({
    resolver: zodResolver(editPlantSchema),
    defaultValues: {
      name: plant.name,
      family: plant.family,
      habitat: plant.habitat,
      description: plant.description ?? '',
    },
  });

  const onSubmit = async (data: EditPlantForm) => {
    setLoading(true);
    try {
      await updatePlant(plant.id, data);
      show('Planta actualizada correctamente', 'success');
      setTimeout(() => router.back(), 1500);
    } catch {
      show('Error al actualizar la planta. Intenta de nuevo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FormScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <Text
            style={{
              fontFamily: fontFamily.bold,
              fontSize: fontSize.display,
              color: colors.textPrimary,
              marginBottom: 8,
            }}
          >
            Editar Planta
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.regular,
              fontSize: fontSize.body,
              color: colors.textSecondary,
              marginBottom: 24,
            }}
          >
            Los cambios se guardarán en el catálogo.
          </Text>

          <InputText
            control={control}
            name="name"
            label="Nombre"
            icon="leaf-outline"
            error={errors.name}
            placeholder="Nombre de la planta"
            autoCapitalize="sentences"
          />

          <InputText
            control={control}
            name="family"
            label="Familia botánica"
            icon="git-branch-outline"
            error={errors.family}
            placeholder="Ej: Rosaceae"
            autoCapitalize="sentences"
          />

          <InputText
            control={control}
            name="habitat"
            label="Hábitat"
            icon="earth-outline"
            error={errors.habitat}
            placeholder="Ej: Bosques tropicales"
            autoCapitalize="sentences"
          />

          <InputText
            control={control}
            name="description"
            label="Descripción"
            icon="document-text-outline"
            error={errors.description}
            placeholder="Descripción de la planta..."
            multiline
            numberOfLines={4}
            autoCapitalize="sentences"
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.disabled : colors.primary,
              padding: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginTop: 8,
            }}
            activeOpacity={0.85}
          >
            <Text style={{ fontFamily: fontFamily.bold, color: '#fff', fontSize: fontSize.body }}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Text>
          </TouchableOpacity>
      </FormScrollView>

      <Toast visible={toast.visible} message={toast.message} type={toast.type} onDismiss={hide} />
    </View>
  );
}

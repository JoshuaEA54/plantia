import { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/src/theme/desingSystem';
import { createStyles } from './IdentificationBottomSheet.styles';
import PlantCard from '@/src/screens/userProfile/components/PlantCard';
import type { IdentificationState } from '@/src/hooks/usePlantIdentification';
import type { PlantSuggestion } from '@/src/types-dtos/plantnet.types';

// Kept for backward-compat with CameraScreen ref (no longer needed but avoids breaking import)
export interface IdentificationBottomSheetRef {
  open: () => void;
}

type Props = {
  identificationState: IdentificationState;
  onRetake: () => void;
  onSave: (suggestion: PlantSuggestion) => void;
};

export default function IdentificationBottomSheet({ identificationState, onRetake, onSave }: Props) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (identificationState?.status === 'success') {
      setSelectedIndex(0);
    }
  }, [identificationState?.status]);

  const handleSave = useCallback(() => {
    if (identificationState?.status !== 'success') return;
    onSave(identificationState.data.results[selectedIndex]);
  }, [identificationState, selectedIndex, onSave]);

  return (
    <Modal
      visible={identificationState !== null}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onRetake}
    >
      <View style={styles.overlay}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.handle} />

          {identificationState?.status === 'loading' && (
            <View style={styles.centeredPanel}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.panelTitle}>Identificando planta...</Text>
              <Text style={styles.panelSubtitle}>Analizando la imagen, un momento</Text>
            </View>
          )}

          {identificationState?.status === 'error' && (
            <View style={styles.centeredPanel}>
              <Ionicons name="alert-circle" size={52} color={theme.colors.error} />
              <Text style={styles.panelTitle}>No se pudo identificar</Text>
              <Text style={styles.panelError}>{identificationState.message}</Text>
              <TouchableOpacity style={styles.buttonOutlineFull} onPress={onRetake} activeOpacity={0.7}>
                <Text style={styles.buttonOutlineText}>Volver a la cámara</Text>
              </TouchableOpacity>
            </View>
          )}

          {identificationState?.status === 'success' && (
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsScrollContent}
              >
                {identificationState.data.results.map((suggestion, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedIndex(index)}
                      activeOpacity={0.85}
                      style={[styles.cardWrapper, isSelected && styles.cardWrapperSelected]}
                    >
                      <PlantCard
                        id={String(index)}
                        name={suggestion.commonName ?? suggestion.scientificName}
                        status={`${suggestion.confidence}% coincidencia`}
                        image={suggestion.imageUrl ?? ''}
                      />
                      {isSelected && (
                        <View style={styles.checkmarkBadge}>
                          <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.buttonOutline} onPress={onRetake} activeOpacity={0.7}>
                  <Text style={styles.buttonOutlineText}>Volver a tomar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave} activeOpacity={0.7}>
                  <Text style={styles.buttonPrimaryText}>Guardar planta</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

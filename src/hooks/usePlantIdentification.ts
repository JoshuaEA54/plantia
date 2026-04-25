import { useState, useCallback } from 'react';
import { identifyPlantPhoto } from '@/src/services/plantnet.service';
import type { IdentifyResponse } from '@/src/types-dtos/plantnet.types';
import type { AsyncState } from '@/src/types-dtos/async-state';

export type IdentificationState = AsyncState<{ data: IdentifyResponse }> | null;

export function usePlantIdentification() {
  const [identificationState, setIdentificationState] = useState<IdentificationState>(null);

  const identify = useCallback(async (photoUri: string) => {
    setIdentificationState({ status: 'loading' });
    try {
      const data = await identifyPlantPhoto(photoUri);
      setIdentificationState({ status: 'success', data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo identificar la planta';
      setIdentificationState({ status: 'error', message });
    }
  }, []);

  const reset = useCallback(() => setIdentificationState(null), []);

  return { identificationState, identify, reset };
}

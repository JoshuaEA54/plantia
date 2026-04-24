import { z } from 'zod';

export const editUserSchema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(60, 'El nombre no puede superar los 60 caracteres'),
  username: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(30, 'El usuario no puede superar los 30 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guion bajo'),
  bio: z.string().max(160, 'La biografía no puede superar los 160 caracteres').optional(),
  birthdate: z
    .string()
    .refine(
      (val) => {
        if (val === '') return true;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return false;
        const date = new Date(val + 'T00:00:00');
        return !isNaN(date.getTime());
      },
      'Ingresa una fecha válida en formato YYYY-MM-DD',
    )
    .optional(),
});

export const editPlantSchema = z.object({
  name: z.string().min(2, 'El nombre de la planta es requerido'),
  family: z.string().min(2, 'La familia botánica es requerida'),
  habitat: z.string().min(2, 'El hábitat es requerido'),
  description: z.string().max(500, 'La descripción no puede superar los 500 caracteres').optional(),
});

export type EditUserForm = z.infer<typeof editUserSchema>;
export type EditPlantForm = z.infer<typeof editPlantSchema>;

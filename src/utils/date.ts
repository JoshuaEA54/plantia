/**
 * Formatea una fecha ISO (YYYY-MM-DD) al formato legible en español.
 * Usa timeZone: 'UTC' para evitar desfase de día por zona horaria.
 * Ej: "1997-03-12" → "12 de marzo de 1997"
 */
export function formatBirthdate(isoDate: string | undefined | null): string {
  if (!isoDate) return '';
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

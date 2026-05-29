function parseHexChannel(hex: string, start: number): number {
  return parseInt(hex.slice(start, start + 2), 16) / 255;
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const transform = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function parseColor(color: string): { r: number; g: number; b: number } | null {
  const hex = color.trim();

  if (hex.startsWith('#')) {
    if (hex.length === 4) {
      return {
        r: parseHexChannel(hex + hex.slice(1), 1),
        g: parseHexChannel(hex + hex.slice(2), 2),
        b: parseHexChannel(hex + hex.slice(3), 3),
      };
    }

    if (hex.length === 7) {
      return {
        r: parseHexChannel(hex, 1),
        g: parseHexChannel(hex, 3),
        b: parseHexChannel(hex, 5),
      };
    }
  }

  const rgbMatch = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]) / 255,
      g: Number(rgbMatch[2]) / 255,
      b: Number(rgbMatch[3]) / 255,
    };
  }

  return null;
}

/** Iconos oscuros sobre fondo claro; iconos claros sobre fondo oscuro. */
export function getStatusBarStyleForBackground(backgroundColor: string): 'light' | 'dark' {
  const rgb = parseColor(backgroundColor);
  if (!rgb) return 'dark';

  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.5 ? 'dark' : 'light';
}

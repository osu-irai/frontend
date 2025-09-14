export const STAR_RATING_SPECTRUM: Record<number, string> = {
  0.1: "#91d7e3",
  1.2: "#7dc4e4",
  2.0: "#8bd5ca",
  2.5: "#a6da95",
  3.3: "#f5a97f",
  4.2: "#ee99a0",
  4.9: "#ed8796",
  5.8: "#c6a0f6",
  6.7: "#8aadf4",
  7.7: "#b7bdf8",
  9.0: "#939ab7",
  10.0: "#cad3f5",
};

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return [
    parseInt(result[1]!, 16),
    parseInt(result[2]!, 16),
    parseInt(result[3]!, 16),
  ];
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}
export function getColor(value: number): string {
  const clamp = Math.max(0.0, Math.min(10.0, value));

  const stops = Object.keys(STAR_RATING_SPECTRUM).map(parseFloat)
    .sort((a, b) => a - b);

  if (clamp < stops[0]) {
    return STAR_RATING_SPECTRUM[stops[0]];
  }
  if (clamp > stops[11]) {
    return STAR_RATING_SPECTRUM[stops[11]];
  }

  let lowerStop = stops[0];
  let upperStop = stops[11];
  for (let i = 0; i < stops.length - 1; i++) {
    if (clamp >= stops[i] && clamp <= stops[i + 1]) {
      lowerStop = stops[i];
      upperStop = stops[i + 1];
      break;
    }
  }
  const factor = (clamp - lowerStop) / (upperStop - lowerStop);
  const res = interp(
    STAR_RATING_SPECTRUM[lowerStop],
    STAR_RATING_SPECTRUM[upperStop],
    factor,
  );
  return res;
}
function interp(color1: string, color2: string, factor: number): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const r = r1 + ((r2 - r1) * factor);
  const g = g1 + ((g2 - g1) * factor);
  const b = b1 + ((b2 - b1) * factor);

  return rgbToHex(r, g, b);
}

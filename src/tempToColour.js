// utils/tempToColour.js (or inside the component – up to you)
export function tempToHsl(temp) {
  /*
   * Choose a reasonable min/max band you expect to see.
   * -10 °C → deep blue (hue = 240)
   * 40 °C  → red (hue = 0)
   */
  const min = -10;
  const max = 40;

  // clamp to [min,max] then normalise 0-1
  const t     = Math.max(min, Math.min(max, temp));
  const ratio = (t - min) / (max - min);          // 0 (cold) … 1 (hot)

  // linear-interpolate hue 240 → 0
  const hue = 240 - 240 * ratio;                  // 240 (blue) … 0 (red)

  // use 65 % lightness so text remains readable
  return `hsl(${hue}, 70%, 65%)`;
}

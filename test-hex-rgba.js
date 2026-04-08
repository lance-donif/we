function blendColorRGBA(hex, whiteRatio, alpha = 0.99) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const f = 1 - whiteRatio;
  const rr = Math.round(r * f + 255 * whiteRatio);
  const gg = Math.round(g * f + 255 * whiteRatio);
  const bb = Math.round(b * f + 255 * whiteRatio);
  return `rgba(${rr}, ${gg}, ${bb}, ${alpha})`;
}
console.log(blendColorRGBA('#ececec', 0.18));

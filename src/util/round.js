/**
 * This changes the numbers so that there are never more than three decimals shown.
 * @param n
 */
const roundToMaxThreeDecimals = (n) => {
  if (!n) return 0;

  const e = Math.min(2, Math.log10(n));
  const g = 2 - e;
  const f = Math.min(1000, Math.pow(10, Math.ceil(g)));
  return Math.round(n * f) / f;
};

export default roundToMaxThreeDecimals;

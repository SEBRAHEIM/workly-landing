export function moneyToCents(v) {
  const n = Number(String(v || "").replace(/[^\d.]/g, ""));
  if (!isFinite(n) || n <= 0) return null;
  return Math.round(n * 100);
}

export function centsToMoney(cents) {
  const n = Number(cents || 0);
  if (!isFinite(n)) return "0.00";
  return (n / 100).toFixed(2);
}

export const formatPKR = (amountPKR: number) => {
  const value = Number.isFinite(amountPKR) ? amountPKR : 0;
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (n: number) => {
  const value = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("en-PK").format(value);
};

export const formatCompact = (n: number) => {
  const value = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("en-PK", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

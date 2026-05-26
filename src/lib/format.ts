export const ghcFormat = (n: number) =>
  `GH₵ ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// PDF fonts don't support the ₵ symbol; use plain ASCII GHC instead
export const ghcFormatPDF = (n: number) =>
  `GHC ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export interface TaxResults {
  gross: number;
  ssnit: number;
  tier2: number;
  taxable: number;
  incomeTax: number;
  netIncome: number;
  breakdown: { label: string; amount: number }[];
}

const GHANA_TAX_BANDS = [
  { range: 494, rate: 0 },
  { range: 110, rate: 0.05 },
  { range: 130, rate: 0.10 },
  { range: 3167, rate: 0.175 },
  { range: 356, rate: 0.25 },
  { range: Infinity, rate: 0.30 },
];

export const calcGhanaTax = (basic: number, allowances: number, relief: number): TaxResults => {
  const gross = basic + allowances;
  const ssnit = +(gross * 0.055).toFixed(2);
  const tier2 = +(gross * 0.05).toFixed(2);

  let taxable = Math.max(0, gross - ssnit - relief);

  let remaining = taxable;
  let incomeTax = 0;
  const breakdown: { label: string; amount: number }[] = [];

  for (const band of GHANA_TAX_BANDS) {
    if (remaining <= 0) break;
    const amt = Math.min(remaining, band.range);
    // Use integer display when rate is whole (5% not 5.0%)
    const label = `${+(band.rate * 100)}% band`;
    breakdown.push({ label, amount: amt });
    incomeTax += amt * band.rate;
    remaining -= amt;
  }

  incomeTax = +incomeTax.toFixed(2);
  const netIncome = +(gross - ssnit - incomeTax).toFixed(2);

  return { gross, ssnit, tier2, taxable, incomeTax, netIncome, breakdown };
};

// 2026 US federal tax brackets (projected, inflation-adjusted)
export const US_TAX_BRACKETS = {
  single: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  married: [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  head: [
    { limit: 16550, rate: 0.10 },
    { limit: 63100, rate: 0.12 },
    { limit: 100500, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243700, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
} as const;

export const US_STANDARD_DEDUCTIONS: Record<keyof typeof US_TAX_BRACKETS, number> = {
  single: 14600,
  married: 29200,
  head: 21900,
};

export interface USTaxResults {
  taxableIncome: number;
  federalTax: number;
  effectiveRate: number;
  refund: number;
  takeHome: number;
}

export const calcUSTax = (
  grossIncome: number,
  filingStatus: keyof typeof US_TAX_BRACKETS,
  deductionType: string,
  itemizedAmount: number,
  numDependents: number
): USTaxResults => {
  if (grossIncome === 0) {
    return { taxableIncome: 0, federalTax: 0, effectiveRate: 0, refund: 0, takeHome: 0 };
  }

  const stdDeduction = US_STANDARD_DEDUCTIONS[filingStatus];
  const deductionAmount = deductionType === "standard" ? stdDeduction : itemizedAmount;
  const taxableIncome = Math.max(0, grossIncome - deductionAmount);

  const brackets = US_TAX_BRACKETS[filingStatus];
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= previousLimit) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
    tax += taxableInBracket * bracket.rate;
    previousLimit = bracket.limit;
  }

  const childTaxCredit = numDependents * 2000;
  const taxAfterCredits = Math.max(0, tax - childTaxCredit);
  const estimatedWithholding = grossIncome * 0.15;
  const refund = estimatedWithholding - taxAfterCredits;
  const effectiveRate = (taxAfterCredits / grossIncome) * 100;
  const takeHome = grossIncome - taxAfterCredits;

  return { taxableIncome, federalTax: taxAfterCredits, effectiveRate, refund, takeHome };
};

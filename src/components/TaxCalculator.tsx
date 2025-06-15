
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TaxBreakdown from "./TaxBreakdown";
import NetIncomeResult from "./NetIncomeResult";

interface TaxResults {
  gross: number;
  ssnit: number;
  taxable: number;
  incomeTax: number;
  netIncome: number;
  breakdown: { label: string; amount: number; }[];
}

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const calcTax = (basic: number, allowances: number, relief: number): TaxResults => {
  // SSNIT: 5.5% of gross income
  const gross = basic + allowances;
  const ssnit = +(gross * 0.055).toFixed(2);

  // Taxable income after SSNIT deduction
  let taxable = gross - ssnit - relief;
  if (taxable < 0) taxable = 0;

  // Ghana PAYE rates as of 2024 (monthly):
  // 0 - 494: 0% | 495 - 656: 5% | 657 - 3,826: 10% | 3,827 - 5,898: 17.5% | 5,899 - 9,285: 25% | 9,286+: 30%
  const bands = [
    { limit: 494, rate: 0 },
    { limit: 656, rate: 0.05 },
    { limit: 3826, rate: 0.1 },
    { limit: 5898, rate: 0.175 },
    { limit: 9285, rate: 0.25 },
    { limit: Infinity, rate: 0.3 },
  ];
  const bandRanges = [494, 162, 3170, 2072, 3387]; // Amount in each band (except last)
  let remaining = taxable, taxed = 0, incomeTax = 0;
  const breakdown: { label: string; amount: number }[] = [];

  // Apply first band (0%)
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[0]);
    breakdown.push({ label: "0% band", amount: amt });
    remaining -= amt;
    if (amt > 0) taxed += amt;
  }
  // Second band (5%)
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[1]);
    incomeTax += amt * 0.05;
    breakdown.push({ label: "5% band", amount: amt });
    remaining -= amt;
  }
  // Third band (10%)
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[2]);
    incomeTax += amt * 0.1;
    breakdown.push({ label: "10% band", amount: amt });
    remaining -= amt;
  }
  // Fourth band (17.5%)
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[3]);
    incomeTax += amt * 0.175;
    breakdown.push({ label: "17.5% band", amount: amt });
    remaining -= amt;
  }
  // Fifth band (25%)
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[4]);
    incomeTax += amt * 0.25;
    breakdown.push({ label: "25% band", amount: amt });
    remaining -= amt;
  }
  // Sixth band (30%)
  if (remaining > 0) {
    incomeTax += remaining * 0.3;
    breakdown.push({ label: "30% band", amount: remaining });
  }

  incomeTax = +incomeTax.toFixed(2);
  const netIncome = gross - ssnit - incomeTax;

  return {
    gross,
    ssnit,
    taxable,
    incomeTax,
    netIncome,
    breakdown,
  };
};

const TaxCalculator = () => {
  const [basic, setBasic] = useState<number>(0);
  const [allowances, setAllowances] = useState<number>(0);
  const [relief, setRelief] = useState<number>(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const results = calcTax(basic, allowances, relief);

  return (
    <div className="w-full max-w-md bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-gray-800 text-center">Compute your net income, PAYE income tax and SSNIT deduction.</h2>
        <p className="text-gray-600 text-center text-sm">Enter your details to see your take-home income and deductions.</p>
      </div>
      <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">Monthly basic income</label>
          <div className="flex items-center">
            <span className="font-medium text-gray-500 mr-2">GH₵</span>
            <Input
              type="number"
              min={0}
              value={basic}
              onChange={e => setBasic(+e.target.value)}
              placeholder="0"
              className="text-base"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">
            Monthly allowances<span className="text-xs pl-1">*</span>
          </label>
          <div className="flex items-center">
            <span className="font-medium text-gray-500 mr-2">GH₵</span>
            <Input
              type="number"
              min={0}
              value={allowances}
              onChange={e => setAllowances(+e.target.value)}
              placeholder="0"
              className="text-base"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 font-medium">Tax relief</label>
          <div className="flex items-center">
            <span className="font-medium text-gray-500 mr-2">GH₵</span>
            <Input
              type="number"
              min={0}
              value={relief}
              onChange={e => setRelief(+e.target.value)}
              placeholder="0"
              className="text-base"
            />
          </div>
        </div>
      </form>
      <Separator />
      <NetIncomeResult
        netIncome={results.netIncome}
        incomeTax={results.incomeTax}
        ssnit={results.ssnit}
      />
      <div className="flex flex-col gap-2 items-center">
        <Button variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-50 transition" onClick={() => setShowBreakdown(true)}>
          Show tax breakdown
        </Button>
        <span className="text-xs text-muted-foreground mt-1">* Allowances are also taxed</span>
      </div>
      <TaxBreakdown
        open={showBreakdown}
        onOpenChange={setShowBreakdown}
        results={results}
      />
      <p className="text-xs text-center text-muted-foreground mt-6">
        We do our best to ensure the accuracy of this tool but we cannot be held responsible for any errors.
        <br />
        <span className="block mt-1 text-xs text-muted-foreground">business@kobydigital.com</span>
      </p>
    </div>
  );
};

export default TaxCalculator;

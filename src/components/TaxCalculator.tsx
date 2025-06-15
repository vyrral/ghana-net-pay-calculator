import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TaxBreakdown from "./TaxBreakdown";
import NetIncomeResult from "./NetIncomeResult";

interface TaxResults {
  gross: number;
  ssnit: number;
  tier2: number;
  taxable: number;
  incomeTax: number;
  netIncome: number;
  breakdown: { label: string; amount: number; }[];
}

const ghcFormat = (n: number) =>
  `GH₵ ${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// Only deduct SSNIT (Tier 1) from gross for PAYE
const calcTax = (basic: number, allowances: number, relief: number): TaxResults => {
  const gross = basic + allowances;
  const ssnit = +(gross * 0.055).toFixed(2);
  const tier2 = +(gross * 0.05).toFixed(2);

  // PAYE taxable income: gross - SSNIT - relief
  let taxable = gross - ssnit - relief;
  if (taxable < 0) taxable = 0;

  const bands = [
    { limit: 494, rate: 0 },
    { limit: 656, rate: 0.05 },
    { limit: 3826, rate: 0.1 },
    { limit: 5898, rate: 0.175 },
    { limit: 9285, rate: 0.25 },
    { limit: Infinity, rate: 0.3 },
  ];
  const bandRanges = [494, 162, 3170, 2072, 3387];
  let remaining = taxable, incomeTax = 0;
  const breakdown: { label: string; amount: number }[] = [];

  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[0]);
    breakdown.push({ label: "0% band", amount: amt });
    remaining -= amt;
  }
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[1]);
    incomeTax += amt * 0.05;
    breakdown.push({ label: "5% band", amount: amt });
    remaining -= amt;
  }
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[2]);
    incomeTax += amt * 0.1;
    breakdown.push({ label: "10% band", amount: amt });
    remaining -= amt;
  }
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[3]);
    incomeTax += amt * 0.175;
    breakdown.push({ label: "17.5% band", amount: amt });
    remaining -= amt;
  }
  if (remaining > 0) {
    const amt = Math.min(remaining, bandRanges[4]);
    incomeTax += amt * 0.25;
    breakdown.push({ label: "25% band", amount: amt });
    remaining -= amt;
  }
  if (remaining > 0) {
    incomeTax += remaining * 0.3;
    breakdown.push({ label: "30% band", amount: remaining });
  }

  incomeTax = +incomeTax.toFixed(2);
  // For net income, DO NOT deduct Tier 2 (for take-home), only SSNIT and income tax as per reference calculation
  const netIncome = +(gross - ssnit - incomeTax).toFixed(2);

  return {
    gross,
    ssnit,
    tier2,
    taxable,
    incomeTax,
    netIncome,
    breakdown,
  };
};

const TaxCalculator = () => {
  const [basic, setBasic] = useState<string>("");
  const [allowances, setAllowances] = useState<string>("");
  const [relief, setRelief] = useState<string>("");
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Convert input values to numbers; treat empty as 0
  const parsedBasic = basic === "" ? 0 : +basic;
  const parsedAllowances = allowances === "" ? 0 : +allowances;
  const parsedRelief = relief === "" ? 0 : +relief;

  const results = calcTax(parsedBasic, parsedAllowances, parsedRelief);

  return (
    <div className="w-full max-w-md bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-gray-800 text-center">Compute your net income, PAYE income tax and pension deductions with the Salary Calculator.</h2>
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
              onChange={e => setBasic(e.target.value)}
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
              onChange={e => setAllowances(e.target.value)}
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
              onChange={e => setRelief(e.target.value)}
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
        tier2={results.tier2}
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
        <span className="block mt-1 text-xs text-muted-foreground">Talk to us: business@kobydigital.com</span>
      </p>
    </div>
  );
};

export default TaxCalculator;

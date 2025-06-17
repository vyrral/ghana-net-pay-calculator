
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TaxBreakdown from "./TaxBreakdown";
import NetIncomeResult from "./NetIncomeResult";
import TaxVisualization from "./TaxVisualization";

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

// Correct Ghana PAYE: 494 at 0%, 110 at 5%, 130 at 10%, 3167 at 17.5%, 356 at 25%, rest at 30%
const calcTax = (basic: number, allowances: number, relief: number): TaxResults => {
  const gross = basic + allowances;
  const ssnit = +(gross * 0.055).toFixed(2);
  const tier2 = +(gross * 0.05).toFixed(2);

  // PAYE taxable income: gross - SSNIT - relief
  let taxable = gross - ssnit - relief;
  if (taxable < 0) taxable = 0;

  // Correct tax bands and ranges per 2024 Ghana tax
  const bands = [
    { range: 494, rate: 0 },
    { range: 110, rate: 0.05 },
    { range: 130, rate: 0.10 },
    { range: 3167, rate: 0.175 },
    { range: 356, rate: 0.25 },
    { range: Infinity, rate: 0.30 }
  ];

  let remaining = taxable, incomeTax = 0;
  const breakdown: { label: string; amount: number }[] = [];

  for (let i = 0; i < bands.length; ++i) {
    if (remaining <= 0) break;
    const amt = Math.min(remaining, bands[i].range);
    if (bands[i].rate === 0) {
      breakdown.push({ label: "0% band", amount: amt });
    } else {
      breakdown.push({ label: `${(bands[i].rate * 100).toFixed(1)}% band`, amount: amt });
      incomeTax += amt * bands[i].rate;
    }
    remaining -= amt;
  }

  incomeTax = +incomeTax.toFixed(2);
  // Net income: only SSNIT and income tax deducted, not Tier 2 (matches reference)
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
    <div className="w-full max-w-md bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6 mx-auto">
      <div>
        <h2 className="text-xl font-semibold mb-1 text-gray-800 text-center">Calculate Your Net Income and Tax Deductions</h2>
        <p className="text-gray-600 text-center text-sm">Enter your salary details to see your take-home income, PAYE tax, and SSNIT contributions.</p>
      </div>
      
      <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Salary Information</h3>
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

      <TaxVisualization results={results} />

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

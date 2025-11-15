import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const USTaxCalculator = () => {
  const [income, setIncome] = useState<string>("");
  const [filingStatus, setFilingStatus] = useState<string>("single");
  const [deductions, setDeductions] = useState<string>("standard");
  const [dependents, setDependents] = useState<string>("0");

  // 2026 Federal Tax Brackets (projected based on inflation adjustments)
  const taxBrackets = {
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
  };

  // Standard deductions for 2026 (projected)
  const standardDeduction = {
    single: 14600,
    married: 29200,
    head: 21900,
  };

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const numDependents = parseInt(dependents) || 0;
    
    if (grossIncome === 0) {
      return { taxableIncome: 0, federalTax: 0, effectiveRate: 0, refund: 0, takeHome: 0 };
    }

    // Get appropriate standard deduction
    const stdDeduction = standardDeduction[filingStatus as keyof typeof standardDeduction];
    
    // Child tax credit ($2000 per dependent)
    const childTaxCredit = numDependents * 2000;
    
    // Calculate taxable income
    const deductionAmount = deductions === "standard" ? stdDeduction : stdDeduction * 1.5; // Simplified itemized
    const taxableIncome = Math.max(0, grossIncome - deductionAmount);

    // Calculate federal tax using brackets
    const brackets = taxBrackets[filingStatus as keyof typeof taxBrackets];
    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (taxableIncome <= previousLimit) break;
      
      const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
      tax += taxableInBracket * bracket.rate;
      previousLimit = bracket.limit;
      
      if (taxableIncome <= bracket.limit) break;
    }

    // Apply tax credits
    const taxAfterCredits = Math.max(0, tax - childTaxCredit);
    
    // Estimate withholding (assume 15% was withheld)
    const estimatedWithholding = grossIncome * 0.15;
    
    // Calculate refund or amount owed
    const refund = estimatedWithholding - taxAfterCredits;
    
    const effectiveRate = (taxAfterCredits / grossIncome) * 100;
    const takeHome = grossIncome - taxAfterCredits;

    return {
      taxableIncome,
      federalTax: taxAfterCredits,
      effectiveRate,
      refund,
      takeHome,
    };
  };

  const results = calculateTax();
  const formatCurrency = (num: number) => `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            USA Tax Refund Calculator 2026 🇺🇸
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estimate your 2026 federal tax refund based on projected IRS tax brackets and standard deductions. 
            Calculate your take-home pay and potential refund instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Income & Filing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="income">Annual Gross Income ($)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="e.g., 75000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="filingStatus">Filing Status</Label>
                <Select value={filingStatus} onValueChange={setFilingStatus}>
                  <SelectTrigger id="filingStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married Filing Jointly</SelectItem>
                    <SelectItem value="head">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deductions">Deduction Type</Label>
                <Select value={deductions} onValueChange={setDeductions}>
                  <SelectTrigger id="deductions">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Deduction</SelectItem>
                    <SelectItem value="itemized">Itemized Deduction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dependents">Number of Dependents</Label>
                <Input
                  id="dependents"
                  type="number"
                  min="0"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
            <CardHeader>
              <CardTitle>Your 2026 Tax Estimate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="font-medium">Taxable Income:</span>
                <span className="font-bold">{formatCurrency(results.taxableIncome)}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="font-medium">Federal Tax:</span>
                <span className="font-bold">{formatCurrency(results.federalTax)}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="font-medium">Effective Tax Rate:</span>
                <span className="font-bold">{results.effectiveRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2 text-lg">
                <span className="font-semibold">Estimated Refund:</span>
                <span className={`font-bold ${results.refund > 0 ? "text-green-600" : "text-red-600"}`}>
                  {results.refund > 0 ? formatCurrency(results.refund) : formatCurrency(Math.abs(results.refund)) + " owed"}
                </span>
              </div>
              <div className="flex justify-between pt-2 text-xl">
                <span className="font-bold">Take-Home Pay:</span>
                <span className="font-bold text-green-600">{formatCurrency(results.takeHome)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Your 2026 US Tax Refund</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">2026 Federal Tax Brackets</h3>
              <p>
                The US federal tax system uses progressive tax brackets, meaning different portions of your income 
                are taxed at different rates. For 2026, the IRS tax brackets are projected to be adjusted for inflation, 
                with rates ranging from 10% to 37% depending on your income level and filing status.
              </p>

              <h3 className="text-lg font-semibold text-foreground">Standard Deduction 2026</h3>
              <ul className="list-disc pl-6">
                <li><strong>Single:</strong> $14,600</li>
                <li><strong>Married Filing Jointly:</strong> $29,200</li>
                <li><strong>Head of Household:</strong> $21,900</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground">Tax Credits</h3>
              <p>
                Tax credits directly reduce your tax liability. The Child Tax Credit provides up to $2,000 per 
                qualifying dependent child under age 17. Additional credits may include the Earned Income Tax Credit 
                (EITC), education credits, and more.
              </p>

              <h3 className="text-lg font-semibold text-foreground">Maximizing Your Refund</h3>
              <ul className="list-disc pl-6">
                <li>Contribute to retirement accounts (401k, IRA)</li>
                <li>Consider itemizing deductions if they exceed the standard deduction</li>
                <li>Claim all eligible tax credits</li>
                <li>Adjust your W-4 withholding for accuracy</li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
                <p className="text-sm font-semibold">
                  ⚠️ Disclaimer: This calculator provides estimates based on projected 2026 tax brackets. 
                  Actual tax amounts may vary. Consult with a qualified tax professional or use official IRS resources 
                  for precise calculations. Visit{" "}
                  <a href="https://www.irs.gov" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    IRS.gov
                  </a>{" "}
                  for official tax information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default USTaxCalculator;

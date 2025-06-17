
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const SSNITCalculator = () => {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [includeTier3, setIncludeTier3] = useState(false);
  const [tier3Percentage, setTier3Percentage] = useState<string>("5");

  const parsedSalary = grossSalary === "" ? 0 : +grossSalary;
  const parsedTier3 = tier3Percentage === "" ? 0 : +tier3Percentage;

  // SSNIT calculations
  const tier1Monthly = parsedSalary * 0.055; // 5.5% employee contribution
  const tier1EmployerMonthly = parsedSalary * 0.135; // 13.5% employer contribution
  const tier1TotalMonthly = tier1Monthly + tier1EmployerMonthly;

  const tier2Monthly = parsedSalary * 0.05; // 5% to approved pension scheme
  
  const tier3Monthly = includeTier3 ? (parsedSalary * (parsedTier3 / 100)) : 0; // Voluntary contribution

  // Yearly calculations
  const tier1Yearly = tier1TotalMonthly * 12;
  const tier2Yearly = tier2Monthly * 12;
  const tier3Yearly = tier3Monthly * 12;

  const totalContributionsMonthly = tier1TotalMonthly + tier2Monthly + tier3Monthly;
  const totalContributionsYearly = totalContributionsMonthly * 12;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">SSNIT Contributions Calculator</h2>
            <p className="text-gray-600 text-center text-sm">Calculate your pension contributions across all three tiers</p>
          </div>

          <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm mb-1 text-gray-700 font-medium">Monthly gross salary</label>
              <div className="flex items-center">
                <span className="font-medium text-gray-500 mr-2">GH₵</span>
                <Input
                  type="number"
                  min={0}
                  value={grossSalary}
                  onChange={e => setGrossSalary(e.target.value)}
                  placeholder="0"
                  className="text-base"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="tier3-toggle"
                checked={includeTier3}
                onCheckedChange={setIncludeTier3}
              />
              <label htmlFor="tier3-toggle" className="text-sm font-medium text-gray-700">
                Include Voluntary Tier 3 contributions
              </label>
            </div>

            {includeTier3 && (
              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">Tier 3 contribution percentage</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={tier3Percentage}
                    onChange={e => setTier3Percentage(e.target.value)}
                    placeholder="5"
                    className="text-base"
                  />
                  <span className="font-medium text-gray-500 ml-2">%</span>
                </div>
              </div>
            )}
          </form>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Contributions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">Monthly Contributions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tier 1 (Employee 5.5%)</span>
                  <span className="font-medium">{ghcFormat(tier1Monthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tier 1 (Employer 13.5%)</span>
                  <span className="font-medium">{ghcFormat(tier1EmployerMonthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tier 2 (5%)</span>
                  <span className="font-medium">{ghcFormat(tier2Monthly)}</span>
                </div>
                {includeTier3 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tier 3 ({parsedTier3}%)</span>
                    <span className="font-medium">{ghcFormat(tier3Monthly)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Monthly</span>
                  <span className="text-purple-700">{ghcFormat(totalContributionsMonthly)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Yearly Contributions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">Yearly Contributions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tier 1 (Total)</span>
                  <span className="font-medium">{ghcFormat(tier1Yearly)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tier 2</span>
                  <span className="font-medium">{ghcFormat(tier2Yearly)}</span>
                </div>
                {includeTier3 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tier 3</span>
                    <span className="font-medium">{ghcFormat(tier3Yearly)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Yearly</span>
                  <span className="text-purple-700">{ghcFormat(totalContributionsYearly)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            <h4 className="font-semibold mb-2">About SSNIT Contributions:</h4>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Tier 1:</strong> Mandatory basic national social security (19% total: 5.5% employee + 13.5% employer)</li>
              <li>• <strong>Tier 2:</strong> Mandatory occupational pension scheme (5% employee contribution)</li>
              <li>• <strong>Tier 3:</strong> Voluntary provident fund or personal pension (you choose the percentage)</li>
            </ul>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            This calculator provides estimates based on current SSNIT rates. Consult with your employer or SSNIT for precise calculations.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SSNITCalculator;

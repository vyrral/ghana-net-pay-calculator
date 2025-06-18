
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
        <div className="w-full max-w-6xl">
          <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6 mx-auto mb-12">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 text-center">
                SSNIT Pension Contributions Calculator - Ghana 2024
              </h1>
              <p className="text-gray-600 text-center text-sm">Calculate your pension contributions across all three tiers of Ghana's pension system</p>
            </div>

            <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Salary Information</h2>
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

              <h3 className="text-md font-medium text-gray-800 mb-2">Optional Contributions</h3>
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

            <h2 className="text-xl font-semibold text-gray-800 text-center">Your Pension Contributions</h2>

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
              <h3 className="font-semibold mb-2">About Ghana's 3-Tier Pension System:</h3>
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

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to SSNIT Pension Contributions in Ghana</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Understanding your SSNIT pension contributions is crucial for retirement planning in Ghana. Our comprehensive SSNIT calculator 
                helps you understand exactly how much you and your employer contribute to your retirement savings through Ghana's innovative 
                three-tier pension system managed by <a href="https://www.ssnit.org.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">SSNIT</a> 
                and regulated by the National Pensions Regulatory Authority.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Understanding Ghana's Three-Tier Pension System</h3>
              <p>
                Ghana's pension reform introduced a comprehensive three-tier system designed to provide adequate retirement income for all workers. 
                This system, overseen by various regulatory bodies including SSNIT and approved by the 
                <a href="https://fwsc.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline"> Fair Wages and Salaries Commission</a>, 
                ensures both mandatory and voluntary retirement savings options.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tier 1: SSNIT Basic National Social Security</h3>
              <p>
                Tier 1 forms the foundation of Ghana's pension system, providing basic social security benefits including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Old Age Pension:</strong> Monthly payments after retirement age</li>
                <li><strong>Invalidity Pension:</strong> Support for those unable to work due to disability</li>
                <li><strong>Survivors' Benefits:</strong> Financial support for dependents after death</li>
                <li><strong>Funeral Grant:</strong> Assistance with funeral expenses</li>
              </ul>
              
              <div className="bg-gray-50 p-6 rounded-lg my-6">
                <h4 className="font-semibold mb-4">Tier 1 Contribution Breakdown:</h4>
                <ul className="space-y-2">
                  <li>• Employee Contribution: <strong>5.5% of gross salary</strong></li>
                  <li>• Employer Contribution: <strong>13.5% of gross salary</strong></li>
                  <li>• Total Monthly Contribution: <strong>19% of gross salary</strong></li>
                  <li>• Minimum Retirement Age: <strong>60 years</strong></li>
                  <li>• Minimum Contribution Period: <strong>240 months (20 years)</strong></li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tier 2: Mandatory Occupational Pension Scheme</h3>
              <p>
                Tier 2 is a mandatory occupational pension scheme that supplements Tier 1 benefits. Unlike SSNIT's defined benefit system, 
                Tier 2 operates as a defined contribution scheme where your retirement benefits depend on contributions made and investment returns.
              </p>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Key Features of Tier 2:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>5% employee contribution (deducted from gross salary)</li>
                <li>Managed by approved pension fund managers</li>
                <li>Individual retirement accounts for each contributor</li>
                <li>Investment in approved securities for growth</li>
                <li>Portable between employers</li>
                <li>Lump sum and annuity payment options at retirement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tier 3: Voluntary Provident Fund</h3>
              <p>
                Tier 3 allows additional voluntary contributions for enhanced retirement savings. This tier provides tax advantages 
                and flexible contribution rates, making it ideal for those who want to secure a more comfortable retirement.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Benefits of Tier 3 Contributions:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Voluntary contribution rates (typically 1-16.5% of gross salary)</li>
                <li>Tax deductions on contributions up to certain limits</li>
                <li>Flexible withdrawal options before retirement</li>
                <li>Higher potential returns through diverse investment options</li>
                <li>Estate planning benefits for beneficiaries</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">SSNIT Contribution Limits and Caps</h3>
              <p>
                SSNIT contributions are subject to certain limits and regulations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Maximum Pensionable Salary:</strong> Currently capped at specific amounts reviewed annually</li>
                <li><strong>Minimum Contribution:</strong> Based on national minimum wage levels</li>
                <li><strong>Late Payment Penalties:</strong> Interest charges for delayed employer contributions</li>
                <li><strong>Contribution Holidays:</strong> Limited provisions for temporary suspension in exceptional circumstances</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How to Maximize Your Pension Benefits</h3>
              <p>
                Strategic pension planning can significantly impact your retirement income:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Start Early:</strong> The power of compound interest rewards early contributors</li>
                <li><strong>Consistent Contributions:</strong> Avoid gaps in contribution history</li>
                <li><strong>Maximize Tier 3:</strong> Take advantage of tax benefits and higher returns</li>
                <li><strong>Monitor Investments:</strong> Regularly review Tier 2 and 3 investment performance</li>
                <li><strong>Plan for Inflation:</strong> Consider inflation's impact on retirement purchasing power</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Common SSNIT Questions and Answers</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">What happens if I change jobs?</h4>
              <p>
                Your SSNIT contributions follow you throughout your career. Tier 1 benefits are calculated based on your total contribution 
                history across all employers. Tier 2 funds are portable and can be transferred to your new employer's approved fund manager.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Can I contribute more than the required amounts?</h4>
              <p>
                While Tier 1 and 2 have fixed contribution rates, you can make additional voluntary contributions through Tier 3 schemes. 
                These additional contributions often provide tax advantages and higher potential returns.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">What if my employer doesn't pay SSNIT contributions?</h4>
              <p>
                Employers are legally required to deduct and remit SSNIT contributions. If your employer fails to do so, you should 
                report this to SSNIT directly. The employer faces penalties for late or non-payment of contributions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Recent Updates and Changes</h3>
              <p>
                Ghana's pension system continues to evolve. Recent developments include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Digitization of pension records and services</li>
                <li>Enhanced investment options for Tier 2 and 3 funds</li>
                <li>Improved pension payment systems</li>
                <li>Expanded coverage for informal sector workers</li>
                <li>Enhanced regulatory oversight for better protection</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Benefits of Using Our SSNIT Calculator</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Accuracy:</strong> Based on current SSNIT rates and regulations</li>
                <li><strong>Comprehensive:</strong> Covers all three pension tiers</li>
                <li><strong>Planning Tool:</strong> Helps estimate retirement income</li>
                <li><strong>Educational:</strong> Explains complex pension concepts</li>
                <li><strong>Free Access:</strong> No cost or registration required</li>
                <li><strong>Mobile Friendly:</strong> Works on all devices</li>
              </ul>

              <div className="bg-green-50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-green-800 mb-2">Start Planning Your Retirement Today</h4>
                <p className="text-green-700">
                  Use our calculator to understand your current contributions and explore how additional Tier 3 contributions 
                  can enhance your retirement security. Every cedi contributed today compounds for your future benefit.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                <p className="text-yellow-700 text-sm">
                  This calculator provides estimates based on current rates and regulations. SSNIT benefits are subject to 
                  policy changes and individual circumstances. For official information and personalized advice, contact SSNIT directly 
                  or consult with approved pension fund managers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SSNITCalculator;

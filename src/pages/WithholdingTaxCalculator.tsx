
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const WithholdingTaxCalculator = () => {
  const [amount, setAmount] = useState<string>("");
  const [taxType, setTaxType] = useState<string>("services");

  const parsedAmount = amount === "" ? 0 : +amount;

  // Withholding tax rates for different categories
  const taxRates: { [key: string]: { rate: number; description: string } } = {
    services: { rate: 5, description: "Services rendered by residents" },
    goods: { rate: 3, description: "Supply of goods by residents" },
    works: { rate: 7.5, description: "Works/construction contracts" },
    rent: { rate: 8, description: "Rent payments" },
    dividends: { rate: 8, description: "Dividend payments" },
    interest: { rate: 8, description: "Interest payments" },
    royalties: { rate: 8, description: "Royalty payments" },
    nonResident: { rate: 15, description: "Payments to non-residents" },
    commission: { rate: 5, description: "Commission payments" },
    lottery: { rate: 15, description: "Lottery/gaming winnings" }
  };

  const selectedRate = taxRates[taxType];
  const withholdingTax = parsedAmount * (selectedRate.rate / 100);
  const netAmount = parsedAmount - withholdingTax;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6 mx-auto mb-12">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 text-center">
                Withholding Tax Calculator - Ghana
              </h1>
              <p className="text-gray-600 text-center text-sm">Calculate withholding tax deductions for various payment types in Ghana</p>
            </div>

            <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment Information</h2>
              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">Gross payment amount</label>
                <div className="flex items-center">
                  <span className="font-medium text-gray-500 mr-2">GH₵</span>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">Payment type</label>
                <Select value={taxType} onValueChange={setTaxType}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="services">Services (5%)</SelectItem>
                    <SelectItem value="goods">Supply of Goods (3%)</SelectItem>
                    <SelectItem value="works">Works/Construction (7.5%)</SelectItem>
                    <SelectItem value="rent">Rent (8%)</SelectItem>
                    <SelectItem value="dividends">Dividends (8%)</SelectItem>
                    <SelectItem value="interest">Interest (8%)</SelectItem>
                    <SelectItem value="royalties">Royalties (8%)</SelectItem>
                    <SelectItem value="commission">Commission (5%)</SelectItem>
                    <SelectItem value="nonResident">Non-Resident Payments (15%)</SelectItem>
                    <SelectItem value="lottery">Lottery/Gaming (15%)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">{selectedRate.description}</p>
              </div>
            </form>

            <Separator />

            <h2 className="text-xl font-semibold text-gray-800 text-center">Withholding Tax Calculation</h2>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Gross Payment</span>
                  <span className="font-medium">{ghcFormat(parsedAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Withholding Tax ({selectedRate.rate}%)</span>
                  <span className="font-medium text-red-600">-{ghcFormat(withholdingTax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Net Payment</span>
                  <span className="text-purple-700">{ghcFormat(netAmount)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
              <h3 className="font-semibold mb-2">About Withholding Tax in Ghana:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Withholding tax is deducted at source from payments</li>
                <li>• The payer is responsible for deducting and remitting the tax</li>
                <li>• Tax must be paid to GRA within 15 days of deduction</li>
                <li>• Recipients can claim credit for withheld tax on their tax returns</li>
                <li>• Different rates apply to residents vs. non-residents</li>
              </ul>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              This calculator provides estimates based on current withholding tax rates. Consult the Ghana Revenue Authority for official tax information.
            </p>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to Withholding Tax in Ghana</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Withholding tax is a crucial component of Ghana's tax system, requiring businesses and individuals 
                to deduct tax at source from various payments. Our withholding tax calculator helps you determine 
                the correct tax amounts based on current rates set by the <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Ghana Revenue Authority</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What is Withholding Tax?</h3>
              <p>
                Withholding tax is a method of collecting income tax at the source of income generation. 
                The payer deducts a specified percentage from payments and remits it directly to the tax authority.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Current Withholding Tax Rates</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Services:</strong> 5% for services rendered by residents</li>
                <li><strong>Goods:</strong> 3% on supply of goods by residents</li>
                <li><strong>Construction:</strong> 7.5% on works and construction contracts</li>
                <li><strong>Rent, Dividends, Interest, Royalties:</strong> 8% each</li>
                <li><strong>Non-resident payments:</strong> 15%</li>
                <li><strong>Lottery/Gaming:</strong> 15% on winnings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Compliance Requirements</h3>
              <p>
                Withholding agents must deduct the appropriate tax, issue certificates to payees, 
                and remit the tax to GRA within 15 days of the month following the deduction.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WithholdingTaxCalculator;

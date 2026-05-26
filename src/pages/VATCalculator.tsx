import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ghcFormat, ghcFormatPDF } from "@/lib/format";
import { usePageTitle } from "@/hooks/use-page-title";

const VATCalculator = () => {
  usePageTitle("Ghana VAT Calculator - Calculate Value Added Tax");
  const [amount, setAmount] = useState<string>("");
  const [vatRate, setVatRate] = useState<string>("15");
  const [includeVAT, setIncludeVAT] = useState(false);

  // Optional taxes
  const [includeNHIL, setIncludeNHIL] = useState(false);
  const [includeGetFund, setIncludeGetFund] = useState(false);
  const [includeCovid, setIncludeCovid] = useState(false);
  const [includeFlat, setIncludeFlat] = useState(false);

  const parsedAmount = amount === "" ? 0 : +amount;
  const parsedVatRate = vatRate === "" ? 15 : +vatRate;

  // Accumulate all active tax rates into a single total rate
  const totalOptionalRate =
    (includeNHIL ? 2.5 : 0) +
    (includeGetFund ? 2.5 : 0) +
    (includeCovid ? 1 : 0) +
    (includeFlat ? 3 : 0);
  const totalTaxRate = parsedVatRate + totalOptionalRate;

  // netAmount is always the pre-tax base; direction depends on includeVAT
  const netAmount = includeVAT
    ? parsedAmount / (1 + totalTaxRate / 100)
    : parsedAmount;
  const totalAmount = includeVAT
    ? parsedAmount
    : netAmount * (1 + totalTaxRate / 100);

  const vatAmount = netAmount * (parsedVatRate / 100);
  const nhilAmount = includeNHIL ? netAmount * 0.025 : 0;
  const getFundAmount = includeGetFund ? netAmount * 0.025 : 0;
  const covidAmount = includeCovid ? netAmount * 0.01 : 0;
  const flatAmount = includeFlat ? netAmount * 0.03 : 0;

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(10);
    doc.text("Created by TaxCalculatorGh.info | Contact: +233274969899", 14, 10);
    
    // Title
    doc.setFontSize(18);
    doc.text("VAT Calculation Breakdown", 14, 25);

    doc.setFontSize(12);
    let y = 40;
    doc.text(`${includeVAT ? "Total amount (including VAT)" : "Net amount (excluding VAT)"}: ${ghcFormatPDF(parsedAmount)}`, 14, y);
    y += 8;
    doc.text(`VAT Rate: ${parsedVatRate}%`, 14, y);

    y += 15;
    doc.setFont(undefined, "bold");
    doc.text("Tax Breakdown:", 14, y);
    doc.setFont(undefined, "normal");
    y += 10;

    doc.text(`Net Amount (excluding taxes): ${ghcFormatPDF(netAmount)}`, 14, y);
    y += 8;
    doc.text(`VAT (${parsedVatRate}%): ${ghcFormatPDF(vatAmount)}`, 14, y);
    y += 8;

    if (includeNHIL) {
      doc.text(`NHIL (2.5%): ${ghcFormatPDF(nhilAmount)}`, 14, y);
      y += 8;
    }
    if (includeGetFund) {
      doc.text(`Get Fund (2.5%): ${ghcFormatPDF(getFundAmount)}`, 14, y);
      y += 8;
    }
    if (includeCovid) {
      doc.text(`COVID 19 HRL (1%): ${ghcFormatPDF(covidAmount)}`, 14, y);
      y += 8;
    }
    if (includeFlat) {
      doc.text(`FLAT (3%): ${ghcFormatPDF(flatAmount)}`, 14, y);
      y += 8;
    }

    y += 8;
    doc.setFont(undefined, "bold");
    doc.text(`Total Amount (including all taxes): ${ghcFormatPDF(totalAmount)}`, 14, y);

    // Footer
    const footerY = 285;
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text("Email: contact@taxcalculatorgh.info | business@kobydigital.com", 14, footerY);

    doc.save("vat_calculation.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6 mx-auto mb-12">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 text-center">
                VAT Calculator - Ghana
              </h1>
              <p className="text-gray-600 text-center text-sm">Calculate Value Added Tax (VAT) for goods and services in Ghana</p>
            </div>

            <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Amount Information</h2>
              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">
                  {includeVAT ? "Total amount (including VAT)" : "Net amount (excluding VAT)"}
                </label>
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="include-vat"
                  checked={includeVAT}
                  onCheckedChange={setIncludeVAT}
                />
                <label htmlFor="include-vat" className="text-sm font-medium text-gray-700">
                  Amount includes VAT
                </label>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">VAT Rate</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={vatRate}
                    onChange={e => setVatRate(e.target.value)}
                    placeholder="15"
                    className="text-base"
                  />
                  <span className="font-medium text-gray-500 ml-2">%</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-md font-semibold text-gray-800">Optional Taxes</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nhil"
                    checked={includeNHIL}
                    onCheckedChange={(checked) => setIncludeNHIL(checked === true)}
                  />
                  <label htmlFor="nhil" className="text-sm font-medium text-gray-700">
                    NHIL (2.5%)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="getfund"
                    checked={includeGetFund}
                    onCheckedChange={(checked) => setIncludeGetFund(checked === true)}
                  />
                  <label htmlFor="getfund" className="text-sm font-medium text-gray-700">
                    Get Fund (2.5%)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="covid"
                    checked={includeCovid}
                    onCheckedChange={(checked) => setIncludeCovid(checked === true)}
                  />
                  <label htmlFor="covid" className="text-sm font-medium text-gray-700">
                    COVID 19 HRL (1%)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="flat"
                    checked={includeFlat}
                    onCheckedChange={(checked) => setIncludeFlat(checked === true)}
                  />
                  <label htmlFor="flat" className="text-sm font-medium text-gray-700">
                    FLAT (3%)
                  </label>
                </div>
              </div>
            </form>

            <Separator />

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Tax Calculation Results</h2>
              <Button
                onClick={downloadPDF}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download PDF
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Net Amount (excluding taxes)</span>
                  <span className="font-medium">{ghcFormat(netAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">VAT ({parsedVatRate}%)</span>
                  <span className="font-medium">{ghcFormat(vatAmount)}</span>
                </div>
                {includeNHIL && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">NHIL (2.5%)</span>
                    <span className="font-medium">{ghcFormat(nhilAmount)}</span>
                  </div>
                )}
                {includeGetFund && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Get Fund (2.5%)</span>
                    <span className="font-medium">{ghcFormat(getFundAmount)}</span>
                  </div>
                )}
                {includeCovid && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">COVID 19 HRL (1%)</span>
                    <span className="font-medium">{ghcFormat(covidAmount)}</span>
                  </div>
                )}
                {includeFlat && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">FLAT (3%)</span>
                    <span className="font-medium">{ghcFormat(flatAmount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount (including all taxes)</span>
                  <span className="text-purple-700">{ghcFormat(totalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
              <h3 className="font-semibold mb-2">About VAT in Ghana:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Standard VAT rate is <strong>15%</strong> on most goods and services</li>
                <li>• Some items are VAT-exempt (basic food items, medical services, education)</li>
                <li>• VAT-registered businesses can claim input VAT on purchases</li>
                <li>• Businesses with turnover above GH₵200,000 must register for VAT</li>
                <li>• Optional taxes: NHIL (2.5%), Get Fund (2.5%), COVID 19 HRL (1%), FLAT (3%)</li>
              </ul>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              This calculator provides estimates based on current VAT rates. Consult the Ghana Revenue Authority for official VAT information.
            </p>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to VAT Calculation in Ghana</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Understanding Value Added Tax (VAT) calculations is essential for businesses and consumers in Ghana. 
                Our VAT calculator helps you quickly compute VAT amounts for goods and services based on Ghana's 
                current tax regulations administered by the <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Ghana Revenue Authority</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What is VAT?</h3>
              <p>
                Value Added Tax (VAT) is a consumption tax applied to goods and services at each stage of production 
                and distribution. In Ghana, VAT is collected by businesses on behalf of the government and remitted 
                to the Ghana Revenue Authority.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Current VAT Rates in Ghana</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Standard Rate:</strong> 15% on most goods and services</li>
                <li><strong>Zero Rate:</strong> 0% on exports and some specified goods</li>
                <li><strong>Exempt:</strong> No VAT on basic food items, medical services, and education</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">VAT Registration Requirements</h3>
              <p>
                Businesses must register for VAT if their annual turnover exceeds GH₵200,000. 
                Registered businesses can claim input VAT on their purchases and must charge output VAT on their sales.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VATCalculator;

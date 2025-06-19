
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
  const [serviceType, setServiceType] = useState<string>("professional");

  const parsedAmount = amount === "" ? 0 : +amount;

  // Withholding tax rates for different services
  const getTaxRate = (type: string) => {
    switch (type) {
      case "professional": return 5; // Professional services
      case "technical": return 5; // Technical services
      case "management": return 5; // Management/consultancy services
      case "construction": return 5; // Construction services
      case "goods": return 3; // Supply of goods
      case "rent": return 8; // Rent payments
      case "interest": return 8; // Interest payments
      case "dividend": return 8; // Dividend payments
      case "royalty": return 10; // Royalty payments
      case "commission": return 10; // Commission payments
      default: return 5;
    }
  };

  const taxRate = getTaxRate(serviceType);
  const withholdingTax = parsedAmount * (taxRate / 100);
  const netAmount = parsedAmount - withholdingTax;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ghana Withholding Tax Calculator - Calculate WHT on Services & Payments
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Free online withholding tax calculator for Ghana - Calculate WHT on professional services, rent, dividends, and other payments based on GRA rates
            </p>
          </div>

          <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6 mx-auto mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
                Withholding Tax Calculator
              </h2>
              <p className="text-gray-600 text-center text-sm">Calculate withholding tax deductions on various payments in Ghana</p>
            </div>

            <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Information</h3>
              
              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">Gross Payment Amount</label>
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
                <label className="block text-sm mb-1 text-gray-700 font-medium">Service/Payment Type</label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional Services (5%)</SelectItem>
                    <SelectItem value="technical">Technical Services (5%)</SelectItem>
                    <SelectItem value="management">Management/Consultancy (5%)</SelectItem>
                    <SelectItem value="construction">Construction Services (5%)</SelectItem>
                    <SelectItem value="goods">Supply of Goods (3%)</SelectItem>
                    <SelectItem value="rent">Rent Payments (8%)</SelectItem>
                    <SelectItem value="interest">Interest Payments (8%)</SelectItem>
                    <SelectItem value="dividend">Dividend Payments (8%)</SelectItem>
                    <SelectItem value="royalty">Royalty Payments (10%)</SelectItem>
                    <SelectItem value="commission">Commission Payments (10%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>

            <Separator />

            <h3 className="text-xl font-semibold text-gray-800 text-center">Withholding Tax Results</h3>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">Payment Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Gross Payment Amount</span>
                  <span className="font-medium">{ghcFormat(parsedAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Withholding Tax ({taxRate}%)</span>
                  <span className="font-medium text-red-600">{ghcFormat(withholdingTax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Net Payment (After WHT)</span>
                  <span className="text-purple-700">{ghcFormat(netAmount)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
              <h4 className="font-semibold mb-2">About Withholding Tax in Ghana:</h4>
              <ul className="space-y-1 text-xs">
                <li>• Withholding tax is deducted at source from payments made to service providers</li>
                <li>• The payer is responsible for deducting and remitting WHT to GRA</li>
                <li>• WHT serves as advance payment of income tax for the recipient</li>
                <li>• Different rates apply to different types of services and payments</li>
                <li>• Recipients can claim WHT as credit against their annual income tax</li>
              </ul>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              This calculator provides estimates based on current WHT rates. Consult the Ghana Revenue Authority for official withholding tax information.
            </p>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to Withholding Tax in Ghana</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Withholding Tax (WHT) is a crucial component of Ghana's tax system, designed to ensure efficient tax collection at the source of income generation. 
                Our comprehensive withholding tax calculator helps businesses, contractors, and service providers understand their tax obligations and plan their finances accordingly. 
                Whether you're a consultant, contractor, landlord, or business owner making payments to service providers, understanding WHT is essential for compliance with 
                <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline"> Ghana Revenue Authority</a> regulations.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Understanding Withholding Tax in Ghana</h3>
              <p>
                Withholding Tax is a method of collecting income tax in advance by deducting tax at the source of income. In Ghana, WHT is deducted from payments made to 
                residents and non-residents for various services and income types. The system ensures that tax is collected efficiently and reduces the burden of tax 
                collection on the Ghana Revenue Authority while providing a steady revenue stream for the government.
              </p>

              <p>
                The concept operates on a simple principle: instead of waiting for individuals or businesses to file annual tax returns and pay their income tax, 
                a portion of the tax is collected immediately when payments are made. This advance payment can later be credited against the recipient's annual 
                income tax liability, ensuring fair treatment while improving tax compliance.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Current Withholding Tax Rates in Ghana</h3>
              <p>
                The Ghana Revenue Authority has established specific withholding tax rates for different types of payments and services. These rates are designed to 
                reflect the nature of the income and ensure appropriate tax collection across various economic sectors.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Service-Based Withholding Tax Rates</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Professional Services (5%):</strong> Legal services, accounting, medical services, engineering consultancy</li>
                <li><strong>Technical Services (5%):</strong> IT services, software development, technical consultancy</li>
                <li><strong>Management and Consultancy Services (5%):</strong> Business consulting, management advisory services</li>
                <li><strong>Construction Services (5%):</strong> Building construction, civil engineering, project management</li>
                <li><strong>Supply of Goods (3%):</strong> Wholesale and retail supply of goods to registered businesses</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Investment and Property Income Rates</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Rent Payments (8%):</strong> Residential and commercial property rentals</li>
                <li><strong>Interest Payments (8%):</strong> Interest on loans, deposits, and other financial instruments</li>
                <li><strong>Dividend Payments (8%):</strong> Dividends from shareholdings and investments</li>
                <li><strong>Royalty Payments (10%):</strong> Intellectual property royalties, mining royalties</li>
                <li><strong>Commission Payments (10%):</strong> Sales commissions, agency fees, brokerage services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Who Must Deduct Withholding Tax?</h3>
              <p>
                The responsibility for deducting withholding tax lies with the payer, not the recipient. Various entities are required to deduct WHT when making 
                specific types of payments:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Government Institutions</h4>
              <p>
                All government agencies, departments, and state-owned enterprises must deduct withholding tax from payments made to contractors, consultants, 
                and service providers. This includes payments for goods, services, works, and professional fees.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Large Businesses and Corporations</h4>
              <p>
                Companies with annual turnover exceeding specified thresholds are required to deduct withholding tax from payments to service providers. 
                This includes payments for professional services, technical services, and supply of goods.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Financial Institutions</h4>
              <p>
                Banks, insurance companies, and other financial institutions must deduct withholding tax on interest payments, dividends, and other 
                investment returns paid to customers and shareholders.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Withholding Tax Compliance and Procedures</h3>
              <p>
                Proper compliance with withholding tax requirements involves several key steps and responsibilities for both payers and recipients:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">For Payers (Those Deducting WHT)</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Calculate Correctly:</strong> Apply the appropriate WHT rate based on the type of service or payment</li>
                <li><strong>Issue WHT Certificates:</strong> Provide official withholding tax certificates to payees</li>
                <li><strong>File Monthly Returns:</strong> Submit WHT returns to GRA by the 15th of the following month</li>
                <li><strong>Remit Tax:</strong> Pay the deducted WHT to GRA within the prescribed timeframe</li>
                <li><strong>Maintain Records:</strong> Keep detailed records of all WHT deductions and payments</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">For Recipients (Those Subject to WHT)</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Obtain WHT Certificates:</strong> Collect withholding tax certificates from all payers</li>
                <li><strong>Claim Credit:</strong> Use WHT certificates as credit against annual income tax liability</li>
                <li><strong>File Annual Returns:</strong> Include WHT information in annual tax returns</li>
                <li><strong>Request Refunds:</strong> Apply for refunds if WHT exceeds annual tax liability</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Exemptions and Special Considerations</h3>
              <p>
                While withholding tax applies broadly across various income types, certain exemptions and special provisions exist:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Small Business Exemptions</h4>
              <p>
                Small businesses and individuals below certain income thresholds may be exempt from withholding tax on specific types of payments. 
                These exemptions are designed to reduce the tax burden on small-scale economic activities and encourage entrepreneurship.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Export-Related Exemptions</h4>
              <p>
                Payments related to export activities may qualify for reduced withholding tax rates or complete exemptions, depending on the nature 
                of the service and the export promotion policies in effect.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Double Taxation Relief</h4>
              <p>
                Non-resident service providers may benefit from reduced withholding tax rates under double taxation agreements between Ghana and 
                their countries of residence. These agreements prevent the same income from being taxed in both countries.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Impact of Withholding Tax on Business Operations</h3>
              <p>
                Understanding and properly managing withholding tax has significant implications for business operations, cash flow management, 
                and strategic planning:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Cash Flow Considerations</h4>
              <p>
                For service providers, withholding tax reduces immediate cash receipts, requiring careful cash flow planning. Businesses must 
                factor WHT deductions into their pricing strategies and working capital requirements to maintain healthy operations.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Pricing and Contract Negotiations</h4>
              <p>
                Service providers often need to negotiate whether contracts are on a gross or net basis. Understanding whether the quoted price 
                includes or excludes withholding tax is crucial for accurate financial planning and profitability analysis.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Administrative Burden</h4>
              <p>
                Both payers and recipients face administrative responsibilities related to WHT compliance. Proper systems and procedures must be 
                in place to ensure accurate calculation, deduction, remittance, and reporting of withholding tax.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Common Withholding Tax Scenarios in Ghana</h3>
              <p>
                Various business situations trigger withholding tax obligations. Understanding these scenarios helps businesses prepare for 
                compliance requirements:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Consulting and Professional Services</h4>
              <p>
                When businesses engage external consultants, lawyers, accountants, or other professionals, 5% withholding tax must be deducted 
                from payments. This applies to both one-time engagements and ongoing professional relationships.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Construction and Project Contracts</h4>
              <p>
                Construction companies and contractors are subject to 5% withholding tax on payments received for building projects, civil works, 
                and related services. This includes both main contractors and subcontractors.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Rental Income</h4>
              <p>
                Property owners receiving rental payments are subject to 8% withholding tax, whether from individual tenants or corporate lessees. 
                This applies to both residential and commercial property rentals.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Technology and Withholding Tax Management</h3>
              <p>
                Modern businesses increasingly rely on technology solutions to manage withholding tax compliance efficiently:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Automated Calculation Systems</h4>
              <p>
                Accounting software and enterprise resource planning (ERP) systems can automatically calculate and track withholding tax 
                deductions, reducing errors and improving compliance efficiency.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Digital Filing and Remittance</h4>
              <p>
                The Ghana Revenue Authority provides online platforms for filing WHT returns and making tax payments, streamlining the 
                compliance process for businesses and improving overall tax administration efficiency.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-blue-800 mb-2">Important WHT Compliance Reminder</h4>
                <p className="text-blue-700 text-sm">
                  This withholding tax calculator provides estimates based on current GRA rates and should be used for planning purposes only. 
                  Actual withholding tax obligations may vary based on specific circumstances, exemptions, and changes in tax regulations. 
                  Always consult with qualified tax professionals and verify current rates with the Ghana Revenue Authority for official compliance guidance.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold text-green-800 mb-2">Additional Tax Planning Resources</h4>
                <p className="text-green-700 text-sm">
                  Maximize your tax planning with our comprehensive suite of calculators. Use our <a href="/" className="underline" title="Ghana Tax Calculator">Ghana Tax Calculator</a> for salary planning, 
                  <a href="/vat" className="underline" title="VAT Calculator">VAT Calculator</a> for business tax calculations, and 
                  <a href="/ssnit" className="underline" title="SSNIT Calculator">SSNIT Calculator</a> for pension planning to create a complete financial strategy.
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

export default WithholdingTaxCalculator;

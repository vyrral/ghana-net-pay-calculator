
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const CSTCalculator = () => {
  const [amount, setAmount] = useState<string>("");
  const [cstRate, setCstRate] = useState<string>("9");
  const [includeCST, setIncludeCST] = useState(false);

  const parsedAmount = amount === "" ? 0 : +amount;
  const parsedCstRate = cstRate === "" ? 9 : +cstRate;

  // CST calculations
  let cstAmount: number;
  let netAmount: number;
  let totalAmount: number;

  if (includeCST) {
    // Amount includes CST - calculate backwards
    totalAmount = parsedAmount;
    netAmount = parsedAmount / (1 + parsedCstRate / 100);
    cstAmount = parsedAmount - netAmount;
  } else {
    // Amount excludes CST - calculate forwards
    netAmount = parsedAmount;
    cstAmount = parsedAmount * (parsedCstRate / 100);
    totalAmount = parsedAmount + cstAmount;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="w-full max-w-2xl bg-white shadow-md border border-gray-200 rounded-xl py-8 px-6 md:px-10 flex flex-col gap-6 mx-auto mb-12">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 text-center">
                Communication Service Tax Calculator - Ghana
              </h1>
              <p className="text-gray-600 text-center text-sm">Calculate Communication Service Tax (CST) for telecom services in Ghana</p>
            </div>

            <form className="space-y-4" autoComplete="off" onSubmit={e => e.preventDefault()}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Service Amount Information</h2>
              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">
                  {includeCST ? "Total amount (including CST)" : "Service amount (excluding CST)"}
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
                  id="include-cst"
                  checked={includeCST}
                  onCheckedChange={setIncludeCST}
                />
                <label htmlFor="include-cst" className="text-sm font-medium text-gray-700">
                  Amount includes CST
                </label>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">CST Rate</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={cstRate}
                    onChange={e => setCstRate(e.target.value)}
                    placeholder="9"
                    className="text-base"
                  />
                  <span className="font-medium text-gray-500 ml-2">%</span>
                </div>
              </div>
            </form>

            <Separator />

            <h2 className="text-xl font-semibold text-gray-800 text-center">CST Calculation Results</h2>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">CST Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Service Amount (excluding CST)</span>
                  <span className="font-medium">{ghcFormat(netAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CST ({parsedCstRate}%)</span>
                  <span className="font-medium">{ghcFormat(cstAmount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount (including CST)</span>
                  <span className="text-purple-700">{ghcFormat(totalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
              <h3 className="font-semibold mb-2">About CST in Ghana:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Standard CST rate is <strong>9%</strong> on communication services</li>
                <li>• Applies to mobile phone services, internet services, and other telecom services</li>
                <li>• CST is collected by telecom operators and remitted to the government</li>
                <li>• The tax helps fund communication infrastructure development</li>
              </ul>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              This calculator provides estimates based on current CST rates. Consult the Ghana Revenue Authority for official CST information.
            </p>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to Communication Service Tax (CST) in Ghana</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                The Communication Service Tax (CST) is a crucial component of Ghana's tax system, specifically targeting telecommunications and communication services. 
                Our comprehensive CST calculator helps individuals and businesses understand the tax implications of their communication expenses, 
                ensuring accurate budgeting and financial planning. The CST was introduced as part of Ghana's broader tax reform agenda to diversify 
                revenue sources and support the development of communication infrastructure across the country.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">What is Communication Service Tax (CST)?</h3>
              <p>
                Communication Service Tax is a consumption tax levied on various communication services provided within Ghana. 
                The tax is administered by the Ghana Revenue Authority (GRA) and is collected directly by service providers who then 
                remit the collected amounts to the government. The standard CST rate is 9% of the service charge, making it one of 
                the significant taxes affecting the telecommunications sector in Ghana.
              </p>

              <p>
                Unlike other taxes that may be optional or variable, CST is mandatory for all qualifying communication services and 
                is automatically included in the billing by service providers. This means that consumers and businesses using 
                communication services are automatically subject to this tax, making it essential to understand its impact on 
                overall communication costs.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Services Subject to Communication Service Tax</h3>
              <p>
                The CST applies to a wide range of communication services offered in Ghana. Understanding which services are subject 
                to this tax helps consumers and businesses better plan their communication budgets and compliance requirements.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Mobile Phone Services</h4>
              <p>
                All mobile phone services provided by telecommunications companies in Ghana are subject to CST. This includes voice calls, 
                SMS services, mobile data packages, and value-added services like mobile money transfers, premium SMS services, and 
                mobile entertainment subscriptions. Whether you're using prepaid or postpaid services, the 9% CST is automatically 
                included in your billing.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Fixed-Line Telephone Services</h4>
              <p>
                Traditional landline telephone services, including local and international calls, are subject to CST. This applies to 
                both residential and business fixed-line services, regardless of the service provider. The tax is calculated on the 
                total service charges, including connection fees, monthly rental charges, and call charges.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Internet and Broadband Services</h4>
              <p>
                Internet service providers (ISPs) in Ghana charge CST on all internet and broadband services. This includes residential 
                internet packages, business internet solutions, fiber optic services, and wireless internet services. The tax applies 
                to monthly subscription fees, installation charges, and any additional data packages purchased.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Satellite Communication Services</h4>
              <p>
                Satellite communication services, including satellite internet, satellite phone services, and VSAT (Very Small Aperture Terminal) 
                services used by businesses and organizations, are also subject to CST. These services are particularly important for 
                remote areas and specialized business applications.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Cable Television and Digital Services</h4>
              <p>
                Digital television services, cable TV subscriptions, and streaming services provided by licensed operators in Ghana 
                are subject to CST. This includes monthly subscription fees, premium channel packages, and pay-per-view services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">CST Rate Structure and Calculation</h3>
              <p>
                The current CST rate in Ghana is set at 9% of the total service charge. This rate is applied uniformly across all 
                qualifying communication services, providing consistency in tax application. The tax is calculated as a percentage 
                of the net service charge, and the total amount payable by the consumer includes both the service charge and the CST.
              </p>

              <p>
                For example, if you purchase a mobile data package worth GH₵100, the CST would be GH₵9 (9% of GH₵100), making your 
                total payment GH₵109. Our CST calculator automatically performs these calculations, helping you understand the exact 
                tax component of your communication expenses.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Major Telecommunications Operators in Ghana</h3>
              <p>
                Ghana's telecommunications sector is dominated by several major operators, all of whom are required to collect and 
                remit CST on behalf of the government:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">MTN Ghana</h4>
              <p>
                MTN Ghana is one of the largest mobile network operators in the country, providing comprehensive mobile services 
                including voice, data, mobile money, and digital services. All MTN services are subject to the 9% CST, which is 
                automatically included in billing and top-up transactions.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Vodafone Ghana</h4>
              <p>
                Vodafone Ghana offers a full range of telecommunications services including mobile voice and data, fixed broadband, 
                and enterprise solutions. The company ensures CST compliance across all its service offerings, with the tax being 
                transparently included in customer billing.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">AirtelTigo</h4>
              <p>
                Formed from the merger of Airtel and Tigo operations in Ghana, AirtelTigo provides mobile and data services across 
                the country. Like other operators, AirtelTigo collects CST on all qualifying services and includes detailed tax 
                information in customer communications.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Glo Mobile</h4>
              <p>
                Glo Mobile Ghana offers competitive mobile services with CST properly applied to all service charges. The company 
                ensures compliance with Ghana's tax regulations while providing transparent billing to customers.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">CST Collection and Remittance Process</h3>
              <p>
                The CST collection and remittance process is streamlined to ensure efficient tax collection while minimizing the 
                administrative burden on both service providers and consumers. Understanding this process helps appreciate the 
                systematic approach to CST administration in Ghana.
              </p>

              <p>
                Telecommunications service providers act as collecting agents for the Ghana Revenue Authority. They are required to 
                collect CST at the point of service delivery or billing and remit the collected amounts to GRA within specified 
                timeframes. This system ensures consistent tax collection across all communication services and reduces tax evasion.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Impact of CST on Communication Costs</h3>
              <p>
                The 9% CST significantly impacts the overall cost of communication services in Ghana. For individual consumers, 
                this translates to higher costs for mobile phone usage, internet access, and other communication needs. For businesses, 
                CST represents an additional operational cost that must be factored into budgeting and pricing decisions.
              </p>

              <p>
                Understanding the CST impact is crucial for effective financial planning. Businesses that rely heavily on communication 
                services, such as call centers, IT companies, and organizations with remote operations, need to accurately calculate 
                CST to manage their operational expenses effectively.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">CST and Business Tax Planning</h3>
              <p>
                For businesses operating in Ghana, CST represents a significant component of operational expenses that requires careful 
                planning and budgeting. Companies need to consider CST when evaluating communication service providers, negotiating 
                corporate packages, and planning annual budgets.
              </p>

              <p>
                Business owners should maintain detailed records of communication expenses and associated CST payments for proper 
                accounting and potential tax deduction purposes. While CST itself cannot be directly deducted, the underlying 
                communication expenses may qualify as legitimate business expenses for income tax purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Consumer Rights and CST Transparency</h3>
              <p>
                Consumers in Ghana have the right to transparent billing that clearly shows CST charges. Service providers are 
                required to itemize bills showing the base service charge and the applicable CST separately. This transparency 
                helps consumers understand exactly how much they're paying in taxes and makes it easier to verify billing accuracy.
              </p>

              <p>
                If you notice discrepancies in CST calculations on your bills, you have the right to query your service provider 
                and request corrections. Understanding the correct CST calculation helps you identify potential billing errors and 
                ensures you're not overcharged for communication services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Future Trends in Communication Service Taxation</h3>
              <p>
                The communication service tax landscape in Ghana continues to evolve with technological advancements and changing 
                consumer behavior. The rise of Over-The-Top (OTT) services, cloud communications, and digital platforms presents 
                new challenges and opportunities for CST application and collection.
              </p>

              <p>
                As Ghana's digital economy grows, there may be changes to CST rates or the scope of services covered by the tax. 
                Staying informed about these changes is crucial for both consumers and businesses to ensure compliance and accurate 
                financial planning.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Using Our CST Calculator Effectively</h3>
              <p>
                Our Communication Service Tax calculator is designed to provide accurate CST calculations for various scenarios. 
                Whether you need to calculate the CST component of your current bills, plan for future communication expenses, 
                or verify billing accuracy, our tool provides instant and reliable results.
              </p>

              <p>
                The calculator supports both forward and backward calculations - you can either input the base service amount to 
                calculate the total including CST, or input the total amount to determine the CST component and base service charge. 
                This flexibility makes it useful for various planning and verification scenarios.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-blue-800 mb-2">Important CST Disclaimer</h4>
                <p className="text-blue-700 text-sm">
                  This CST calculator provides estimates based on the current 9% CST rate and should be used for informational 
                  purposes only. Actual CST charges may vary based on specific service types, promotional offers, and regulatory 
                  changes. Always verify CST calculations with your service provider and consult the Ghana Revenue Authority 
                  for official tax information and updates.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold text-green-800 mb-2">Explore More Tax Calculators</h4>
                <p className="text-green-700 text-sm">
                  Maximize your financial planning with our comprehensive suite of Ghana tax calculators. Use our 
                  <a href="/" className="underline" title="Ghana Tax Calculator"> Income Tax Calculator</a> for salary planning, 
                  <a href="/vat" className="underline" title="VAT Calculator Ghana"> VAT Calculator</a> for business taxes, 
                  <a href="/wth-tax" className="underline" title="Withholding Tax Calculator"> Withholding Tax Calculator</a> for investment planning, and 
                  <a href="/ssnit" className="underline" title="SSNIT Calculator"> SSNIT Calculator</a> for pension contributions.
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

export default CSTCalculator;

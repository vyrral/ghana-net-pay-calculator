
import TaxCalculator from "@/components/TaxCalculator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navigation />
    {/* Main Content */}
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ghana Tax Calculator - Calculate Your Net Salary & PAYE Tax 2024
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Free online calculator for Ghana income tax, SSNIT contributions, and take-home salary based on latest GRA tax bands
          </p>
        </div>
        <TaxCalculator />
        
        {/* SEO Content Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to Ghana Tax Calculations 2024</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Our Ghana Tax Calculator is the most comprehensive and accurate salary calculator available for Ghanaian employees and employers. 
              Built according to the latest tax regulations from the <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Ghana Revenue Authority (GRA)</a>, 
              our tool helps you calculate your exact net income, PAYE income tax, and pension contributions with precision.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Why Use Our Ghana Salary Calculator?</h3>
            <p>
              Understanding your salary breakdown is crucial for financial planning in Ghana. Our calculator incorporates all mandatory deductions including 
              SSNIT contributions, PAYE income tax based on current tax bands, and Tier 2 pension contributions. Whether you're negotiating a new salary, 
              planning your budget, or simply want to understand your pay slip, our tool provides instant, accurate calculations.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How Ghana Tax System Works</h3>
            <p>
              Ghana operates a progressive tax system where higher earners pay higher tax rates. The system includes several components:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>PAYE Income Tax:</strong> Progressive rates from 0% to 30% based on income bands set by GRA</li>
              <li><strong>SSNIT Contributions:</strong> 5.5% employee contribution managed by <a href="https://www.ssnit.org.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Social Security and National Insurance Trust</a></li>
              <li><strong>Tier 2 Pension:</strong> 5% mandatory occupational pension scheme</li>
              <li><strong>Tax Relief:</strong> Various reliefs available to reduce taxable income</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2024 Ghana Tax Bands and Rates</h3>
            <p>
              The current PAYE tax bands as approved by GRA for 2024 are structured to ensure fair taxation across income levels:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <h4 className="font-semibold mb-4">Monthly PAYE Tax Bands:</h4>
              <ul className="space-y-2">
                <li>• First GH₵ 494: <strong>0% tax rate</strong></li>
                <li>• Next GH₵ 110 (GH₵ 495 - GH₵ 604): <strong>5% tax rate</strong></li>
                <li>• Next GH₵ 130 (GH₵ 605 - GH₵ 734): <strong>10% tax rate</strong></li>
                <li>• Next GH₵ 3,167 (GH₵ 735 - GH₵ 3,901): <strong>17.5% tax rate</strong></li>
                <li>• Next GH₵ 356 (GH₵ 3,902 - GH₵ 4,257): <strong>25% tax rate</strong></li>
                <li>• Above GH₵ 4,257: <strong>30% tax rate</strong></li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">SSNIT and Pension Contributions</h3>
            <p>
              Ghana's pension system operates on a three-tier structure designed to provide comprehensive retirement security:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Tier 1 (SSNIT):</strong> 5.5% employee + 13.5% employer contributions to the national social security scheme</li>
              <li><strong>Tier 2:</strong> 5% mandatory occupational pension managed by approved fund managers</li>
              <li><strong>Tier 3:</strong> Voluntary provident fund contributions for additional retirement savings</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Understanding Tax Relief in Ghana</h3>
            <p>
              Tax relief reduces your taxable income, potentially saving you money on PAYE tax. Common reliefs include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dependent spouse relief</li>
              <li>Child education relief</li>
              <li>Disabled dependent relief</li>
              <li>Life insurance premium relief</li>
              <li>Mortgage interest relief</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Benefits of Using Our Calculator</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Accuracy:</strong> Based on latest GRA tax regulations and SSNIT rates</li>
              <li><strong>Comprehensive:</strong> Includes all mandatory deductions and contributions</li>
              <li><strong>User-Friendly:</strong> Simple interface with detailed breakdowns</li>
              <li><strong>Free to Use:</strong> No registration or payment required</li>
              <li><strong>Mobile Responsive:</strong> Works perfectly on all devices</li>
              <li><strong>PDF Export:</strong> Download your calculations for records</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Common Questions About Ghana Tax Calculations</h3>
            <p>
              Many Ghanaians have questions about how their salary is calculated. Our tool addresses common concerns such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>How much tax will I pay on my salary?</li>
              <li>What is my take-home income after all deductions?</li>
              <li>How are SSNIT contributions calculated?</li>
              <li>What tax reliefs am I eligible for?</li>
              <li>How do allowances affect my tax calculation?</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Salary Guidelines and Fair Wages</h3>
            <p>
              The <a href="https://fwsc.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Fair Wages and Salaries Commission</a> of Ghana 
              provides guidelines for fair compensation across various sectors. Our calculator helps ensure you understand your total compensation package, 
              including how taxes and contributions affect your net income.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tips for Maximizing Your Take-Home Income</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Understand available tax reliefs and claim them appropriately</li>
              <li>Consider salary structuring with tax-efficient allowances</li>
              <li>Plan for voluntary Tier 3 pension contributions for tax benefits</li>
              <li>Keep proper records of eligible expenses for tax relief claims</li>
              <li>Stay updated with GRA announcements on tax policy changes</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h4 className="font-semibold text-blue-800 mb-2">Important Disclaimer</h4>
              <p className="text-blue-700 text-sm">
                This calculator provides estimates based on current tax laws and should be used for informational purposes only. 
                For official tax calculations and advice, please consult with the Ghana Revenue Authority or a qualified tax professional. 
                Tax laws may change, and individual circumstances may affect your actual tax liability.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mt-6">
              <h4 className="font-semibold text-green-800 mb-2">Need More Help?</h4>
              <p className="text-green-700 text-sm">
                Visit our <a href="/faq" className="underline">FAQ section</a> for detailed answers to common questions, 
                or explore our specialized calculators for <a href="/ssnit" className="underline">SSNIT contributions</a> and 
                <a href="/hourly" className="underline">hourly rate conversions</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Index;

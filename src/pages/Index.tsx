import TaxCalculator from "@/components/TaxCalculator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppSticky from "@/components/WhatsappSticky";

const Index = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navigation />
    {/* Main Content */}
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ghana Tax Calculator - Calculate Your Net Salary & PAYE Tax
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
              Built according to the latest tax regulations from the <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Ghana Revenue Authority Official Website">Ghana Revenue Authority (GRA)</a>, 
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
              <li><strong>SSNIT Contributions:</strong> 5.5% employee contribution managed by <a href="https://www.ssnit.org.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Social Security and National Insurance Trust">Social Security and National Insurance Trust</a></li>
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
              <li><strong>Dependent spouse relief:</strong> For married taxpayers supporting a spouse</li>
              <li><strong>Child education relief:</strong> For parents with children in full-time education under 18</li>
              <li><strong>Disabled dependent relief:</strong> For taxpayers caring for disabled dependents</li>
              <li><strong>Life insurance premium relief:</strong> For policy holders paying life insurance premiums</li>
              <li><strong>Mortgage interest relief:</strong> For homeowners paying mortgage interest</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Benefits of Our Ghana Tax Calculator</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>100% Accurate:</strong> Based on latest GRA tax regulations and SSNIT rates for 2024</li>
              <li><strong>Comprehensive:</strong> Includes all mandatory deductions and contributions</li>
              <li><strong>User-Friendly:</strong> Simple interface with detailed breakdowns</li>
              <li><strong>Free to Use:</strong> No registration or payment required</li>
              <li><strong>Mobile Responsive:</strong> Works perfectly on all devices</li>
              <li><strong>Instant Results:</strong> Real-time calculations as you type</li>
              <li><strong>PDF Export:</strong> Download your calculations for records</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Common Ghana Tax Questions Answered</h3>
            <p>
              Many Ghanaians have questions about how their salary is calculated. Our tool addresses common concerns such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>How much PAYE tax will I pay on my monthly salary?</li>
              <li>What is my exact take-home income after all deductions?</li>
              <li>How are SSNIT contributions calculated from my gross salary?</li>
              <li>What tax reliefs am I eligible for in Ghana?</li>
              <li>How do allowances affect my overall tax calculation?</li>
              <li>What's the difference between gross and net salary in Ghana?</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Fair Wages and Salary Guidelines</h3>
            <p>
              The <a href="https://fairwages.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Fair Wages and Salaries Commission Ghana">Fair Wages and Salaries Commission of Ghana</a> provides comprehensive guidelines for fair compensation across various sectors in Ghana. Understanding these guidelines helps ensure you receive appropriate compensation for your role and experience level.
            </p>
            <p>
              Our calculator helps you understand how fair wage guidelines translate into actual take-home income after taxes and statutory deductions. This information is crucial for salary negotiations and career planning in Ghana's job market.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tips for Maximizing Your Take-Home Income in Ghana</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Claim all eligible tax reliefs:</strong> Ensure you're taking advantage of all available reliefs</li>
              <li><strong>Understand salary structuring:</strong> Work with HR to optimize tax-efficient allowances</li>
              <li><strong>Plan for Tier 3 contributions:</strong> Voluntary pension contributions offer tax benefits</li>
              <li><strong>Keep proper records:</strong> Maintain documentation for tax relief claims</li>
              <li><strong>Stay informed:</strong> Follow GRA announcements on tax policy changes</li>
              <li><strong>Regular salary reviews:</strong> Use our calculator for annual salary negotiations</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h4 className="font-semibold text-blue-800 mb-2">Important Tax Disclaimer</h4>
              <p className="text-blue-700 text-sm">
                This Ghana tax calculator provides estimates based on current tax laws and should be used for informational purposes only. 
                For official tax calculations and personalized advice, please consult with the Ghana Revenue Authority or a qualified tax professional. 
                Tax laws may change, and individual circumstances may affect your actual tax liability.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mt-6">
              <h4 className="font-semibold text-green-800 mb-2">Need Additional Help with Ghana Tax Calculations?</h4>
              <p className="text-green-700 text-sm">
                Visit our <a href="/faq" className="underline" title="Ghana Tax Calculator FAQ">comprehensive FAQ section</a> for detailed answers to common questions about Ghana tax calculations, 
                or explore our specialized calculators for <a href="/ssnit" className="underline" title="SSNIT Contribution Calculator">SSNIT pension contributions</a> and 
                <a href="/hourly" className="underline" title="Hourly Rate Salary Converter">hourly rate to salary conversions</a>.
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

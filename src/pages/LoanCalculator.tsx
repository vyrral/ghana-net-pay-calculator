
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const LoanCalculator: React.FC = () => {
  usePageTitle("Ghana Loan Calculator - Monthly Payments & Interest");
  const [loanAmount, setLoanAmount] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("18");
  const [loanTerm, setLoanTerm] = useState<string>("3");

  const parsedAmount = loanAmount === "" ? 0 : +loanAmount;
  const parsedRate = interestRate === "" ? 0 : +interestRate;
  const parsedTerm = loanTerm === "" ? 0 : +loanTerm;

  const monthlyRate = parsedRate / 100 / 12;
  const totalPayments = parsedTerm * 12;

  // Guard against division by zero when interest rate is 0
  const monthlyPayment =
    totalPayments === 0
      ? 0
      : monthlyRate === 0
      ? parsedAmount / totalPayments
      : (parsedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));

  const totalRepayment = monthlyPayment * totalPayments;
  const totalInterest = totalRepayment - parsedAmount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ghana Loan Calculator - Calculate Monthly Payments & Interest
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Free online loan calculator for Ghana - Calculate monthly payments, total interest, and repayment schedules for personal loans, business loans, and mortgages
            </p>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Loan Repayment Calculator</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1" htmlFor="loanAmount">Loan Amount (GHS)</label>
                <Input
                  id="loanAmount"
                  type="number"
                  min={0}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="10000"
                />
              </div>

              <div>
                <label className="block font-medium mb-1" htmlFor="interestRate">Interest Rate (%)</label>
                <Input
                  id="interestRate"
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="18"
                />
              </div>

              <div>
                <label className="block font-medium mb-1" htmlFor="loanTerm">Loan Term (years)</label>
                <Input
                  id="loanTerm"
                  type="number"
                  min={1}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="3"
                />
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 space-y-2">
              <div className="flex justify-between">
                <span>Monthly Payment:</span>
                <span className="font-semibold">GHS {monthlyPayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Repayment:</span>
                <span className="font-semibold">GHS {totalRepayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest:</span>
                <span className="font-semibold text-red-500">GHS {totalInterest.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Guide to Loan Calculations in Ghana</h2>

            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Our comprehensive Ghana Loan Calculator is designed to help borrowers make informed financial decisions when considering personal loans, business loans, mortgages, or any other form of credit in Ghana. Whether you're planning to purchase a home, start a business, or consolidate debt, understanding your loan repayment obligations is crucial for financial planning and budgeting.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How Our Ghana Loan Calculator Works</h3>
              <p>
                Our loan calculator uses the standard amortization formula to calculate your monthly payments based on three key factors: the loan amount (principal), the annual interest rate, and the loan term in years. The calculator instantly computes your monthly payment amount, total repayment over the life of the loan, and the total interest you'll pay.
              </p>

              <p>
                The monthly payment calculation considers compound interest, meaning you pay interest on both the principal amount and any accumulated interest. This is the standard method used by banks and financial institutions throughout Ghana, making our calculator highly accurate for real-world loan scenarios.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Types of Loans Available in Ghana</h3>
              <p>
                Ghana's financial sector offers various loan products to meet different borrowing needs:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Personal Loans</h4>
              <p>
                Personal loans in Ghana are typically unsecured loans that can be used for various purposes including medical expenses, education, home improvements, or debt consolidation. Interest rates for personal loans generally range from 15% to 35% annually, depending on the lender and your creditworthiness.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Business Loans</h4>
              <p>
                Small and medium enterprises (SMEs) can access various business loan products from banks, microfinance institutions, and development finance institutions. These loans support working capital needs, equipment purchases, business expansion, and startup funding. Interest rates typically range from 18% to 30% annually.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Mortgage Loans</h4>
              <p>
                Home mortgage loans in Ghana are secured by the property being purchased. Mortgage rates are generally lower than unsecured loans, typically ranging from 12% to 25% annually. Most mortgage loans require a down payment of 10-30% of the property value.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Vehicle Loans</h4>
              <p>
                Auto loans are secured by the vehicle being purchased and typically offer competitive interest rates ranging from 15% to 25% annually. Loan terms usually range from 2 to 7 years.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Major Lenders in Ghana's Financial Market</h3>
              <p>
                Ghana's lending market includes various types of financial institutions:
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Commercial Banks</h4>
              <p>
                Major commercial banks like Ghana Commercial Bank, Ecobank Ghana, Standard Chartered Bank Ghana, and Absa Bank Ghana offer comprehensive loan products with competitive rates and terms. These banks typically require extensive documentation and have strict credit requirements.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Microfinance Institutions</h4>
              <p>
                Microfinance institutions provide smaller loans with more flexible requirements, particularly serving individuals and small businesses that may not qualify for traditional bank loans. While interest rates are often higher, they offer greater accessibility.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Savings and Loans Companies</h4>
              <p>
                These institutions specialize in savings mobilization and lending, often offering competitive rates for personal and business loans with more personalized service than larger banks.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Factors Affecting Loan Interest Rates in Ghana</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Credit History:</strong> Your past repayment behavior significantly impacts the rates offered</li>
                <li><strong>Income Level:</strong> Higher, stable income typically qualifies for better rates</li>
                <li><strong>Loan Security:</strong> Secured loans generally offer lower rates than unsecured loans</li>
                <li><strong>Loan Amount:</strong> Larger loans may qualify for better rates due to economies of scale</li>
                <li><strong>Loan Term:</strong> Shorter terms often have lower rates but higher monthly payments</li>
                <li><strong>Bank of Ghana Policy Rate:</strong> The central bank's monetary policy affects overall lending rates</li>
                <li><strong>Economic Conditions:</strong> Inflation and economic stability influence interest rate environments</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tips for Getting the Best Loan Terms in Ghana</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Improve Your Credit Score:</strong> Maintain a good credit history with timely payments</li>
                <li><strong>Shop Around:</strong> Compare offers from multiple lenders before deciding</li>
                <li><strong>Consider Secured Loans:</strong> Offering collateral can significantly reduce interest rates</li>
                <li><strong>Negotiate Terms:</strong> Don't accept the first offer; negotiate for better terms</li>
                <li><strong>Choose Appropriate Loan Terms:</strong> Balance monthly payment affordability with total interest costs</li>
                <li><strong>Maintain Stable Employment:</strong> Job stability improves your creditworthiness</li>
                <li><strong>Avoid Over-borrowing:</strong> Only borrow what you can comfortably repay</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Understanding Loan Repayment Schedules</h3>
              <p>
                Most loans in Ghana use an amortization schedule where early payments consist primarily of interest, with the principal portion increasing over time. Understanding this structure helps you make informed decisions about extra payments and loan refinancing opportunities.
              </p>

              <p>
                Making additional principal payments early in the loan term can significantly reduce the total interest paid over the life of the loan. Our calculator helps you understand these dynamics by showing the total interest cost upfront.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Loan Application Process in Ghana</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Pre-qualification:</strong> Initial assessment of your borrowing capacity</li>
                <li><strong>Application Submission:</strong> Complete loan application with required documentation</li>
                <li><strong>Document Verification:</strong> Lender verifies your income, employment, and identity</li>
                <li><strong>Credit Assessment:</strong> Review of your credit history and repayment capacity</li>
                <li><strong>Loan Approval:</strong> Final approval decision and loan terms confirmation</li>
                <li><strong>Disbursement:</strong> Loan funds are released to your account</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Required Documentation for Loan Applications</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Valid Ghana Card or other acceptable identification</li>
                <li>Proof of income (salary slips, bank statements, tax returns)</li>
                <li>Employment letter and contract</li>
                <li>Bank statements for the past 3-6 months</li>
                <li>Proof of residence (utility bills, rental agreement)</li>
                <li>Business registration documents (for business loans)</li>
                <li>Collateral documentation (for secured loans)</li>
                <li>Guarantor information (if required)</li>
              </ul>

              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-blue-800 mb-2">Important Loan Disclaimer</h4>
                <p className="text-blue-700 text-sm">
                  This loan calculator provides estimates based on the information you input and should be used for informational purposes only.
                  Actual loan terms, interest rates, and monthly payments may vary based on your creditworthiness, the lender's policies, and current market conditions.
                  Always consult with qualified financial advisors and compare multiple lenders before making borrowing decisions.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold text-green-800 mb-2">Need More Financial Calculators?</h4>
                <p className="text-green-700 text-sm">
                  Explore our other financial calculators including the <a href="/" className="underline" title="Ghana Tax Calculator">Ghana Tax Calculator</a> for salary planning,
                  <a href="/ssnit" className="underline" title="SSNIT Benefits Calculator">SSNIT Benefits Calculator</a> for pension planning, and
                  <a href="/vat" className="underline" title="VAT Calculator Ghana">VAT Calculator</a> for business tax calculations.
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

export default LoanCalculator;

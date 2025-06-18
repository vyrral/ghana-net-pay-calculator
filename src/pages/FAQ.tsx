import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate are the Ghana tax calculations in your calculator?",
      answer: "Our calculator uses the most current Ghana tax bands and rates as approved by the Ghana Revenue Authority (GRA) for 2024. We update our calculations immediately when tax policies change and regularly audit our algorithms against official GRA publications. However, this tool is for informational purposes only - for official calculations and personalized tax advice, please consult with GRA or a qualified tax professional."
    },
    {
      question: "What is SSNIT and how are contributions calculated?",
      answer: "SSNIT (Social Security and National Insurance Trust) is Ghana's national social security scheme providing retirement, invalidity, and survivors' benefits. Employee contributions are calculated as 5.5% of gross monthly income, while employers contribute 13.5%. These contributions fund your future pension, invalidity benefits, and provide life insurance coverage for your beneficiaries."
    },
    {
      question: "How does Ghana's 3-tier pension system work?",
      answer: "Ghana's 3-Tier Pension System:\n\nTier 1 – SSNIT (Social Security and National Insurance Trust):\n• Mandatory for all formal sector workers.\n• Total Contribution: 13.5% of gross salary (from the employer) and 5.5% from the employee, totaling 18.5%, not 19%.\n• Managed by SSNIT.\n• Provides monthly pensions upon retirement based on a formula that considers your average salary and years of contribution.\n• Covers other contingencies like invalidity and survivor benefits.\n\nTier 2 – Mandatory Occupational Pension Scheme:\n• Also mandatory.\n• 5% of the employee's gross salary (carved out of the 18.5% total contribution).\n• Managed by private pension fund managers licensed by the National Pensions Regulatory Authority (NPRA).\n• Benefits are lump-sum payments upon retirement or separation, with better returns due to investment flexibility.\n\nTier 3 – Voluntary Provident Fund / Personal Pension Scheme:\n• Voluntary.\n• Open to both formal and informal sector workers.\n• Contributions are flexible (usually 1–16.5% of salary).\n• Offers tax advantages: contributions are tax-deductible up to a limit, and investment income is tax-exempt if conditions are met.\n• Designed for long-term savings, accessible before retirement under certain conditions.\n\nCorrection Notes:\n• The correct total mandatory contribution to Tiers 1 and 2 is 18.5%, not 19%.\n• Tier 2 is not an additional 5%; it is part of the 18.5%, specifically carved out from the employer's portion.\n• Employees don't make a separate 5% Tier 2 contribution; it's deducted from the employer's 13.5%."
    },
    {
      question: "What allowances are taxable under Ghana's PAYE system?",
      answer: "All allowances including housing, transport, utility, meal, and other cash allowances are fully taxable under Ghana's PAYE system. They are added to your basic salary to calculate gross income, which then determines your tax liability. Only specific reliefs approved by GRA can reduce your taxable income."
    },
    {
      question: "What types of tax relief can I claim in Ghana?",
      answer: "Common tax reliefs in Ghana include: dependent spouse relief, child education relief (for children under 18 in full-time education), disabled dependent relief, life insurance premium relief, mortgage interest relief, and contributions to approved pension schemes. Specific amounts and conditions are set by GRA and may change annually."
    },
    {
      question: "Why does my calculated net income differ from my actual pay slip?",
      answer: "Differences may arise from: additional deductions not included in our calculator (union dues, loan repayments, insurance premiums), different tax relief amounts, employer-specific deductions, or timing differences in tax calculations. Our calculator shows standard statutory deductions - your employer may have additional deductions specific to your employment contract."
    },
    {
      question: "Can I use this calculator for annual tax calculations?",
      answer: "Our calculator is designed for monthly salary calculations. For annual calculations, multiply monthly results by 12, but remember that annual tax calculations may involve additional considerations like annual bonuses (which may be taxed differently), annual tax reliefs, and end-of-year adjustments that aren't captured in monthly calculations."
    },
    {
      question: "What are the current PAYE tax bands for Ghana in 2024?",
      answer: "The 2024 Ghana monthly PAYE tax bands are: First GH₵ 494 (0% tax), Next GH₵ 110 (5% tax), Next GH₵ 130 (10% tax), Next GH₵ 3,167 (17.5% tax), Next GH₵ 356 (25% tax), and amounts above GH₵ 4,257 (30% tax). These rates are progressive, meaning you only pay higher rates on income within each band."
    },
    {
      question: "Is my personal financial information stored when using this calculator?",
      answer: "No, we prioritize your privacy and security. All calculations are performed locally in your browser without sending any personal or financial information to external servers. We don't store, collect, or transmit any data you enter into the calculator. Your financial information remains completely private and secure."
    },
    {
      question: "How can I save or share my tax calculation results?",
      answer: "Our calculator includes a 'Download PDF' feature in the tax breakdown section, allowing you to save detailed calculation results for your records. You can also take screenshots or manually record the information. We recommend keeping records of your calculations for personal financial planning and potential tax consultations."
    },
    {
      question: "What is the difference between gross salary and taxable income?",
      answer: "Gross salary is your total income including basic salary and all allowances before any deductions. Taxable income for PAYE purposes is calculated as: Gross Salary minus SSNIT contribution (5.5%) minus approved tax reliefs. This taxable income is then used to calculate your PAYE income tax using Ghana's progressive tax bands."
    },
    {
      question: "How do I know if I'm paying the correct amount of tax?",
      answer: "Compare our calculator results with your pay slip. If there are significant differences, check: 1) Are all allowances included? 2) Are tax reliefs correctly applied? 3) Are there additional deductions not shown? 4) Is your employer using current tax tables? For discrepancies, consult your HR department or contact GRA directly for clarification."
    },
    {
      question: "Can employers use this calculator for payroll processing?",
      answer: "While our calculator provides accurate estimates based on current tax laws, employers should use official GRA-approved payroll systems for actual payroll processing. Our tool is excellent for salary negotiations, employee education, and verification of payroll calculations, but official payroll systems include additional features required for compliance and reporting."
    },
    {
      question: "What happens to my SSNIT contributions if I work abroad?",
      answer: "SSNIT has reciprocal agreements with several countries allowing contribution portability. If you work in a country without such agreements, you may be able to continue voluntary contributions to maintain your benefits. Contact SSNIT directly to understand your options and ensure your benefits are protected when working internationally."
    },
    {
      question: "How often do Ghana's tax rates and SSNIT contribution rates change?",
      answer: "Tax rates typically change through annual budget announcements by the Ministry of Finance, usually presented in March and implemented from January. SSNIT contribution rates are more stable but can change through parliamentary approval. We monitor all official announcements and update our calculator within 24 hours of any rate changes to ensure accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions - Ghana Tax Calculator & SSNIT Guide
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Find comprehensive answers to common questions about Ghana's tax system, PAYE calculations, SSNIT contributions, 
            and pension planning. Updated regularly to reflect current GRA regulations and SSNIT policies.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Common Tax and Salary Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional SEO Content */}
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Understanding Ghana's Tax System - Complete Guide</h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Ghana's tax system, administered by the <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Ghana Revenue Authority">Ghana Revenue Authority (GRA)</a>, 
                operates on progressive principles designed to ensure fair taxation across all income levels. Our comprehensive FAQ addresses 
                the most common questions about tax calculations, SSNIT contributions, and pension planning in Ghana.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Key Tax Concepts Every Ghanaian Should Know</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Progressive Tax System</h4>
              <p>
                Ghana uses a progressive tax system where tax rates increase with income levels. This means higher earners pay higher 
                percentages on their income above certain thresholds, while lower-income earners benefit from reduced rates or 
                tax-free allowances on their initial income.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">PAYE (Pay As You Earn) System</h4>
              <p>
                PAYE is the system through which income tax is deducted directly from employee salaries by employers. This ensures 
                consistent tax collection and reduces the burden of annual tax filing for most employees. Employers are responsible 
                for calculating, deducting, and remitting PAYE tax to GRA monthly.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Tax Relief and Deductions</h4>
              <p>
                Tax reliefs reduce your taxable income, potentially lowering your overall tax liability. These are legal ways to 
                minimize tax burden while supporting government policy objectives like encouraging family responsibility, education, 
                and retirement savings.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">SSNIT and Pension Planning FAQs</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Understanding Your SSNIT Statement</h4>
              <p>
                SSNIT provides annual statements showing your contribution history, projected benefits, and account status. 
                Regular review of these statements helps ensure accuracy and assists in retirement planning. You can access 
                your statement through SSNIT's online portal or visit any SSNIT office.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Pension Benefit Calculations</h4>
              <p>
                Your SSNIT pension benefits depend on your contribution history, average monthly salary, and years of contribution. 
                The formula considers your best 60 months of contributions over your entire working life, providing some protection 
                against salary fluctuations and career breaks.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Advanced Tax Planning Strategies</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Salary Structuring for Tax Efficiency</h4>
              <p>
                While all monetary benefits are taxable, understanding how different components of your compensation package 
                are treated can help in salary negotiations. Non-monetary benefits and specific allowances may have different 
                tax implications, making professional tax advice valuable for high earners.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Retirement Planning with Multiple Pension Tiers</h4>
              <p>
                Maximizing benefits from all three pension tiers requires strategic planning. While Tier 1 (SSNIT) and Tier 2 
                are mandatory, optimizing Tier 3 contributions can provide significant tax advantages and enhanced retirement security. 
                The <a href="https://fairwages.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Fair Wages and Salaries Commission">Fair Wages and Salaries Commission</a> 
                provides guidelines for fair compensation that considers total retirement planning.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Common Mistakes to Avoid</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ignoring Tax Reliefs:</strong> Many taxpayers don't claim legitimate reliefs, paying more tax than necessary</li>
                <li><strong>Incomplete SSNIT Records:</strong> Gaps in contribution history can reduce pension benefits</li>
                <li><strong>Not Planning for Tier 3:</strong> Missing opportunities for additional tax-advantaged retirement savings</li>
                <li><strong>Salary Negotiation Oversight:</strong> Focusing only on gross salary without considering net impact</li>
                <li><strong>Ignoring Policy Changes:</strong> Not staying updated with annual tax and pension policy changes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Resources for Further Information</h3>
              <p>
                For official information and personalized advice:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ghana Revenue Authority:</strong> <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Ghana Revenue Authority">www.gra.gov.gh</a> for tax regulations and updates</li>
                <li><strong>SSNIT:</strong> <a href="https://www.ssnit.org.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Social Security and National Insurance Trust">www.ssnit.org.gh</a> for pension information and services</li>
                <li><strong>Fair Wages Commission:</strong> <a href="https://fairwages.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Fair Wages and Salaries Commission">www.fairwages.gov.gh</a> for salary guidelines and fair wages</li>
                <li><strong>National Pensions Regulatory Authority:</strong> For Tier 2 and 3 pension regulations</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Still have questions about Ghana tax calculations?</h3>
            <p className="text-gray-600 mb-4">
              Our FAQ covers the most common questions, but tax situations can be complex and individual. For personalized advice 
              or questions not covered here, consider consulting with a qualified tax professional or contacting the relevant authorities directly.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
              title="Contact Ghana Tax Calculator Support"
            >
              Contact Us for More Help
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;

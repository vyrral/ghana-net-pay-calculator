
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Ghana Tax Calculator - Your Trusted Salary Calculation Tool</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Ghana Tax Calculator is the premier online tool for accurate salary calculations in Ghana. Developed with precision and updated regularly 
              to reflect the latest tax regulations from the <a href="https://gra.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Ghana Revenue Authority">Ghana Revenue Authority (GRA)</a>, 
              our platform serves thousands of Ghanaian employees, employers, HR professionals, and financial advisors who need reliable tax calculations.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission: Simplifying Ghana's Tax System</h2>
            <p>
              Understanding Ghana's tax system shouldn't be complicated. Our mission is to demystify tax calculations and provide every Ghanaian 
              with easy access to accurate salary computations. We bridge the gap between complex tax regulations and practical financial planning, 
              ensuring that everyone can make informed decisions about their income and career choices.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Tax Calculation Features</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">PAYE Tax Calculations</h3>
            <p>
              Our calculator implements Ghana's progressive PAYE tax system with complete accuracy. We use the official 2024 tax bands:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>First GH₵ 494:</strong> Tax-free threshold (0% rate)</li>
              <li><strong>Next GH₵ 110:</strong> 5% tax rate for low-income earners</li>
              <li><strong>Next GH₵ 130:</strong> 10% tax rate for moderate income</li>
              <li><strong>Next GH₵ 3,167:</strong> 17.5% tax rate for middle-income earners</li>
              <li><strong>Next GH₵ 356:</strong> 25% tax rate for higher income</li>
              <li><strong>Above GH₵ 4,257:</strong> 30% tax rate for highest earners</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">SSNIT Contribution Management</h3>
            <p>
              Our tool accurately calculates <a href="https://www.ssnit.org.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Social Security and National Insurance Trust">SSNIT</a> contributions 
              based on current rates. The 5.5% employee contribution is automatically computed from your gross income, ensuring compliance 
              with Ghana's social security requirements. We also provide detailed information about employer contributions (13.5%) 
              for comprehensive understanding of total pension investments.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Three-Tier Pension System Integration</h3>
            <p>
              Ghana's pension reform introduced a three-tier system designed to provide comprehensive retirement security:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Tier 1 (SSNIT):</strong> Basic national social security with guaranteed benefits</li>
              <li><strong>Tier 2:</strong> Mandatory occupational pension for enhanced retirement income</li>
              <li><strong>Tier 3:</strong> Voluntary additional savings for personalized retirement planning</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Tax Relief Optimization</h3>
            <p>
              Our calculator helps you maximize legitimate tax reliefs available under Ghana's tax laws. We provide guidance on:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Dependent spouse relief for married taxpayers</li>
              <li>Child education relief for parents with school-age children</li>
              <li>Disabled dependent relief for caregivers</li>
              <li>Life insurance premium relief for policy holders</li>
              <li>Mortgage interest relief for homeowners</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Our Ghana Tax Calculator?</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Regulatory Compliance and Accuracy</h3>
            <p>
              We maintain strict adherence to GRA regulations and update our calculations immediately when tax policies change. 
              Our development team works closely with tax professionals to ensure every computation meets official standards. 
              We regularly audit our algorithms against GRA publications and official tax tables.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">User-Centric Design</h3>
            <p>
              Designed with Ghana's diverse workforce in mind, our interface works seamlessly across all devices and internet connections. 
              Whether you're a teacher in rural Ghana or a banker in Accra, our responsive design ensures consistent functionality. 
              We've tested our platform with users across all educational backgrounds to ensure universal accessibility.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Comprehensive Calculation Breakdown</h3>
            <p>
              Unlike simple calculators, we provide detailed breakdowns showing exactly how your tax is calculated. This transparency 
              helps users understand their pay slips and make informed financial decisions. Our visual representations make complex 
              tax calculations easy to comprehend.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Supporting Ghana's Economic Development</h2>
            <p>
              By providing free, accurate tax calculations, we support Ghana's economic development goals. Informed taxpayers contribute 
              to better tax compliance, which funds essential public services. Our tool helps both employees and employers understand 
              their obligations and rights within Ghana's tax system.
            </p>

            <p>
              We align with the <a href="https://fairwages.gov.gh/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline" title="Fair Wages and Salaries Commission">Fair Wages and Salaries Commission's</a> objectives 
              of promoting fair compensation practices across Ghana. Our calculator helps ensure transparency in salary negotiations 
              and employment contracts across all sectors of Ghana's economy.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Excellence and Security</h2>
            <p>
              Built using modern web technologies, our calculator processes all calculations locally in your browser, ensuring complete 
              privacy of your financial information. We don't store personal data, and all calculations are performed in real-time 
              without sending information to external servers.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Regular Updates and Maintenance</h3>
            <p>
              Our team monitors GRA announcements, parliamentary tax policy changes, and SSNIT rate adjustments to ensure our 
              calculator remains current. We typically update our system within 24 hours of any official tax policy changes.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Educational Resources and Support</h2>
            <p>
              Beyond calculations, we provide comprehensive educational content about Ghana's tax system. Our FAQ section addresses 
              common questions, while our blog covers tax planning strategies, policy updates, and financial literacy topics 
              relevant to Ghanaian taxpayers.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional and Individual Use</h3>
            <p>
              Our calculator serves diverse users including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Individual employees planning their finances</li>
              <li>HR professionals processing payroll</li>
              <li>Employers calculating compensation packages</li>
              <li>Tax consultants verifying calculations</li>
              <li>Students learning about Ghana's tax system</li>
              <li>Job seekers evaluating offers</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Future Development and Innovation</h2>
            <p>
              We continuously enhance our platform based on user feedback and changing regulatory requirements. Planned features include 
              multi-year tax projections, comparative analysis tools, and integration with popular payroll systems used in Ghana.
            </p>

            <div className="bg-purple-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Get Started Today</h3>
              <p className="text-purple-700">
                Experience the most accurate and comprehensive tax calculator available for Ghana. Whether you're calculating your 
                current salary or planning for a new position, our tool provides the insights you need for informed financial decisions.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Accuracy Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                While we strive for complete accuracy and regularly update our calculations based on official sources, 
                this tool is for informational purposes only. For official tax calculations, please consult with the 
                Ghana Revenue Authority or qualified tax professionals. Individual circumstances may affect actual tax liability.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

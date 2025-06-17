
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Disclaimer</h1>
          
          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              The information provided by the Ghana Salary Calculator is for general informational purposes only. 
              All information on the site is provided in good faith, however we make no representation or warranty 
              of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, 
              or completeness of any information on the site.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tax Calculations</h2>
            <p>
              The tax calculations provided are estimates based on current tax rates and may not reflect your 
              actual tax liability. Tax laws and rates may change, and individual circumstances may affect your 
              actual tax obligations. We recommend consulting with a qualified tax professional for personalized advice.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">SSNIT Information</h2>
            <p>
              SSNIT contribution calculations are based on current rates and regulations. The Social Security and 
              National Insurance Trust (SSNIT) may update their contribution rates and policies. Please verify 
              current rates with SSNIT directly.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">No Professional Advice</h2>
            <p>
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred 
              as a result of the use of the site or reliance on any information provided on the site. Your use of 
              the site and your reliance on any information on the site is solely at your own risk.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">External Links</h2>
            <p>
              The site may contain links to other websites or content belonging to or originating from third parties. 
              We do not investigate, monitor, or check such external links for accuracy, adequacy, validity, 
              reliability, availability, or completeness.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;

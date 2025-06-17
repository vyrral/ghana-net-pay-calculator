
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Ghana Tax Calculator</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Our Ghana Tax Calculator is a comprehensive tool designed to help employees and employers 
              calculate accurate net income, PAYE income tax, and pension deductions according to Ghana's 
              current tax regulations.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Accurate PAYE tax calculations based on 2024 Ghana tax bands</li>
              <li>SSNIT (Social Security) deduction calculations</li>
              <li>Tier 2 pension scheme calculations</li>
              <li>Support for tax relief calculations</li>
              <li>Detailed tax breakdown showing each tax band</li>
              <li>Mobile-responsive design for use on any device</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 mb-4">
              Simply enter your monthly basic income, any allowances, and applicable tax relief. 
              Our calculator will automatically compute:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Your gross monthly income</li>
              <li>SSNIT deductions (5.5% of gross income)</li>
              <li>Tier 2 pension contributions (5% of gross income)</li>
              <li>PAYE income tax based on current tax bands</li>
              <li>Your final net take-home income</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ghana Tax Bands for 2024</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Current PAYE Tax Rates</h3>
              <ul className="text-gray-600 space-y-1">
                <li>First GH₵ 494: 0%</li>
                <li>Next GH₵ 110: 5%</li>
                <li>Next GH₵ 130: 10%</li>
                <li>Next GH₵ 3,167: 17.5%</li>
                <li>Next GH₵ 356: 25%</li>
                <li>Above GH₵ 4,257: 30%</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accuracy & Disclaimer</h2>
            <p className="text-gray-600 text-sm bg-yellow-50 p-4 rounded-lg">
              While we strive to ensure the accuracy of our calculations, this tool is for informational 
              purposes only. We cannot be held responsible for any errors or discrepancies. For official 
              tax calculations, please consult with a qualified tax professional or the Ghana Revenue Authority.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

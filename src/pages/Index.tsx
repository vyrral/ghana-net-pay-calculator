
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
            Ghana Tax Calculator - Calculate Your Net Salary & PAYE Tax
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Free online calculator for Ghana income tax, SSNIT contributions, and take-home salary
          </p>
        </div>
        <TaxCalculator />
      </div>
    </main>
    <Footer />
  </div>
);

export default Index;

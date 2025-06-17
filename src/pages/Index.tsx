
import TaxCalculator from "@/components/TaxCalculator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navigation />
    {/* Main Content */}
    <main className="flex-1 flex items-center justify-center p-4">
      <TaxCalculator />
    </main>
    <Footer />
  </div>
);

export default Index;

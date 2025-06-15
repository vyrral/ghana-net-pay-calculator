
import TaxCalculator from "@/components/TaxCalculator";

const Index = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Header */}
    <header className="w-full bg-purple-700 py-4 px-4 flex items-center justify-center shadow-sm">
      <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
        Salary Calculator
        <span className="text-[22px]" role="img" aria-label="Ghana flag">🇬🇭</span>
      </h1>
    </header>
    {/* Main Content */}
    <main className="flex-1 flex items-center justify-center p-4">
      <TaxCalculator />
    </main>
  </div>
);

export default Index;

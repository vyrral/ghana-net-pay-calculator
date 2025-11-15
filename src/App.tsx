
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import SSNITCalculator from "./pages/SSNITCalculator";
import SalaryPerHour from "./pages/SalaryPerHour";
import VATCalculator from "./pages/VATCalculator";
import WithholdingTaxCalculator from "./pages/WithholdingTaxCalculator";
import CSTCalculator from "./pages/CSTCalculator";
import Disclaimer from "./pages/Disclaimer";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import LoanCalculator from "./pages/LoanCalculator";
import USTaxCalculator from "./pages/USTaxCalculator";
import WhatsAppSticky from "@/components/WhatsappSticky";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ssnit" element={<SSNITCalculator />} />
          <Route path="/hourly" element={<SalaryPerHour />} />
          <Route path="/vat" element={<VATCalculator />} />
          <Route path="/wth-tax" element={<WithholdingTaxCalculator />} />
          <Route path="/cst" element={<CSTCalculator />} />
          <Route path="/loan" element={<LoanCalculator />} />
          <Route path="/us-tax" element={<USTaxCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppSticky />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

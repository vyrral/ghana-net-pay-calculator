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
import Disclaimer from "./pages/Disclaimer";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import LoanCalculator from "./LoanCalculator";
// ...
<Route path="/loan" component={LoanCalculator} />

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
          <Route path="/loan" element={<LoanCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* WhatsApp sticky button */}
      <a 
        href="https://wa.me/233274969899"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: "32px",
          textDecoration: "none"
        }}>
        <span role="img" aria-label="WhatsApp">💬</span>
      </a>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

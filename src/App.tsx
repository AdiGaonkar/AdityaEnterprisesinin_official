import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/Notfound";
import AboutPage from "./components/AboutPage";
import Contact from "./components/ContactSection";
import ServicesSection from "./components/ServicesSection";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Trendwise from "./pages/Trendwise";
import Gogas from "./pages/Gogas";
import GraphicDesign from "./pages/GraphicDesign";
import PosterBanner from "./pages/PosterBanner";
import Career from "./pages/Career";
import Apply from "./pages/Apply";
import Feedbackform from "./pages/Feedbackform";
import Products from "./pages/Products";
import AdminProducts from "./pages/AdminProducts";
import ProductView from "./pages/ProductView";
import Machines from "./pages/Machines";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/ServicesSection" element={<ServicesSection />} />
            <Route path="/Portfolio" element={<Portfolio />} />
            <Route path="/Trendwise" element={<Trendwise />} />
            <Route path="/Gogas" element={<Gogas />} />
            <Route path="/GraphicDesign" element={<GraphicDesign />} />
            <Route path="/PosterBanner" element={<PosterBanner />} />
            <Route path="/Career" element={<Career />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/Feedbackform" element={<Feedbackform />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/AdminProducts" element={<AdminProducts />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/Machines" element={<Machines />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

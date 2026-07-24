import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import DetalheEstrela from "./pages/DetalheEstrela";
import Comparador from "./pages/Comparador";
import NotFound from "./pages/NotFound";
import { ComparadorProvider } from "./context/ComparadorContext";

function RedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      sessionStorage.removeItem("redirect");
      navigate(redirect, { replace: true });
    }
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <ComparadorProvider>
      <RedirectHandler />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:slug" element={<DetalheEstrela />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </ComparadorProvider>
  );
}

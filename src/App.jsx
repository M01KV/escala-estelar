import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import DetalheEstrela from "./pages/DetalheEstrela";
import Comparador from "./pages/Comparador";
import NotFound from "./pages/NotFound";
import { ComparadorProvider } from "./context/ComparadorContext";

export default function App() {
  return (
    <ComparadorProvider>
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

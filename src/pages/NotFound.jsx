import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./NotFound.css";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="page not-found">
      <div className="container not-found__conteudo">
        <span className="not-found__ponto" aria-hidden="true" />
        <span className="eyebrow">Erro 404</span>
        <h1>Esta região do espaço está vazia.</h1>
        <p>
          Não encontramos nenhuma página em <code className="mono">{location.pathname}</code>.
          Ela pode ter sido movida ou nunca existiu neste catálogo.
        </p>
        <div className="not-found__acoes">
          <Button variante="primario" onClick={() => navigate("/")}>
            Voltar para o início
          </Button>
          <Button variante="fantasma" onClick={() => navigate("/catalogo")}>
            Ir ao catálogo
          </Button>
        </div>
      </div>
    </div>
  );
}

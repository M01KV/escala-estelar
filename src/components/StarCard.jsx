import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import { calcularDiametroVisual, formatarRaio } from "../utils/escala";
import "./StarCard.css";

export default function StarCard({ estrela, onComparar, jaSelecionada = false }) {
  const diametro = calcularDiametroVisual(estrela.raioSolar, { min: 14, max: 58 });

  return (
    <article className="star-card">
      <Link to={`/catalogo/${estrela.slug}`} className="star-card__link">
        <div className="star-card__palco">
          <span
            className="star-card__esfera"
            style={{
              width: diametro,
              height: diametro,
              background: `radial-gradient(circle at 32% 28%, #fff 0%, ${estrela.cor} 40%, ${estrela.cor} 100%)`,
              boxShadow: `0 0 ${diametro * 0.6}px ${diametro * 0.1}px ${estrela.cor}55`,
            }}
            aria-hidden="true"
          />
        </div>

        <div className="star-card__corpo">
          <div className="star-card__cabecalho">
            <h3>{estrela.nome}</h3>
            <Tooltip texto={`Classe espectral ${estrela.tipoEspectral}: define cor e temperatura da estrela.`}>
              <span
                className="star-card__classe"
                tabIndex={0}
                style={{ "--cor-classe": `var(--classe-${estrela.classe.toLowerCase()})` }}
              >
                {estrela.classe}
              </span>
            </Tooltip>
          </div>
          <p className="star-card__constelacao">{estrela.constelacao}</p>
          <dl className="star-card__stats">
            <div>
              <dt>Raio</dt>
              <dd className="mono">{formatarRaio(estrela.raioSolar)}</dd>
            </div>
            <div>
              <dt>Temp.</dt>
              <dd className="mono">{estrela.temperatura.toLocaleString("pt-BR")} K</dd>
            </div>
          </dl>
        </div>
      </Link>

      {onComparar && (
        <button
          type="button"
          className={`star-card__comparar ${jaSelecionada ? "star-card__comparar--ativo" : ""}`}
          onClick={() => onComparar(estrela)}
        >
          {jaSelecionada ? "✓ No comparador" : "+ Comparar"}
        </button>
      )}
    </article>
  );
}

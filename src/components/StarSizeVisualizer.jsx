import { calcularDiametroVisual, formatarRaio } from "../utils/escala";
import "./StarSizeVisualizer.css";

/**
 * Componente-assinatura do projeto: desenha uma ou mais estrelas em escala
 * logarítmica proporcional, sempre com o Sol como referência de fundo.
 */
export default function StarSizeVisualizer({ estrelas, tamanho = "grande" }) {
  const lista = Array.isArray(estrelas) ? estrelas : [estrelas];
  const max = tamanho === "grande" ? 220 : 120;
  const min = tamanho === "grande" ? 6 : 4;

  return (
    <div className={`visualizador visualizador--${tamanho}`}>
      <div className="visualizador__palco">
        {lista.map((estrela) => {
          const diametro = calcularDiametroVisual(estrela.raioSolar, { min, max });
          return (
            <div className="visualizador__item" key={estrela.slug}>
              <span
                className="visualizador__esfera"
                style={{
                  width: diametro,
                  height: diametro,
                  background: `radial-gradient(circle at 32% 28%, #fff 0%, ${estrela.cor} 38%, ${estrela.cor} 100%)`,
                  boxShadow: `0 0 ${Math.max(diametro * 0.5, 10)}px ${Math.max(
                    diametro * 0.12,
                    2
                  )}px ${estrela.cor}55`,
                }}
                title={`${estrela.nome} — ${formatarRaio(estrela.raioSolar)}`}
              />
              <p className="visualizador__legenda">{estrela.nome}</p>
              <p className="visualizador__valor mono">{formatarRaio(estrela.raioSolar)}</p>
            </div>
          );
        })}
      </div>
      <p className="visualizador__nota">
        Escala logarítmica — proporções reais entre estrelas extremamente grandes e
        pequenas não cabem em uma escala linear na tela.
      </p>
    </div>
  );
}

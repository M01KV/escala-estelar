import "./FeedbackMessage.css";

const ICONES = {
  vazio: "○",
  erro: "✕",
  info: "i",
};

/**
 * Mensagem contextual reutilizável para estados vazios, erros e avisos.
 * tipo: "vazio" | "erro" | "info"
 */
export default function FeedbackMessage({ tipo = "vazio", titulo, descricao, acao }) {
  return (
    <div className={`feedback feedback--${tipo}`} role={tipo === "erro" ? "alert" : "status"}>
      <span className="feedback__icone" aria-hidden="true">
        {ICONES[tipo]}
      </span>
      <div>
        <p className="feedback__titulo">{titulo}</p>
        {descricao && <p className="feedback__descricao">{descricao}</p>}
        {acao && <div className="feedback__acao">{acao}</div>}
      </div>
    </div>
  );
}

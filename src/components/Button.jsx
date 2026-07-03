import "./Button.css";

/**
 * Botão reutilizável com variantes visuais e micro-interação de hover/clique.
 * variante: "primario" | "fantasma" | "perigo"
 */
export default function Button({
  children,
  variante = "primario",
  tipo = "button",
  onClick,
  disabled = false,
  icone = null,
}) {
  return (
    <button
      type={tipo}
      className={`botao botao--${variante}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icone && <span className="botao__icone">{icone}</span>}
      <span>{children}</span>
    </button>
  );
}

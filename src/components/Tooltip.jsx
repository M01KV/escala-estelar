import { useId, useState } from "react";
import "./Tooltip.css";

/**
 * Tooltip acessível: funciona em hover e em foco de teclado.
 * Uso: <Tooltip texto="Explicação"><button>?</button></Tooltip>
 */
export default function Tooltip({ texto, children, posicao = "top" }) {
  const [visivel, setVisivel] = useState(false);
  const id = useId();

  return (
    <span
      className="tooltip"
      onMouseEnter={() => setVisivel(true)}
      onMouseLeave={() => setVisivel(false)}
      onFocus={() => setVisivel(true)}
      onBlur={() => setVisivel(false)}
    >
      {typeof children === "string" ? (
        <span tabIndex={0} aria-describedby={id} className="tooltip__trigger-text">
          {children}
        </span>
      ) : (
        <span aria-describedby={id}>{children}</span>
      )}
      <span
        id={id}
        role="tooltip"
        className={`tooltip__bubble tooltip__bubble--${posicao} ${
          visivel ? "tooltip__bubble--visible" : ""
        }`}
      >
        {texto}
      </span>
    </span>
  );
}

import { useEffect, useRef } from "react";
import Button from "./Button";
import "./Modal.css";

export default function Modal({ aberto, titulo, children, onConfirmar, onCancelar, textoConfirmar = "Confirmar" }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!aberto) return undefined;
    const aoTeclarEsc = (evento) => {
      if (evento.key === "Escape") onCancelar();
    };
    document.addEventListener("keydown", aoTeclarEsc);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", aoTeclarEsc);
  }, [aberto, onCancelar]);

  if (!aberto) return null;

  return (
    <div className="modal__overlay" onClick={onCancelar}>
      <div
        className="modal__painel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(evento) => evento.stopPropagation()}
      >
        <h3 id="modal-titulo">{titulo}</h3>
        <div className="modal__conteudo">{children}</div>
        <div className="modal__acoes">
          <Button variante="fantasma" onClick={onCancelar}>
            Cancelar
          </Button>
          <Button variante="primario" onClick={onConfirmar}>
            {textoConfirmar}
          </Button>
        </div>
      </div>
    </div>
  );
}

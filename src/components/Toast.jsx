import { useEffect } from "react";
import "./Toast.css";

/**
 * Notificação transitória de feedback (sucesso, erro ou aviso).
 * Some sozinha após `duracao` ms, a menos que `duracao` seja 0.
 */
export default function Toast({ mensagem, tipo = "sucesso", aberto, onFechar, duracao = 2600 }) {
  useEffect(() => {
    if (!aberto || duracao === 0) return undefined;
    const timer = setTimeout(onFechar, duracao);
    return () => clearTimeout(timer);
  }, [aberto, duracao, onFechar]);

  if (!aberto) return null;

  return (
    <div className={`toast toast--${tipo}`} role="status" aria-live="polite">
      <span className="toast__dot" aria-hidden="true" />
      <span>{mensagem}</span>
      <button className="toast__fechar" onClick={onFechar} aria-label="Fechar notificação">
        ×
      </button>
    </div>
  );
}

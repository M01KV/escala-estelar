import "./LoadingState.css";

export default function LoadingState({ texto = "Carregando dados estelares..." }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-state__orbit" aria-hidden="true">
        <span className="loading-state__core" />
        <span className="loading-state__satellite" />
      </span>
      <p>{texto}</p>
    </div>
  );
}

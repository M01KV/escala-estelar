import "./SearchBar.css";

export default function SearchBar({
  termo,
  onTermoChange,
  classes = [],
  classeAtiva,
  onClasseChange,
  placeholder = "Buscar estrela por nome ou constelação...",
}) {
  return (
    <div className="search-bar">
      <div className="search-bar__campo">
        <span className="search-bar__icone" aria-hidden="true">
          ⌕
        </span>
        <input
          type="text"
          value={termo}
          onChange={(evento) => onTermoChange(evento.target.value)}
          placeholder={placeholder}
          aria-label="Buscar estrela"
        />
        {termo && (
          <button
            className="search-bar__limpar"
            onClick={() => onTermoChange("")}
            aria-label="Limpar busca"
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {classes.length > 0 && (
        <div className="search-bar__filtros" role="group" aria-label="Filtrar por classe espectral">
          <button
            type="button"
            className={`search-bar__chip ${classeAtiva === null ? "search-bar__chip--ativo" : ""}`}
            onClick={() => onClasseChange(null)}
          >
            Todas
          </button>
          {classes.map((classe) => (
            <button
              key={classe}
              type="button"
              className={`search-bar__chip ${classeAtiva === classe ? "search-bar__chip--ativo" : ""}`}
              onClick={() => onClasseChange(classe)}
              style={{ "--cor-classe": `var(--classe-${classe.toLowerCase()})` }}
            >
              <span className="search-bar__chip-dot" />
              {classe}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ComparadorContext = createContext(null);

export const LIMITE_COMPARADOR = 4;

export function ComparadorProvider({ children }) {
  const [slugs, setSlugs] = useState([]);

  const adicionar = useCallback((slug) => {
    setSlugs((atual) => {
      if (atual.includes(slug)) return atual;
      if (atual.length >= LIMITE_COMPARADOR) return atual;
      return [...atual, slug];
    });
  }, []);

  const remover = useCallback((slug) => {
    setSlugs((atual) => atual.filter((item) => item !== slug));
  }, []);

  const limpar = useCallback(() => setSlugs([]), []);

  const definirTodos = useCallback((novosSlugs) => {
    setSlugs(novosSlugs.slice(0, LIMITE_COMPARADOR));
  }, []);

  const valor = useMemo(
    () => ({ slugs, adicionar, remover, limpar, definirTodos }),
    [slugs, adicionar, remover, limpar, definirTodos]
  );

  return <ComparadorContext.Provider value={valor}>{children}</ComparadorContext.Provider>;
}

export function useComparador() {
  const contexto = useContext(ComparadorContext);
  if (!contexto) {
    throw new Error("useComparador deve ser usado dentro de um ComparadorProvider");
  }
  return contexto;
}

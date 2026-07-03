import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import StarSizeVisualizer from "../components/StarSizeVisualizer";
import FeedbackMessage from "../components/FeedbackMessage";
import LoadingState from "../components/LoadingState";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import { buscarEstrelasPorSlugs } from "../services/estrelasService";
import { useComparador, LIMITE_COMPARADOR } from "../context/ComparadorContext";
import { formatarRaio } from "../utils/escala";
import "./Comparador.css";

export default function Comparador() {
  const { slugs, remover, limpar, definirTodos } = useComparador();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [estrelas, setEstrelas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [toastAberto, setToastAberto] = useState(Boolean(location.state?.vindoDoDetalhe));

  const sincronizouUrl = useRef(false);

  // Na primeira renderização, se a URL já trouxer estrelas (link compartilhado),
  // usamos isso para popular a seleção.
  useEffect(() => {
    if (sincronizouUrl.current) return;
    sincronizouUrl.current = true;
    const daUrl = searchParams.get("estrelas");
    if (daUrl) {
      definirTodos(daUrl.split(",").filter(Boolean));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mantém a URL sincronizada com a seleção atual, tornando o comparador compartilhável.
  useEffect(() => {
    const proximos = new URLSearchParams(searchParams);
    if (slugs.length > 0) {
      proximos.set("estrelas", slugs.join(","));
    } else {
      proximos.delete("estrelas");
    }
    setSearchParams(proximos, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugs]);

  useEffect(() => {
    if (slugs.length === 0) {
      setEstrelas([]);
      return undefined;
    }
    let ativo = true;
    setCarregando(true);
    buscarEstrelasPorSlugs(slugs).then((dados) => {
      if (ativo) {
        setEstrelas(dados);
        setCarregando(false);
      }
    });
    return () => {
      ativo = false;
    };
  }, [slugs]);

  function confirmarLimpeza() {
    limpar();
    setModalAberto(false);
  }

  return (
    <div className="page">
      <div className="container">
        <span className="eyebrow">Comparador</span>
        <h1>Comparador de tamanhos</h1>
        <p className="comparador__intro">
          Escolha até {LIMITE_COMPARADOR} estrelas no catálogo para ver, lado a lado, a
          enorme diferença de escala entre elas. O link desta página é compartilhável.
        </p>

        {slugs.length === 0 && (
          <FeedbackMessage
            tipo="vazio"
            titulo="Nenhuma estrela selecionada"
            descricao="Visite o catálogo e clique em “+ Comparar” nas estrelas que quiser colocar lado a lado."
            acao={
              <Link to="/catalogo">
                <Button variante="primario">Ir ao catálogo</Button>
              </Link>
            }
          />
        )}

        {slugs.length > 0 && carregando && <LoadingState texto="Montando comparação..." />}

        {slugs.length > 0 && !carregando && estrelas.length > 0 && (
          <>
            <StarSizeVisualizer estrelas={estrelas} tamanho="grande" />

            <div className="comparador__lista">
              {estrelas.map((estrela) => (
                <div className="comparador__chip" key={estrela.slug}>
                  <span
                    className="comparador__chip-cor"
                    style={{ background: estrela.cor }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="comparador__chip-nome">{estrela.nome}</p>
                    <p className="comparador__chip-raio mono">{formatarRaio(estrela.raioSolar)}</p>
                  </div>
                  <button
                    className="comparador__chip-remover"
                    onClick={() => remover(estrela.slug)}
                    aria-label={`Remover ${estrela.nome} do comparador`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="comparador__rodape-acoes">
              <Link to="/catalogo">
                <Button variante="fantasma">+ Adicionar mais estrelas</Button>
              </Link>
              <Button variante="perigo" onClick={() => setModalAberto(true)}>
                Limpar comparador
              </Button>
            </div>
          </>
        )}
      </div>

      <Modal
        aberto={modalAberto}
        titulo="Limpar comparador?"
        onCancelar={() => setModalAberto(false)}
        onConfirmar={confirmarLimpeza}
        textoConfirmar="Limpar"
      >
        Isso removerá todas as {slugs.length} estrelas selecionadas. Essa ação não pode
        ser desfeita.
      </Modal>

      <Toast
        aberto={toastAberto}
        mensagem={`${location.state?.vindoDoDetalhe ?? ""} adicionada ao comparador.`}
        tipo="sucesso"
        onFechar={() => setToastAberto(false)}
      />
    </div>
  );
}

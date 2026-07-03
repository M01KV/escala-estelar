import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarSizeVisualizer from "../components/StarSizeVisualizer";
import LoadingState from "../components/LoadingState";
import FeedbackMessage from "../components/FeedbackMessage";
import Tooltip from "../components/Tooltip";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { buscarEstrelaPorSlug } from "../services/estrelasService";
import { formatarDistancia } from "../utils/escala";
import { useComparador } from "../context/ComparadorContext";
import "./DetalheEstrela.css";

export default function DetalheEstrela() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { adicionar, slugs } = useComparador();

  const [estrela, setEstrela] = useState(undefined); // undefined = carregando, null = não encontrada
  const [toastAberto, setToastAberto] = useState(false);

  useEffect(() => {
    let ativo = true;
    setEstrela(undefined);
    buscarEstrelaPorSlug(slug).then((dados) => {
      if (ativo) setEstrela(dados);
    });
    return () => {
      ativo = false;
    };
  }, [slug]);

  function aoCompararAgora() {
    adicionar(slug);
    setToastAberto(true);
  }

  function aoIrParaComparador() {
    adicionar(slug);
    navigate("/comparador", { state: { vindoDoDetalhe: estrela.nome } });
  }

  if (estrela === undefined) {
    return (
      <div className="page">
        <div className="container">
          <LoadingState texto="Buscando dados da estrela..." />
        </div>
      </div>
    );
  }

  if (estrela === null) {
    return (
      <div className="page">
        <div className="container">
          <FeedbackMessage
            tipo="erro"
            titulo="Estrela não encontrada"
            descricao={`Não encontramos nenhuma estrela com o identificador "${slug}" no catálogo.`}
            acao={
              <Button variante="fantasma" onClick={() => navigate("/catalogo")}>
                Voltar ao catálogo
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page detalhe">
      <div className="container">
        <button className="detalhe__voltar" onClick={() => navigate("/catalogo")}>
          ← Voltar ao catálogo
        </button>

        <div className="detalhe__cabecalho">
          <div>
            <span className="eyebrow">{estrela.constelacao}</span>
            <h1>{estrela.nome}</h1>
          </div>
          <Tooltip texto="Classifica a estrela por temperatura e cor — de O (mais quente, azulada) a M (mais fria, avermelhada).">
            <span className="detalhe__tipo mono" tabIndex={0}>{estrela.tipoEspectral}</span>
          </Tooltip>
        </div>

        <p className="detalhe__descricao">{estrela.descricao}</p>

        <div className="detalhe__layout">
          <StarSizeVisualizer estrelas={[{ ...estrela }, { slug: "sol-ref", nome: "Sol (referência)", raioSolar: 1, cor: "#FFD97A" }]} />

          <dl className="detalhe__ficha">
            <div>
              <dt>Raio</dt>
              <dd className="mono">{estrela.raioSolar.toLocaleString("pt-BR")} raios solares</dd>
            </div>
            <div>
              <dt>Massa</dt>
              <dd className="mono">{estrela.massaSolar.toLocaleString("pt-BR")} massas solares</dd>
            </div>
            <div>
              <dt>Temperatura</dt>
              <dd className="mono">{estrela.temperatura.toLocaleString("pt-BR")} K</dd>
            </div>
            <div>
              <dt>Distância</dt>
              <dd className="mono">{formatarDistancia(estrela.distanciaAnoLuz)}</dd>
            </div>
          </dl>
        </div>

        <div className="detalhe__curiosidade">
          <span className="eyebrow">Curiosidade</span>
          <p>{estrela.curiosidade}</p>
        </div>

        <div className="detalhe__acoes">
          <Button variante="primario" onClick={aoIrParaComparador}>
            Comparar esta estrela
          </Button>
          <Button variante="fantasma" onClick={aoCompararAgora} disabled={slugs.includes(slug)}>
            {slugs.includes(slug) ? "Já está no comparador" : "Adicionar sem sair daqui"}
          </Button>
        </div>
      </div>

      <Toast
        aberto={toastAberto}
        mensagem={`${estrela.nome} adicionada ao comparador.`}
        tipo="sucesso"
        onFechar={() => setToastAberto(false)}
      />
    </div>
  );
}

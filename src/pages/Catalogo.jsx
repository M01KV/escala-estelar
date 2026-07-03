import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import StarCard from "../components/StarCard";
import LoadingState from "../components/LoadingState";
import FeedbackMessage from "../components/FeedbackMessage";
import Toast from "../components/Toast";
import { buscarEstrelas, CLASSES_ESPECTRAIS } from "../services/estrelasService";
import { useComparador, LIMITE_COMPARADOR } from "../context/ComparadorContext";
import "./Catalogo.css";

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [estrelas, setEstrelas] = useState(null);
  const [erro, setErro] = useState(null);
  const [toast, setToast] = useState({ aberto: false, mensagem: "", tipo: "sucesso" });

  const { slugs: selecionadas, adicionar } = useComparador();

  const termo = searchParams.get("busca") || "";
  const classeAtiva = searchParams.get("classe");

  useEffect(() => {
    let ativo = true;
    setErro(null);
    buscarEstrelas()
      .then((dados) => {
        if (ativo) setEstrelas(dados);
      })
      .catch(() => {
        if (ativo) setErro("Não foi possível carregar o catálogo de estrelas.");
      });
    return () => {
      ativo = false;
    };
  }, []);

  function atualizarTermo(novoTermo) {
    const proximos = new URLSearchParams(searchParams);
    if (novoTermo) {
      proximos.set("busca", novoTermo);
    } else {
      proximos.delete("busca");
    }
    setSearchParams(proximos, { replace: true });
  }

  function atualizarClasse(novaClasse) {
    const proximos = new URLSearchParams(searchParams);
    if (novaClasse) {
      proximos.set("classe", novaClasse);
    } else {
      proximos.delete("classe");
    }
    setSearchParams(proximos, { replace: true });
  }

  const filtradas = useMemo(() => {
    if (!estrelas) return [];
    return estrelas.filter((estrela) => {
      const combinaTermo =
        !termo ||
        estrela.nome.toLowerCase().includes(termo.toLowerCase()) ||
        estrela.constelacao.toLowerCase().includes(termo.toLowerCase());
      const combinaClasse = !classeAtiva || estrela.classe === classeAtiva;
      return combinaTermo && combinaClasse;
    });
  }, [estrelas, termo, classeAtiva]);

  function aoComparar(estrela) {
    if (selecionadas.length >= LIMITE_COMPARADOR && !selecionadas.includes(estrela.slug)) {
      setToast({
        aberto: true,
        tipo: "aviso",
        mensagem: `Limite de ${LIMITE_COMPARADOR} estrelas no comparador. Remova uma para adicionar outra.`,
      });
      return;
    }
    adicionar(estrela.slug);
    setToast({ aberto: true, tipo: "sucesso", mensagem: `${estrela.nome} adicionada ao comparador.` });
  }

  return (
    <div className="page">
      <div className="container">
        <span className="eyebrow">Catálogo</span>
        <h1>Estrelas catalogadas</h1>
        <p className="catalogo__intro">
          Busque por nome ou constelação, filtre por classe espectral e adicione
          estrelas ao comparador para ver suas escalas lado a lado.
        </p>

        <SearchBar
          termo={termo}
          onTermoChange={atualizarTermo}
          classes={CLASSES_ESPECTRAIS}
          classeAtiva={classeAtiva}
          onClasseChange={atualizarClasse}
        />

        {erro && (
          <FeedbackMessage
            tipo="erro"
            titulo="Erro ao carregar dados"
            descricao={erro}
          />
        )}

        {!erro && !estrelas && <LoadingState />}

        {!erro && estrelas && filtradas.length === 0 && (
          <FeedbackMessage
            tipo="vazio"
            titulo="Nenhuma estrela encontrada"
            descricao="Tente outro termo de busca ou remova o filtro de classe espectral."
          />
        )}

        {!erro && estrelas && filtradas.length > 0 && (
          <div className="catalogo__grade">
            {filtradas.map((estrela) => (
              <StarCard
                estrela={estrela}
                key={estrela.slug}
                onComparar={aoComparar}
                jaSelecionada={selecionadas.includes(estrela.slug)}
              />
            ))}
          </div>
        )}
      </div>

      <Toast
        aberto={toast.aberto}
        mensagem={toast.mensagem}
        tipo={toast.tipo}
        onFechar={() => setToast((atual) => ({ ...atual, aberto: false }))}
      />
    </div>
  );
}

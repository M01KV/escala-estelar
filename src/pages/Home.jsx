import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarSizeVisualizer from "../components/StarSizeVisualizer";
import StarCard from "../components/StarCard";
import LoadingState from "../components/LoadingState";
import Button from "../components/Button";
import { buscarEstrelasPorSlugs, buscarEstrelas } from "../services/estrelasService";
import "./Home.css";

const DESTAQUE_HERO = ["sol", "uy-scuti"];

export default function Home() {
  const [estrelasHero, setEstrelasHero] = useState(null);
  const [destaques, setDestaques] = useState(null);

  useEffect(() => {
    let ativo = true;
    buscarEstrelasPorSlugs(DESTAQUE_HERO).then((dados) => {
      if (ativo) setEstrelasHero(dados);
    });
    buscarEstrelas().then((dados) => {
      if (ativo) setDestaques(dados.filter((e) => ["betelgeuse", "sirius-a", "proxima-centauri"].includes(e.slug)));
    });
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <div className="page home">
      <section className="container home__hero">
        <div className="home__hero-texto">
          <span className="eyebrow">Escala Estelar</span>
          <h1>
            O Sol é gigante para nós. <br />
            Para o universo, é um grão de areia.
          </h1>
          <p className="home__hero-descricao">
            Catalogamos estrelas reais — da anã vermelha mais próxima às hipergigantes
            que engoliriam o Sistema Solar inteiro — para comparar seus tamanhos lado a
            lado, em escala.
          </p>
          <div className="home__hero-acoes">
            <Link to="/catalogo">
              <Button variante="primario">Explorar catálogo</Button>
            </Link>
            <Link to="/comparador">
              <Button variante="fantasma">Ir ao comparador</Button>
            </Link>
          </div>
        </div>

        <div className="home__hero-visual">
          {estrelasHero ? (
            <StarSizeVisualizer estrelas={estrelasHero} tamanho="grande" />
          ) : (
            <LoadingState texto="Calculando escala..." />
          )}
        </div>
      </section>

      <section className="container home__destaques">
        <div className="home__destaques-cabecalho">
          <h2>Algumas estrelas notáveis</h2>
          <Link to="/catalogo" className="home__ver-todas">
            Ver catálogo completo →
          </Link>
        </div>

        {destaques ? (
          <div className="home__grade">
            {destaques.map((estrela) => (
              <StarCard estrela={estrela} key={estrela.slug} />
            ))}
          </div>
        ) : (
          <LoadingState />
        )}
      </section>
    </div>
  );
}

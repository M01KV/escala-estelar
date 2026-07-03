import estrelas from "../data/estrelas.json";

// Simula a latência de uma requisição real a um servidor.
const ATRASO_MS = 500;

function atraso(ms = ATRASO_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simula GET /estrelas
 * Retorna a lista completa de estrelas a partir do JSON local.
 */
export async function buscarEstrelas() {
  await atraso();
  return [...estrelas];
}

/**
 * Simula GET /estrelas/:slug
 * Retorna uma estrela específica ou null caso não exista.
 */
export async function buscarEstrelaPorSlug(slug) {
  await atraso();
  const encontrada = estrelas.find((estrela) => estrela.slug === slug);
  return encontrada ? { ...encontrada } : null;
}

/**
 * Simula GET /estrelas?slugs=a,b,c
 * Retorna várias estrelas a partir de uma lista de slugs, na ordem pedida.
 */
export async function buscarEstrelasPorSlugs(slugs) {
  await atraso();
  return slugs
    .map((slug) => estrelas.find((estrela) => estrela.slug === slug))
    .filter(Boolean)
    .map((estrela) => ({ ...estrela }));
}

export const CLASSES_ESPECTRAIS = ["O", "B", "A", "F", "G", "K", "M"];

// Estrelas variam de ~0.1 a mais de 2000 raios solares — uma escala linear
// tornaria praticamente todas invisíveis ao lado das hipergigantes.
// Por isso usamos uma escala logarítmica para a representação visual,
// mantendo o valor real sempre exibido em texto ao lado.

const RAIO_MAXIMO_CONHECIDO = 2200; // folga acima da maior estrela do catálogo

export function calcularDiametroVisual(raioSolar, { min = 8, max = 220 } = {}) {
  const valor = Math.max(raioSolar, 0.01);
  const proporcaoLog = Math.log10(valor + 1) / Math.log10(RAIO_MAXIMO_CONHECIDO + 1);
  const proporcaoClamped = Math.min(Math.max(proporcaoLog, 0), 1);
  return Math.round(min + proporcaoClamped * (max - min));
}

export function formatarRaio(raioSolar) {
  if (raioSolar < 1) return `${raioSolar.toFixed(2)} R☉`;
  if (raioSolar < 10) return `${raioSolar.toFixed(1)} R☉`;
  return `${Math.round(raioSolar)} R☉`;
}

export function formatarDistancia(anosLuz) {
  if (anosLuz < 0.001) {
    const minutos = anosLuz * 525600;
    return `${minutos.toFixed(1)} min-luz`;
  }
  if (anosLuz < 1) return `${(anosLuz * 365.25).toFixed(1)} dias-luz`;
  return `${anosLuz.toLocaleString("pt-BR")} anos-luz`;
}

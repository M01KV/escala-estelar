# Escala Estelar

Catálogo e comparador de tamanhos reais de estrelas, construído como MVP da
disciplina de Desenvolvimento Front-end Avançado.

A ideia central: a diferença de tamanho entre estrelas é tão extrema que uma
escala linear simplesmente não cabe na tela — uma anã vermelha ao lado de uma
hipergigante como UY Scuti seria invisível. O projeto resolve isso com uma
visualização em **escala logarítmica**, sempre mostrando o valor real ao lado,
para que o usuário compare estrelas reais (raio, massa, temperatura,
distância) lado a lado de forma visualmente honesta.

## Funcionalidades

- **Catálogo** de 16 estrelas reais, com busca por nome/constelação e filtro
  por classe espectral (O, B, A, F, G, K, M).
- **Página de detalhe** de cada estrela, com ficha técnica completa e
  comparação visual contra o Sol.
- **Comparador**: selecione até 4 estrelas no catálogo e veja-as lado a lado
  em escala. A seleção fica salva na URL (`/comparador?estrelas=sol,rigel`),
  então o link pode ser compartilhado.
- Estados de carregamento, mensagens de "nenhum resultado encontrado",
  notificações (toasts) de sucesso/aviso e modal de confirmação antes de
  limpar o comparador.
- Layout responsivo (desktop, tablet e celular).
- Página 404 para rotas inexistentes.

## Tecnologias

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (`useNavigate`, `useParams`,
  `useLocation`, `useSearchParams`)
- CSS puro, organizado por componente (sem framework de UI)
- Dados simulados via arquivo JSON local, lidos por uma camada de serviço
  assíncrona (`src/services/estrelasService.js`) que imita uma requisição
  real a um servidor (incluindo latência artificial)

## Estrutura do projeto

```
src/
├── components/        # Componentes reutilizáveis (Header, StarCard, Modal, etc.)
├── context/            # Estado global da seleção do comparador (React Context)
├── data/               # estrelas.json — base de dados simulada
├── pages/               # Home, Catalogo, DetalheEstrela, Comparador, NotFound
├── services/            # Camada de acesso aos dados (simula chamadas de API)
├── styles/              # Tokens de design e estilos globais
├── utils/                # Funções de escala logarítmica e formatação
├── App.jsx              # Definição das rotas
└── main.jsx              # Ponto de entrada da aplicação
```

## Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm (instalado junto com o Node.js)

### Passos

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd escala-estelar
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra o endereço exibido no terminal (geralmente
   [http://localhost:5173](http://localhost:5173)).

### Outros comandos disponíveis

| Comando           | Descrição                                       |
| ------------------ | ------------------------------------------------ |
| `npm run dev`       | Inicia o servidor de desenvolvimento             |
| `npm run build`     | Gera a versão de produção na pasta `dist/`       |
| `npm run preview`   | Serve localmente o build de produção             |
| `npm run lint`      | Roda o linter (oxlint) sobre o código             |

## Dados simulados

Não há backend real: todas as informações vêm de
`src/data/estrelas.json`. A camada de serviço em
`src/services/estrelasService.js` expõe funções assíncronas
(`buscarEstrelas`, `buscarEstrelaPorSlug`, `buscarEstrelasPorSlugs`) que
simulam uma latência de rede antes de resolver, para que o restante da
aplicação trate os dados exatamente como trataria uma resposta de API.

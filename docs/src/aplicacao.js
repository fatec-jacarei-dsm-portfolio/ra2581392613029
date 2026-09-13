/* ==========================================================================
   PORTFÓLIO — Henrique Bueno
   JavaScript puro, em um único módulo.

  Por que um arquivo só: parte do conteúdo da página (projetos,
  certificados e habilidades...) é renderizado dinamicamente a partir de
  dadosSite.js. Comportamentos como
   o filtro de projetos, o modal de certificado e a animação de entrada
   dependem desses elementos já existirem no DOM. Com dois arquivos
   carregados separadamente, a ordem de execução não era garantida e
   esses comportamentos rodavam antes do conteúdo existir. Aqui a ordem
   é explícita: primeiro renderiza os dados, depois inicializa o que
   depende deles.
   ========================================================================== */

import { dadosPortfolio } from './data/dadosSite.js';

const estado = {
  idioma: 'pt'
};

const iconesPorCapa = {
  clipboard: '#icon-clipboard',
  cloud: '#icon-cloud',
  edit: '#icon-edit',
  trending: '#icon-trending',
  help: '#icon-help',
  cart: '#icon-cart'
};

const varianteCapaPorId = {
  taskflow: 'a',
  'clima-agora': 'b',
  shoplite: 'c',
  devblog: 'c',
  quizmaster: 'b'
};

/* ---------- Tradução ---------- */

// Resolve uma chave "secao.item" (ou "secao.sub.item") dentro de
// portfolioData, usando o idioma atual. Cada objeto folha tem o formato
// { pt: ..., en: ... }, então navegamos até o penúltimo nível e lemos
// [locale][ultimaChave] — ou [locale] direto se a folha for um array
// (como em "filters.0").
function traduzir(caminho) {
  const partes = caminho.split('.');
  const ultimaChave = partes.pop();
  const no = partes.reduce((acumulador, chave) => acumulador?.[chave], dadosPortfolio);
  if (!no) return '';
  const localizado = no[estado.idioma];
  if (localizado && ultimaChave in localizado) return localizado[ultimaChave] ?? '';

  const valor = no[ultimaChave];
  return valor?.[estado.idioma] ?? valor ?? '';
}

function aplicarTraducoesEstaticas() {
  document.documentElement.lang = estado.idioma === 'pt' ? 'pt-BR' : 'en';
  document.title = dadosPortfolio.metadados[estado.idioma].tituloPagina;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const valor = traduzir(el.dataset.i18n);
    if (valor) el.textContent = valor;
  });
}

/* ---------- Renderização de conteúdo dinâmico ---------- */

function renderizarIntroducaoSobre() {
  const el = document.getElementById('introducao-sobre');
  if (!el) return;
  el.textContent = dadosPortfolio.sobre.introducao[estado.idioma];
}

function renderizarDestaquesSobre() {
  const container = document.getElementById('destaques-sobre');
  if (!container) return;

  container.innerHTML = dadosPortfolio.sobre.destaques.map((item) => `
    <article class="cartao efeito-glow">
      <span class="cartao__icone">
        <svg class="icone" aria-hidden="true"><use href="#icon-${item.icone}"></use></svg>
      </span>
      <h3 class="cartao__titulo">${item.titulo[estado.idioma]}</h3>
      <p class="cartao__texto">${item.texto[estado.idioma]}</p>
    </article>
  `).join('');
}

function renderizarHabilidades() {
  const container = document.getElementById('grade-habilidades');
  if (!container) return;

  container.innerHTML = dadosPortfolio.habilidades.grupos.map((grupo) => {
    const icones = (grupo.icones || '').split(',').map((item) => item.trim()).filter(Boolean);

    return `
      <div class="habilidades__grupo">
        <h3 class="habilidades__grupo-titulo">${grupo.titulo[estado.idioma]}</h3>
        <div class="tecnologias">
          ${icones.map((icone) => `
            <div class="tecnologia tecnologia--habilidade">
              <img class="icone-habilidade" src="https://skillicons.dev/icons?i=${icone}" alt="${icone}" loading="lazy">
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderizarIdiomas() {
  const container = document.getElementById('lista-idiomas');
  if (!container) return;

  container.innerHTML = dadosPortfolio.idiomas.itens.map((item) => `
    <span class="idioma">${item.idioma[estado.idioma]} <strong>${item.nivel[estado.idioma]}</strong></span>
  `).join('');
}

function renderizarProjetos() {
  const container = document.getElementById('grade-projetos');
  if (!container) return;

  container.innerHTML = dadosPortfolio.projetos.map((projeto) => `
    <article class="cartao-projeto efeito-glow" data-categoria="${projeto.categoria}" data-projeto-id="${projeto.id}">
      <div class="cartao-projeto__midia cartao-projeto__midia--${varianteCapaPorId[projeto.id] || 'a'}">
        ${projeto.imagens?.length ? `
          <img class="cartao-projeto__imagem" src="${projeto.imagens[0]}" alt="Imagem do projeto ${projeto.titulo}" loading="lazy">
          ${projeto.imagens.length > 1 ? `
            <button type="button" class="galeria-projeto__controle galeria-projeto__controle--anterior" data-direcao="anterior" aria-label="Imagem anterior">‹</button>
            <button type="button" class="galeria-projeto__controle galeria-projeto__controle--proxima" data-direcao="proxima" aria-label="Próxima imagem">›</button>
          ` : ''}
        ` : `<svg class="icone icone--lg" aria-hidden="true"><use href="${iconesPorCapa[projeto.capa] || '#icon-code'}"></use></svg>`}
      </div>
      <div class="cartao-projeto__corpo">
        <h3 class="cartao-projeto__titulo">${projeto.titulo}</h3>
        <p class="cartao-projeto__descricao">${projeto.resumo[estado.idioma]}</p>
        <ul class="cartao-projeto__tags">
          ${projeto.tecnologias.map((tecnologia) => `<li>${tecnologia}</li>`).join('')}
        </ul>
        <div class="cartao-projeto__acoes">
          <button type="button" class="botao botao--sm botao--secundario botao--shine cartao-projeto__ver-mais">${dadosPortfolio.acoes[estado.idioma].verMais}</button>
          <a href="${projeto.demonstracao}" class="botao botao--sm botao--primario botao--gradiente">
            ${dadosPortfolio.acoes[estado.idioma].demo} <svg class="icone icone--sm" aria-hidden="true"><use href="#icon-external"></use></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

function iniciarGaleriasProjetos() {
  const container = document.getElementById('grade-projetos');
  if (!container) return;

  container.addEventListener('click', (event) => {
    const controle = event.target.closest('.galeria-projeto__controle');
    if (!controle) return;

    const cartao = controle.closest('.cartao-projeto');
    const projeto = dadosPortfolio.projetos.find((item) => item.id === cartao?.dataset.projetoId);
    const imagens = projeto?.imagens || [];
    if (!projeto || imagens.length < 2) return;

    const imagem = cartao.querySelector('.cartao-projeto__imagem');
    const indiceAtual = Number(cartao.dataset.imagemIndice || 0);
    const deslocamento = controle.dataset.direcao === 'proxima' ? 1 : -1;
    const novoIndice = (indiceAtual + deslocamento + imagens.length) % imagens.length;
    cartao.dataset.imagemIndice = String(novoIndice);
    imagem.src = imagens[novoIndice];
  });
}

function iniciarModalProjeto() {
  const modal = document.getElementById('modal-projeto');
  const container = document.getElementById('grade-projetos');
  const sobreposicao = document.getElementById('sobreposicao-modal-projeto');
  const botaoFechar = document.getElementById('fechar-modal-projeto');
  if (!modal || !container || !sobreposicao || !botaoFechar) return;

  const titulo = modal.querySelector('.modal__titulo');
  const descricao = modal.querySelector('.modal__descricao');
  const tecnologias = modal.querySelector('.modal__tecnologias');
  const imagem = modal.querySelector('.modal__projeto-imagem');
  const galeria = modal.querySelector('.modal__projeto-galeria');
  const controlesGaleria = modal.querySelectorAll('.modal__galeria-controle');
  const botaoDemo = modal.querySelector('.modal__demo');
  const botaoGithub = modal.querySelector('.modal__github');
  let ultimoFoco = null;
  let projetoAberto = null;
  let indiceImagem = 0;

  const fecharModal = () => {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (ultimoFoco) ultimoFoco.focus();
  };

  const abrirModal = (cartao) => {
    const projeto = dadosPortfolio.projetos.find((item) => item.id === cartao.dataset.projetoId);
    if (!projeto) return;

    ultimoFoco = document.activeElement;
    projetoAberto = projeto;
    indiceImagem = 0;
    titulo.textContent = projeto.titulo;
    descricao.textContent = projeto.descricao[estado.idioma];
    tecnologias.innerHTML = projeto.tecnologias.map((tecnologia) => `<li>${tecnologia}</li>`).join('');
    galeria.hidden = !projeto.imagens?.length;
    controlesGaleria.forEach((controle) => {
      controle.hidden = (projeto.imagens?.length || 0) < 2;
    });
    if (projeto.imagens?.length) {
      imagem.src = projeto.imagens[0];
      imagem.alt = `Imagem do projeto ${projeto.titulo}`;
    }
    botaoDemo.href = projeto.demonstracao;
    botaoGithub.href = projeto.repositorio;
    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    botaoFechar.focus();
  };

  container.addEventListener('click', (event) => {
    const botao = event.target.closest('.cartao-projeto__ver-mais');
    if (botao) abrirModal(botao.closest('.cartao-projeto'));
  });
  controlesGaleria.forEach((controle) => {
    controle.addEventListener('click', () => {
      const imagens = projetoAberto?.imagens || [];
      if (imagens.length < 2) return;
      const deslocamento = controle.dataset.direcao === 'proxima' ? 1 : -1;
      indiceImagem = (indiceImagem + deslocamento + imagens.length) % imagens.length;
      imagem.src = imagens[indiceImagem];
    });
  });
  sobreposicao.addEventListener('click', fecharModal);
  botaoFechar.addEventListener('click', fecharModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('aberto')) fecharModal();
  });
}

function renderizarCertificados() {
  const container = document.getElementById('grade-certificados');
  if (!container) return;

  container.innerHTML = dadosPortfolio.certificados.map((item) => `
    <article class="cartao-certificado efeito-glow" data-titulo-certificado="${item.titulo}" data-instituicao-certificado="${item.instituicao}" data-data-certificado="${item.data}" data-imagem-certificado="${item.imagem}">
      <div class="cartao-certificado__icone">
        <img class="cartao-certificado__logo" src="${item.logo}" alt="Logo de ${item.instituicao}" loading="lazy">
      </div>
      <h3 class="cartao-certificado__titulo">${item.titulo}</h3>
      <p class="cartao-certificado__instituicao">${item.instituicao}</p>
      <p class="cartao-certificado__data">
        <svg class="icone icone--sm" aria-hidden="true"><use href="#icon-calendar"></use></svg> ${item.data}
      </p>
      <button type="button" class="botao botao--sm botao--secundario botao--shine cartao-certificado__botao">${dadosPortfolio.acoes[estado.idioma].verCertificado}</button>
    </article>
  `).join('');
}

function renderizarLinksSociais() {
  const container = document.getElementById('links-sociais');
  if (!container) return;

  container.innerHTML = dadosPortfolio.linksSociais.map((item) => `
    <a class="contato__item efeito-glow" href="${item.endereco}" target="_blank" rel="noopener noreferrer">
      <span class="contato__icone"><svg class="icone" aria-hidden="true"><use href="#icon-${item.tipo}"></use></svg></span>
      <span>
        <strong>${item.rotulo}</strong>
        <span>${item.valor}</span>
      </span>
    </a>
  `).join('');
}

function renderizarTudo() {
  aplicarTraducoesEstaticas();
  renderizarIntroducaoSobre();
  renderizarDestaquesSobre();
  renderizarHabilidades();
  renderizarIdiomas();
  renderizarProjetos();
  renderizarCertificados();
  renderizarLinksSociais();
}

/* ---------- Idioma ---------- */
// Único responsável pelo botão de idioma: atualiza o estado, o visual
// do switch e chama applyStaticTranslations + os renders dinâmicos que
// mudam de texto (about, skills, projetos, certificados...).

function atualizarInterfaceIdioma() {
  const botao = document.getElementById('seletor-idioma');
  if (!botao) return;

  const inglesAtivo = estado.idioma === 'en';
  botao.classList.toggle('ingles', inglesAtivo);
  botao.setAttribute('aria-pressed', String(inglesAtivo));
  botao.setAttribute('aria-label', inglesAtivo ? 'Switch to Portuguese' : 'Switch to English');

  botao.querySelectorAll('.seletor-idioma__rotulo').forEach((rotulo) => {
    const ativo = rotulo.textContent.trim() === (inglesAtivo ? 'EN' : 'PT');
    rotulo.classList.toggle('ativo', ativo);
  });
}

function iniciarSeletorIdioma() {
  const botao = document.getElementById('seletor-idioma');
  if (!botao) return;

  atualizarInterfaceIdioma();

  botao.addEventListener('click', () => {
    estado.idioma = estado.idioma === 'pt' ? 'en' : 'pt';
    atualizarInterfaceIdioma();
    renderizarTudo();
    // Re-aplica o filtro de projetos ativo, já que os cards foram recriados.
    const filtroAtivo = document.querySelector('.filtro-projeto.ativo')?.dataset.filtro || 'todos';
    aplicarFiltroProjetos(filtroAtivo);
  });
}

/* ---------- Filtro de projetos ---------- */

function aplicarFiltroProjetos(categoria) {
  const botoes = document.querySelectorAll('.filtro-projeto');
  const cartoes = document.querySelectorAll('.cartao-projeto');

  cartoes.forEach((cartao) => {
    const deveMostrar = categoria === 'todos' || cartao.dataset.categoria === categoria;
    cartao.classList.toggle('oculto', !deveMostrar);
  });

  botoes.forEach((botao) => {
    const estaAtivo = botao.dataset.filtro === categoria;
    botao.classList.toggle('ativo', estaAtivo);
    botao.setAttribute('aria-pressed', String(estaAtivo));
  });
}

function iniciarFiltroProjetos() {
  const botoes = document.querySelectorAll('.filtro-projeto');
  if (!botoes.length) return;

  botoes.forEach((botao) => {
    botao.addEventListener('click', () => aplicarFiltroProjetos(botao.dataset.filtro));
  });

  aplicarFiltroProjetos('todos');
}

/* ---------- Modal de certificado ---------- */

function iniciarModalCertificado() {
  const modal = document.getElementById('modal-certificado');
  const container = document.getElementById('grade-certificados');
  const sobreposicao = document.getElementById('sobreposicao-modal-certificado');
  const botaoFechar = document.getElementById('fechar-modal-certificado');
  if (!modal || !container || !container.querySelector('.cartao-certificado__botao')) return;

  const titulo = modal.querySelector('.modal__titulo');
  const instituicao = modal.querySelector('.modal__instituicao');
  const data = modal.querySelector('.modal__data');
  const imagem = modal.querySelector('.modal__certificado-imagem');
  let ultimoFoco = null;

  const abrirModal = (cartao) => {
    ultimoFoco = document.activeElement;
    titulo.textContent = cartao.getAttribute('data-titulo-certificado') || '';
    instituicao.textContent = cartao.getAttribute('data-instituicao-certificado') || '';
    data.textContent = cartao.getAttribute('data-data-certificado') || '';
    imagem.src = cartao.getAttribute('data-imagem-certificado') || '';
    imagem.alt = `Imagem do certificado ${titulo.textContent}`;
    imagem.hidden = !imagem.src;
    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    botaoFechar.focus();
  };

  const fecharModal = () => {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (ultimoFoco) ultimoFoco.focus();
  };

  container.addEventListener('click', (event) => {
    const botao = event.target.closest('.cartao-certificado__botao');
    if (botao) abrirModal(botao.closest('.cartao-certificado'));
  });

  sobreposicao.addEventListener('click', fecharModal);
  botaoFechar.addEventListener('click', fecharModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('aberto')) fecharModal();
  });
}

/* ---------- Cabeçalho: rodapé, menu mobile, scroll ---------- */

function iniciarAnoRodape() {
  const elemento = document.getElementById('ano-rodape');
  if (elemento) elemento.textContent = String(new Date().getFullYear());
}

function iniciarMenuMobile() {
  const botao = document.getElementById('menu-botao');
  const links = document.getElementById('menu-links');
  if (!botao || !links) return;

  const fechar = () => {
    links.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu de navegação');
  };

  const abrir = () => {
    links.classList.add('aberto');
    botao.setAttribute('aria-expanded', 'true');
    botao.setAttribute('aria-label', 'Fechar menu de navegação');
  };

  botao.addEventListener('click', () => {
    links.classList.contains('aberto') ? fechar() : abrir();
  });

  links.querySelectorAll('a').forEach((link) => link.addEventListener('click', fechar));
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fechar();
  });
}

function iniciarEstadoCabecalho() {
  const cabecalho = document.getElementById('cabecalho-site');
  const progresso = document.getElementById('menu-progresso');
  if (!cabecalho) return;

  const atualizar = () => {
    cabecalho.classList.toggle('rolado', window.scrollY > 12);

    if (progresso) {
      const rolavel = document.documentElement.scrollHeight - window.innerHeight;
      const porcentagem = rolavel > 0 ? (window.scrollY / rolavel) * 100 : 0;
      progresso.style.width = `${porcentagem}%`;
    }
  };

  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
  window.addEventListener('resize', atualizar);
}

function iniciarNavegacaoAtiva() {
  const sections = document.querySelectorAll('main section[id]');
  const linksMenu = document.querySelectorAll('.menu__link');
  if (!sections.length || !linksMenu.length) return;

  const definirAtivo = (id) => {
    linksMenu.forEach((link) => {
      link.classList.toggle('ativo', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) definirAtivo(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function iniciarAnimacoesEntrada(movimentoReduzido) {
  const alvos = document.querySelectorAll(
    '.sobre__introducao, .cartao, .habilidades__grupo, .cartao-projeto, .cartao-certificado'
  );
  if (!alvos.length) return;

  if (movimentoReduzido) {
    alvos.forEach((elemento) => elemento.classList.add('entrada', 'visivel'));
    return;
  }

  alvos.forEach((elemento, indice) => {
    elemento.classList.add('entrada');
    elemento.style.transitionDelay = `${(indice % 3) * 70}ms`;
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  alvos.forEach((elemento) => observer.observe(elemento));
}

/* ---------- Inicialização ---------- */
// Ordem importa: primeiro tudo que RENDERIZA conteúdo (projetos,
// certificados, skills...), só depois tudo que DEPENDE desse conteúdo
// já estar no DOM (filtro, modal, animação de entrada).

function inicializarPortfolio() {
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderizarTudo();

  iniciarAnoRodape();
  iniciarMenuMobile();
  iniciarEstadoCabecalho();
  iniciarNavegacaoAtiva();
  iniciarSeletorIdioma();
  iniciarFiltroProjetos();
  iniciarGaleriasProjetos();
  iniciarModalProjeto();
  iniciarModalCertificado();
  iniciarAnimacoesEntrada(movimentoReduzido);
}

document.addEventListener('DOMContentLoaded', inicializarPortfolio);

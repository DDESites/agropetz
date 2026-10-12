/* =========================================================
   AGROPETZ — comportamento do site
   ---------------------------------------------------------
   CONFIGURAÇÃO RÁPIDA:
   - WHATSAPP_NUMERO: número real da loja no formato
     55 + DDD + número (sem espaços nem traços)
   - WHATSAPP_PRE_DEFINIDO = false desliga o número e os
     botões voltam a ser link de telefone (tel:)
   - Mensagens dos botões: atributos data-zap nos .html
   ========================================================= */

const WHATSAPP_NUMERO = "5561992914254";
const WHATSAPP_PRE_DEFINIDO = true;      // false = sem número definido ainda
const TELEFONO_EXIBICAO = "(61) 99291-4254";

/* ---------- Helpers ---------- */
function linkWhatsApp(mensagem) {
  if (!WHATSAPP_PRE_DEFINIDO) return "tel:+5561992914254";
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/* ---------- Ícones compartilhados (SVG inline) ---------- */
const ICONES = {
  zap: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7a11 11 0 0 0 4.2 3.7c.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.4z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`
};

/* ---------- Card de produto ---------- */
function criarCardProduto(produto) {
  const artigo = document.createElement("article");
  artigo.className = "card-produto revelar";

  const badge = produto.destaque
    ? `<span class="card-produto__badge">Mais vendido</span>`
    : "";

  const foto = produto.foto
    ? `<img src="${produto.foto}" alt="${escapar(produto.alt || produto.nome)}" loading="lazy" width="400" height="300">`
    : `<span class="card-produto__placeholder" aria-hidden="true">
         <svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="5.5" cy="10.5" rx="2" ry="2.6"/><ellipse cx="9.7" cy="6.7" rx="2" ry="2.6"/><ellipse cx="14.3" cy="6.7" rx="2" ry="2.6"/><ellipse cx="18.5" cy="10.5" rx="2" ry="2.6"/><path d="M12 11.5c2.7 0 5.4 2.2 5.4 4.9 0 2-1.6 3.3-3.5 3.3-1 0-1.4-.4-1.9-.4s-.9.4-1.9.4c-1.9 0-3.5-1.3-3.5-3.3 0-2.7 2.7-4.9 5.4-4.9z"/></svg>
       </span>`;

  const msgZap =
    `Olá! Vim pelo site da AGROPETZ e gostaria de consultar:\n` +
    `*${produto.nome}*\n\n` +
    `Pode me confirmar a disponibilidade e o preço?`;

  artigo.innerHTML = `
    <div class="card-produto__foto">${badge}${foto}</div>
    <div class="card-produto__corpo">
      <span class="card-produto__categoria">${escapar(produto.categoria)}</span>
      <h2>${escapar(produto.nome)}</h2>
      <p class="card-produto__desc">${escapar(produto.descricao)}</p>
      <span class="card-produto__preco">Consulte pelo WhatsApp</span>
      <a class="btn btn--coral btn--bloco btn--pequeno" href="${linkWhatsApp(msgZap)}"
         target="_blank" rel="noopener"
         aria-label="Consultar ${escapar(produto.nome)} pelo WhatsApp">
         ${ICONES.zap} Consultar
      </a>
    </div>
  `;
  return artigo;
}

/* ---------- Render de grade de produtos ---------- */
function renderizarProdutos(alvo, lista) {
  const caixa = document.getElementById(alvo);
  if (!caixa) return;

  if (lista.length === 0) {
    caixa.innerHTML = `
      <div class="estado-vazio">
        <img src="img/emblema.svg" alt="" aria-hidden="true">
        <h2>Nenhum item nesta categoria</h2>
        <p>Chame no WhatsApp que a equipe ajuda a encontrar o produto certo — ou avisa quando chegar.</p>
        <a class="btn btn--coral" href="${linkWhatsApp(
          "Olá! Vim pelo site da AGROPETZ e procuro um produto. Pode me ajudar?"
        )}" target="_blank" rel="noopener">${ICONES.zap} Falar com a equipe</a>
      </div>`;
    return;
  }

  caixa.innerHTML = "";
  lista.forEach((p) => caixa.appendChild(criarCardProduto(p)));
}

/* ---------- Catálogo: filtros por categoria ---------- */
function iniciarCatalogo() {
  const grade = document.getElementById("grade-produtos");
  if (!grade || typeof CATALOGO === "undefined") return;

  const limite = parseInt(grade.dataset.limite || "0", 10);
  const contador = document.getElementById("contador");
  const botoes = document.querySelectorAll(".filtro");
  let categoriaAtual = "todas";

  const param = new URLSearchParams(location.search).get("categoria");
  if (param && CATALOGO.some((p) => p.categoria === param)) categoriaAtual = param;

  function atualizar() {
    let lista = CATALOGO.filter(
      (p) => categoriaAtual === "todas" || p.categoria === categoriaAtual
    );
    if (limite > 0) lista = lista.slice(0, limite);

    renderizarProdutos("grade-produtos", lista);

    botoes.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.valor === categoriaAtual))
    );

    if (contador) {
      contador.textContent =
        lista.length === 1
          ? "1 item encontrado"
          : `${lista.length} itens encontrados`;
    }
  }

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      categoriaAtual = botao.dataset.valor;
      atualizar();
    });
  });

  atualizar();
}

/* ---------- Botões de WhatsApp ---------- */
function iniciarLinksZap() {
  document.querySelectorAll("[data-zap]").forEach((el) => {
    el.href = linkWhatsApp(el.dataset.zap);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* ---------- Cabeçalho: menu mobile + sombra ---------- */
function iniciarHeader() {
  const header = document.querySelector(".site-header");
  const botao = document.getElementById("btn-menu");
  const nav = document.getElementById("nav-principal");

  botao?.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  nav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("aberto");
      botao?.setAttribute("aria-expanded", "false");
    })
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("aberto")) {
      nav.classList.remove("aberto");
      botao?.setAttribute("aria-expanded", "false");
      botao?.focus();
    }
  });

  window.addEventListener(
    "scroll",
    () => header?.classList.toggle("sombra", window.scrollY > 8),
    { passive: true }
  );
}

/* ---------- Animação de entrada (discreta) ---------- */
function iniciarRevelar() {
  const itens = document.querySelectorAll(".revelar");
  if (!itens.length) return;

  // Sem IntersectionObserver ou com movimento reduzido, tudo fica visível
  // e sem animação (é o estado padrão do CSS).
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Anima apenas o que está bem abaixo da dobra. Conteúdo pouco abaixo do
  // primeiro corte (ex.: cabeçalho de seção que "espreita" o viewport) fica
  // visível por padrão, para nunca depender do JS nem depender de observer
  // disparar — assim nada pode ficar preso invisível.
  const MARGEM_ANIMACAO = 160;
  const abaixoDaDobra = [];
  itens.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top >= window.innerHeight + MARGEM_ANIMACAO) {
      el.classList.add("animavel");
      abaixoDaDobra.push(el);
    }
  });

  if (!abaixoDaDobra.length) return;

  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  abaixoDaDobra.forEach((el) => obs.observe(el));

  // Salvaguarda: alguns ambientes (aba em segundo plano, redimensionamento
  // abrupto) demoram ou não disparam o observer. Um fallback no scroll
  // garante que nada fique preso invisível.
  const revelarPendentes = () => {
    abaixoDaDobra.forEach((el) => {
      if (el.classList.contains("visivel")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("visivel");
        obs.unobserve(el);
      }
    });
    if (abaixoDaDobra.every((el) => el.classList.contains("visivel"))) {
      window.removeEventListener("scroll", agendarVerificacao);
    }
  };

  let pendente = false;
  const agendarVerificacao = () => {
    if (pendente) return;
    pendente = true;
    // setTimeout (e não rAF): rAF fica congelado em abas em segundo plano.
    setTimeout(() => {
      pendente = false;
      revelarPendentes();
    }, 120);
  };
  window.addEventListener("scroll", agendarVerificacao, { passive: true });

  // Rede de segurança pura: revela tudo de uma vez caso nenhum observer
  // chegue a disparar (ex.: renderização adiada, aba oculta, IO falho).
  // Nunca esconde nada: apenas garante que tudo fique visível.
  setTimeout(() => {
    abaixoDaDobra.forEach((el) => {
      el.classList.add("visivel");
      obs.unobserve(el);
    });
  }, 2500);
}

/* ---------- Formulário de contato ---------- */
function iniciarFormulario() {
  const form = document.getElementById("form-contato");
  if (!form) return;

  const sucesso = document.getElementById("form-sucesso");
  const btnZap = document.getElementById("sucesso-zap");

  const regras = {
    nome: (v) => v.trim().length >= 2 || "Informe seu nome.",
    contato: (v) => (/^[\d\s()+.-]{10,}$/.test(v.trim()) && v.replace(/\D/g, "").length >= 10)
      || "Informe um telefone ou WhatsApp com DDD.",
    mensagem: (v) => v.trim().length >= 10 || "Escreva uma mensagem com pelo menos 10 caracteres."
  };

  function validarCampo(campo) {
    const regra = regras[campo.name];
    if (!regra) return true;
    const resultado = regra(campo.value);
    const ok = resultado === true;
    const erro = document.getElementById(`erro-${campo.name}`);

    campo.setAttribute("aria-invalid", String(!ok));
    if (erro) {
      erro.classList.toggle("visivel", !ok);
      erro.textContent = ok ? "" : resultado;
    }
    return ok;
  }

  Object.keys(regras).forEach((nome) => {
    const campo = form.elements[nome];
    campo?.addEventListener("blur", () => validarCampo(campo));
    campo?.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const campos = Object.keys(regras).map((n) => form.elements[n]);
    const valido = campos.map(validarCampo).every(Boolean);
    if (!valido) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const dados = new FormData(form);
    const msg =
      `Olá! Vim pelo site da AGROPETZ e gostaria de falar com a equipe:\n\n` +
      `*Nome:* ${dados.get("nome")}\n` +
      `*Contato:* ${dados.get("contato")}\n` +
      (dados.get("animal") ? `*Animal:* ${dados.get("animal")}\n` : "") +
      (dados.get("assunto") ? `*Assunto:* ${dados.get("assunto")}\n` : "") +
      `\n*Mensagem:*\n${dados.get("mensagem")}`;

    if (btnZap) btnZap.href = linkWhatsApp(msg);

    form.querySelector(".campos")?.setAttribute("hidden", "");
    form.querySelector(".formulario__rodape")?.setAttribute("hidden", "");
    sucesso?.classList.add("visivel");
    sucesso?.focus();
  });

  document.getElementById("enviar-novamente")?.addEventListener("click", () => {
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
    form.querySelectorAll(".campo__erro").forEach((e) => e.classList.remove("visivel"));
    form.querySelector(".campos")?.removeAttribute("hidden");
    form.querySelector(".formulario__rodape")?.removeAttribute("hidden");
    sucesso?.classList.remove("visivel");
    form.elements["nome"]?.focus();
  });
}

/* ---------- Ano do rodapé ---------- */
function iniciarRodape() {
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  iniciarHeader();
  iniciarLinksZap();
  iniciarRodape();
  iniciarCatalogo();
  iniciarFormulario();
  iniciarRevelar();
});

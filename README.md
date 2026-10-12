# AGROPETZ — site institucional

**No ar:** https://ddesites.github.io/agropetz/ (GitHub Pages, branch `main`)
**Repositório:** https://github.com/DDESites/agropetz

Site responsivo para agropecuária e casa de ração, com identidade
**azul-marinho + verde-menta + coral**, tipografia arredondada
(Baloo 2 + Nunito), patinhas e formas orgânicas como detalhes.

## Estrutura

```
agropetz/
├── index.html        Início (banner, categorias, diferenciais, destaques,
│                     novidades/ofertas, localização, CTA)
├── produtos.html     Catálogo com filtros por categoria (sem checkout)
├── sobre.html        História, forma de trabalhar e compromissos
├── contato.html      WhatsApp, telefone, mapa, horários e formulário validado
├── css/style.css     Design system completo (paleta, tipografia, componentes)
├── js/main.js        Comportamento (menu, WhatsApp, catálogo, formulário)
├── js/catalogo.js    Dados dos produtos (edite aqui)
├── img/              Emblema, favicon e fotos
├── .capturas/         Printscreens das 4 páginas (desktop)
├── docs/PRD.md       Requisitos do projeto
├── README.md         Este arquivo
└── server.ps1        Servidor local opcional
```

## Como visualizar

Abra `index.html` no navegador, ou sirva a pasta localmente:

```powershell
# PowerShell (a partir da pasta agropetz)
python -m http.server 8080
# ou: .\server.ps1   (porta 8096)
# acesse http://localhost:8080
```

## Como atualizar o site no ar

O GitHub Pages publica automaticamente a branch `main`. Para atualizar:

```powershell
# a partir da pasta agropetz
git add -A
git commit -m "descreva a mudanca"
git push
```

Em ~1 minuto o https://ddesites.github.io/agropetz/ já reflete a mudança.

## Checklist antes de publicar (seções 7 e 8 do PRD)

- [x] **WhatsApp** — número real configurado em `js/main.js`
      (`5561992914254`, formato `55` + DDD + número).
- [x] **Telefone** — `(61) 99291-4254` atualizado em todas as páginas.
- [x] **Endereço** — Quadra 28, Jardim Brasília II — Águas Lindas de Goiás/GO,
      CEP 72917-567. Iframe do Google Maps e links de rota já estão nos
      blocos `.mapa` das páginas início e contato.
- [ ] **Horários de funcionamento** — abertura (08:00) confirmada via
      Google Maps; **falta confirmar o horário de fechamento e os dias** —
      quando confirmar, remova os selos **a confirmar** nas 4 páginas.
- [x] **Redes sociais** — Instagram configurado no rodapé das 4 páginas:
      `instagram.com/agropetz20`. (Facebook: removido por não ter página
      confirmada; basta religar o botão no rodapé se existir.)
- [ ] **Produtos** — edite `js/catalogo.js` (nome, categoria, descrição e
      foto). Substitua as fotos de exemplo por fotos reais dos produtos.
- [ ] **Nome e logo** — "AGROPETZ" é o nome provisório definido no PRD;
      troque nos títulos, rodapés e nos SVGs `img/emblema.svg` e
      `img/favicon.svg` caso o logotipo oficial já esteja disponível.
- [ ] **Fotos** — substitua as fotos ilustrativas por fotos autorizadas da
      loja, da equipe e dos produtos (salve em `img/`).
- [ ] **Metadados** — revise `title` e `meta description` de cada página
      após definir cidade e nome definitivo.

## Funcionalidades

- Layout responsivo (mobile, tablet e desktop) com menu compacto.
- Botões de WhatsApp com mensagem inicial configurável (`data-zap` nos HTML).
- Botão flutuante de WhatsApp fixo em todas as telas.
- Catálogo com filtros por categoria e links `?categoria=` no rodapé.
- Formulário de contato com validação e envio via WhatsApp.
- Links clicáveis: telefone, Instagram, Facebook, mapa.
- Acessibilidade: pular para o conteúdo, foco visível, `alt` nas imagens,
  contraste alto, `prefers-reduced-motion`, ordem de títulos lógica.
- SEO básico: title/description por página, Open Graph, favicon SVG.
- Animações discretas de entrada (IntersectionObserver), desligadas quando
  o sistema pede movimento reduzido.

## Sobre preços e dados não confirmados

Nenhum preço, endereço, telefone ou horário é apresentado como fato:
valores aparecem como "Consulte pelo WhatsApp" e os dados pendentes
estão marcados com o selo **a confirmar**. Remova cada selo apenas
quando o dado for confirmado pelo estabelecimento.

## Fotos

As imagens são ilustrativas (banco de imagens) e devem ser substituídas
por fotos reais e autorizadas da loja antes da publicação.

## Fora do escopo (primeira versão)

Pagamento online, controle de estoque em tempo real, entrega automatizada,
cálculo de frete, área do cliente, busca de produtos e avaliações —
conforme as seções 7 e 10 do PRD.

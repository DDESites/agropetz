/* =========================================================
   AGROPETZ — catálogo de produtos
   ---------------------------------------------------------
   Edite aqui para montar o catálogo real da loja.
   Campos:
   - nome        nome do produto
   - categoria   deve bater com os filtros:
                 "Rações" | "Petiscos" | "Acessórios" |
                 "Higiene e cuidados" | "Agropecuários"
   - descricao   texto curto (1 a 2 linhas)
   - foto        caminho da imagem (opcional) — deixe "" para
                 usar o cartão sem foto
   - alt         texto alternativo da imagem
   - destaque    true mostra a etiqueta "Destaque"
   ========================================================= */

const CATEGORIAS = [
  "Rações",
  "Petiscos",
  "Acessórios",
  "Higiene e cuidados",
  "Agropecuários"
];

const CATALOGO = [
  {
    nome: "Ração premium para cães adultos",
    categoria: "Rações",
    descricao: "Sacaria de ração completa para cães adultos, em vários pesos. Marcas e preços confirmados pelo WhatsApp.",
    foto: "img/prod-racao.jpg",
    alt: "Pote de ração cheio com patinhas de cachorro ao lado",
    destaque: true
  },
  {
    nome: "Ração para filhotes",
    categoria: "Rações",
    descricao: "Opções para filhotes em fase de crescimento, com orientação de quantidade por idade e porte.",
    foto: "img/prod-filhotes.jpg",
    alt: "Filhote de golden retriever correndo na grama",
    destaque: false
  },
  {
    nome: "Ração para gatos",
    categoria: "Rações",
    descricao: "Rações para gatos castrados, filhotes e adultos, seca ou úmida conforme a necessidade.",
    foto: "img/gato.jpg",
    alt: "Gato peludo deitado relaxando",
    destaque: false
  },
  {
    nome: "Biscoitos e petiscos para cães",
    categoria: "Petiscos",
    descricao: "Biscuits, ossos e premiações para treinar, premiar ou só para alegrar o dia.",
    foto: "img/prod-petisco.jpg",
    alt: "Biscoitos em forma de osso sobre fundo rosa",
    destaque: true
  },
  {
    nome: "Petiscos para gatos",
    categoria: "Petiscos",
    descricao: "Snacks e premiações para gatos, ideais para complementar a alimentação com moderação.",
    foto: "",
    alt: "",
    destaque: false
  },
  {
    nome: "Brinquedos e mordedores",
    categoria: "Acessórios",
    descricao: "Bolas, cordas e mordedores resistentes para gastar a energia de forma saudável.",
    foto: "img/prod-brinquedo.jpg",
    alt: "Brinquedo de morder em forma de osso vermelho",
    destaque: false
  },
  {
    nome: "Coleiras, guias e camas",
    categoria: "Acessórios",
    descricao: "Tamanho para cada porte, com conforto para o descanso e segurança para os passeios.",
    foto: "img/sobre-cuidado.jpg",
    alt: "Filhote de cachorro deitado coberto por um pano macio",
    destaque: false
  },
  {
    nome: "Shampoos e produtos de banho",
    categoria: "Higiene e cuidados",
    descricao: "Shampoos, condicionadores e acessórios para manter o pelo e a pele saudáveis.",
    foto: "img/prod-higiene.jpg",
    alt: "Cachorro golden sendo banhado por uma pessoa",
    destaque: false
  },
  {
    nome: "Areia higiênica e limpeza",
    categoria: "Higiene e cuidados",
    descricao: "Areias para gatos, panos, sacos de dejetos e tudo para manter a casa limpa.",
    foto: "",
    alt: "",
    destaque: false
  },
  {
    nome: "Antipulgas e antiparasitários",
    categoria: "Higiene e cuidados",
    descricao: "Pipetas, coleiras e sprays para proteger seu pet o ano inteiro. Orientamos a frequência de uso.",
    foto: "",
    alt: "",
    destaque: false
  },
  {
    nome: "Ração para aves e galinhas",
    categoria: "Agropecuários",
    descricao: "Rações e suplementos para galinhas, codornas e aves domésticas, em diversos pesos.",
    foto: "img/prod-aves.jpg",
    alt: "Galinhas laranjas em um terreiro",
    destaque: true
  },
  {
    nome: "Alimentação para roedores",
    categoria: "Agropecuários",
    descricao: "Rações e acessórios para hamsters, coelhos e outros pequenos animais da casa.",
    foto: "img/prod-roedores.jpg",
    alt: "Hamster creme sentado sobre um balcão",
    destaque: false
  },
  {
    nome: "Insumos para o campo",
    categoria: "Agropecuários",
    descricao: "Produtos agropecuários para a rotina da roça. Consulte disponibilidade e quantidades pelo WhatsApp.",
    foto: "",
    alt: "",
    destaque: false
  }
];

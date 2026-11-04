// A. Estado e variáveis com referência de elementos do DOM
if (localStorage.getItem("produtos-selecionados") === null) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

// B. Funções utilitárias

function criarProduto(produto) {
    const article = document.createElement("article");

    const titulo = document.createElement("h2");
    titulo.textContent = produto.title;
    article.append(titulo);

     const imagem = document.createElement("img");
      imagem.src = new URL(
        produto.image,
        "https://deisishop.pw.deisi.ulusofona.pt/"
      ).href;
    imagem.alt = produto.title;
    article.append(imagem);

    const descricao = document.createElement("p");
    descricao.textContent = produto.descricao;
    article.append(descricao);

    const preco = document.createElement("p");
    preco.textContent = `Custo total: ${produto.price} €`;;
    article.append(preco);

    const rating = document.createElement("p");
    rating.textContent = `Avaliação: ${produto.rating.rate} (${produto.rating.count} avaliações)`;
    article.append(rating);


    const botao = document.createElement("button");
    botao.textContent = "+ Adicionar ao Cesto";
    article.append(botao);

    botao.addEventListener("click", () => {
    const produtosSelecionados = JSON.parse(
      localStorage.getItem("produtos-selecionados")
    );

    // Adicionar o produto à lista
    produtosSelecionados.push(produto);

    // Guardar a lista atualizada
    localStorage.setItem("produtos-selecionados",JSON.stringify(produtosSelecionados));
  });

    return article;
}

function atualizaCesto() {
  const produtosSelecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados")
  ) || [];

  const divCesto = document.querySelector("#produtos-selecionados");
  const totalCesto = document.querySelector("#total-cesto");

  // Limpar os cartões anteriores antes de voltar a renderizar
  divCesto.innerHTML = "";

  let total = 0;

  produtosSelecionados.forEach((produto) => {
    const article = criaProdutoCesto(produto);
    divCesto.append(article);

    total += produto.price;
  });

  totalCesto.textContent = `Total: ${total.toFixed(2)} €`;
}

function criaProdutoCesto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h2");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.src = new URL(
    produto.image,
    "https://deisishop.pw.deisi.ulusofona.pt/"
    ).href;
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.className = "preco";
  preco.textContent = `Preço: ${produto.price} €`;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Remover do cesto";

  botao.addEventListener("click", () => {
    const produtosSelecionados = JSON.parse(
      localStorage.getItem("produtos-selecionados")
    ) || [];

    const indice = produtosSelecionados.findIndex(
      (item) => item.id === produto.id
    );

    if (indice !== -1) {
      produtosSelecionados.splice(indice, 1);

      localStorage.setItem(
        "produtos-selecionados",
        JSON.stringify(produtosSelecionados)
      );
    }

    // Voltar a mostrar o cesto e recalcular o total
    atualizaCesto();
  });

  article.append(titulo, imagem, preco, botao);

  return article;
}


// C. Event handlers
function renderizarProdutos(produtos){
    const div = document.querySelector("#produtos");
    produtos.forEach(produto => {
        const article = criarProduto(produto);
        div.append(article);
    });
}


// D. Event Listeners


// E. Inicialização

fetch('https://deisishop.pw.deisi.ulusofona.pt/products')
.then(response=> response.json())
.then(produtos=>{
  console.log(produtos)
  renderizarProdutos(produtos)
}).catch(error => {
  console.error("Erro ao carregar os produtos:", error);

});

atualizaCesto();

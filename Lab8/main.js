// A. Estado e variáveis com referência de elementos do DOM
if (localStorage.getItem("produtos-selecionados") === null) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}
let todosProdutos = [];

const categoria = document.querySelector("#categoria");
const ordenar = document.querySelector("#ordenar");
const pesquisa = document.querySelector("#pesquisa");


const checkout = document.querySelector("#checkout");
const comprar = document.querySelector("#comprar");
const mensagemCompra = document.querySelector("#mensagem-compra");
const valorFinal = document.querySelector("#valor-final");
const referencia = document.querySelector("#referencia");


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


    const preco = document.createElement("p");
    preco.textContent = `Custo total: ${produto.price} €`;;
    article.append(preco);

    const descricao = document.createElement("p");
      descricao.className = "descricao";
      descricao.textContent = produto.description;
      article.append(descricao);

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

     atualizaCesto();
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

const criarDadosCompra = (produtos) => {
  return {
    products: produtos.map(produto => produto.id),
    student: document.querySelector("#estudante").checked,
    coupon: document.querySelector("#cupao").value.trim()
  };
};


const tratarResposta = async (response) => {
  const resultado = await response.json();

  if (!response.ok || resultado.error) {
    throw new Error(
      resultado.error || `Erro na compra (${response.status}).`
    );
  }

  return resultado;
};


const mostrarCompra = (resultado) => {
  mensagemCompra.textContent = "";

  valorFinal.textContent =
    `Valor final a pagar: ${resultado.totalCost} €`;

  referencia.textContent =
    `Referência de pagamento: ${resultado.reference}`;
};

const enviarCompra = (dados) => {
  comprar.disabled = true;
  mensagemCompra.textContent = "A processar...";

  fetch("https://deisishop.pw.deisi.ulusofona.pt/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(tratarResposta)
    .then(mostrarCompra)
    .catch(error => {
      mensagemCompra.textContent = error.message;
    })
    .finally(() => {
      comprar.disabled = false;
    });
};

// Event listener
checkout.addEventListener("submit", (event) => {
  event.preventDefault();

  mensagemCompra.textContent = "";
  valorFinal.textContent = "";
  referencia.textContent = "";

  const produtos = JSON.parse(
    localStorage.getItem("produtos-selecionados")
  ) || [];

  if (produtos.length === 0) {
    mensagemCompra.textContent = "Adiciona produtos ao cesto primeiro.";
    return;
  }

  enviarCompra(criarDadosCompra(produtos));
});


// C. Event handlers
const renderizarProdutos = (produtos) => {
  const lista = document.querySelector("#produtos");

  lista.innerHTML = "";

  produtos.forEach((produto) => {
    lista.append(criarProduto(produto));
  });
};


const atualizarProdutos = () => {
  let produtos = todosProdutos.filter((produto) => {
    return (
      (categoria.value === "" || produto.category === categoria.value) &&
      produto.title.toLowerCase().includes(pesquisa.value.trim().toLowerCase())
    );
  });

  if (ordenar.value === "crescente") {
    produtos.sort((a, b) => a.price - b.price);
  }

  if (ordenar.value === "decrescente") {
    produtos.sort((a, b) => b.price - a.price);
  }

  renderizarProdutos(produtos);
};


// D. Event Listeners
categoria.addEventListener("change", atualizarProdutos);
ordenar.addEventListener("change", atualizarProdutos);
pesquisa.addEventListener("input", atualizarProdutos);

// E. Inicialização

fetch('https://deisishop.pw.deisi.ulusofona.pt/products')
  .then(response => response.json())
  .then(produtos => {
    console.log(produtos);

    todosProdutos = produtos;
    atualizarProdutos();
  })
  .catch(error => {
    console.error("Erro ao carregar os produtos:", error);
  });

fetch("https://deisishop.pw.deisi.ulusofona.pt/categories")
  .then(response => response.json())
  .then(categorias => {
    categorias.forEach(cat => {
      const option = document.createElement("option");

      option.value = cat.name;
      option.textContent = cat.name;

      categoria.append(option);
    });
  })
  .catch(error => {
    console.error("Erro ao carregar as categorias:", error);
  });

atualizaCesto();

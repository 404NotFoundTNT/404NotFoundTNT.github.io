let numero = 0;
let numeroAutomatico = 0;

// Eventos dos botões
document.querySelectorAll("button.color").forEach((button) => {
    button.addEventListener("click", () => {
        pintar(button.dataset.color);
    });
});
document.getElementById("botaoContar").addEventListener("click", contar);

// Evento do formulário
document.getElementById("formulario").addEventListener("submit", function (evento) {
    evento.preventDefault();
    apresentar();
});

// Alterar a cor de fundo da página
document.getElementById("cor").addEventListener("change", function () {
    document.body.style.backgroundColor = this.value;
});

// Alterar a direção das bolas
document.querySelector('#direcao').addEventListener('change', function () {
    document.querySelector('#container').style.flexDirection = this.value;
});

// Funções
function entrar() {
    const texto = document.getElementById("passar");

    texto.textContent = "1. Obrigado por passares!";
    texto.style.color = "blue";
}

function sair() {
    const texto = document.getElementById("passar");

    texto.textContent = "1. Passa por aqui!";
    texto.style.color = "black";
}

function pintar(cor) {
    document.getElementById("pintar").style.color = cor;
}

function escrever() {
    const texto = document.getElementById("texto");
    const cores = [
        "lightcoral",
        "peachpuff",
        "lightyellow",
        "lightgreen",
        "lightblue",
        "plum"
    ];

    if (texto.value.length === 0) {
        texto.style.backgroundColor = "white";
    } else {
        const indice = (texto.value.length - 1) % cores.length;
        texto.style.backgroundColor = cores[indice];
    }
}

function mudarFundo() {
    const cor = document.getElementById("cor").value;

    document.body.style.backgroundColor = cor;
}

function contar() {
    numero++;
    document.getElementById("contador").textContent = numero;
}

function reiniciar() {
    numero = 0;
    document.getElementById("contador").textContent = numero;
}

function apresentar() {
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value;

    if (nome === "") {
        document.getElementById("resultado").textContent =
            "Introduz o teu nome.";
        return;
    }

    document.getElementById("resultado").textContent =
        "Olá, o " + nome + " tem " + idade + "!";
}

const contarAutomaticamente = () => {
    numeroAutomatico++;

    document.getElementById("contadorAutomatico").textContent =
        "7. Automatic Counter: " + numeroAutomatico;
};

setInterval(contarAutomaticamente, 1000);

function mover() {
    document.getElementById("mensagem").textContent =
        "Estás a mover o rato sobre a imagem!";

    document.querySelector("img").style.borderColor = "blue";
}

function reporImagem() {
    document.getElementById("mensagem").textContent =
        "Move o rato sobre a imagem.";

    document.querySelector("img").style.borderColor = "transparent";
}



const contadorLocal = document.querySelector('#contadorLocal');
const incrementarLocal = document.querySelector('#incrementarLocal');
const decrementarLocal = document.querySelector('#decrementarLocal');
const resetLocal = document.querySelector('#resetLocal');

if (localStorage.getItem('counter') === null) {
  localStorage.setItem('counter', 0);
}

let valorLocal = Number(localStorage.getItem('counter'));

contadorLocal.textContent = valorLocal;


const atualizarContadorLocal = () => {
  contadorLocal.textContent = valorLocal;
  localStorage.setItem('counter', valorLocal);
};

const incrementarContadorLocal = () => {
  valorLocal++;
  atualizarContadorLocal();
};

const decrementarContadorLocal = () => {
  valorLocal--;
  atualizarContadorLocal();
};

const resetContadorLocal = () => {
  valorLocal = 0;
  atualizarContadorLocal();
};

incrementarLocal.addEventListener('click', incrementarContadorLocal);
decrementarLocal.addEventListener('click', decrementarContadorLocal);
resetLocal.addEventListener('click', resetContadorLocal);

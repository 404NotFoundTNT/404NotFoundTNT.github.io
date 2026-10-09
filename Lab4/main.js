let numero = 0;

// Cliques associados no JavaScript
document.getElementById("vermelho").addEventListener("click", function () {
    pintar("red");
});

document.getElementById("verde").addEventListener("click", function () {
    pintar("green");
});

document.getElementById("azul").addEventListener("click", function () {
    pintar("blue");
});

document.getElementById("botaoContar").addEventListener("click", contar);

// Funções dos eventos
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
    document.getElementById("texto").style.backgroundColor = "lightyellow";
}

function mudarFundo() {
    const cor = document.getElementById("cor").value.trim();

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

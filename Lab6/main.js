
const nodeInputNumero = document.querySelector("#numero");
const nodeInputSubmit = document.querySelector("#registar");
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotalCromos = document.querySelector("#colecao h3 span");

const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotalRepetidos = document.querySelector("#repetidos h3 span");

const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];

let totalRepetidos = repetidos.length;


function guardaCarta() {
    const numero = Number(nodeInputNumero.value);

    if (colecao.includes(numero)) {
        repetidos.push(numero);
        repetidos.sort((a, b) => a - b);

        totalRepetidos = repetidos.length;
        nodeTotalRepetidos.textContent = totalRepetidos;

        atualizaLista(repetidos, nodeUlRepetidos);
    } else {
        colecao.push(numero);
        colecao.sort((a, b) => a - b);

        nodeTotalCromos.textContent = colecao.length;

        atualizaLista(colecao, nodeUlColecao);
    }

    guardaDados();
}

function atualizaLista(lista, nodeUl) {
    nodeUl.innerHTML = "";

    lista.forEach((numero) => {
        const li = document.createElement("li");

        if (lista === repetidos) {
            li.innerHTML = `
                ${numero}
                <button type="button">Eliminar</button>
            `;
        } else {
            li.textContent = numero;
        }

        nodeUl.appendChild(li);
    });

    if (lista === repetidos) {
        associaEventosEliminar();
    }
}


const form = document.querySelector("form");

form.onsubmit = (event) => {
    event.preventDefault();
    guardaCarta();
};

function associaEventosEliminar() {
    const botoes = document.querySelectorAll("#repetidos button");

    botoes.forEach((botao, indice) => {
        botao.onclick = () => {
            repetidos.splice(indice, 1);

            totalRepetidos = repetidos.length;
            nodeTotalRepetidos.textContent = totalRepetidos;

            guardaDados();
            atualizaLista(repetidos, nodeUlRepetidos);
        };
    });
}

function guardaDados() {
    localStorage.setItem("colecao", JSON.stringify(colecao));
    localStorage.setItem("repetidos", JSON.stringify(repetidos));
}


atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);

nodeTotalCromos.textContent = colecao.length;
nodeTotalRepetidos.textContent = totalRepetidos;

let corFundo = document.querySelector("#cor");
let corMensagem = document.querySelector("#corMensagem");
let titulo = document.querySelector("#titulo");
let mensagem = document.querySelector("#mensagem");
let tamTexto = document.querySelector("#tamTexto");
let imagemInput = document.querySelector("#imagem");
let botao = document.querySelector("#botao");
let divTexto = document.querySelector("#divTexto");

let tituloCartao = document.querySelector("#titulo-cartao");
let mensagemCartao = document.querySelector("#mensagemCartao");
let cartaoFundo = document.querySelector(".cartao");
let imagemCartao = document.querySelector("#imagemCartao");


corFundo.addEventListener("input", function() {
    cartaoFundo.style.backgroundColor = corFundo.value;
});

corMensagem.addEventListener("input", function() {
    mensagemCartao.style.color = corMensagem.value;
});

titulo.addEventListener("input", function() {
    tituloCartao.textContent = titulo.value;
});

mensagem.addEventListener("input", function() {
    mensagemCartao.textContent = mensagem.value;
});

tamTexto.addEventListener("input", function() {
    mensagemCartao.style.fontSize = tamTexto.value + "px";
});

imagemInput.addEventListener("change", function() {
    let file = imagemInput.files[0];
    if (file) {
        imagemCartao.src = URL.createObjectURL(file);
    }
});

botao.addEventListener("click", function() {
    let adcDiv = document.createElement("div");
    adcDiv.classList.add("adcDiv");
    adcDiv.textContent = divTexto.value;
    adcDiv.style.padding = "10px";
    adcDiv.style.textAlign = "center";
    cartaoFundo.appendChild(adcDiv);
});





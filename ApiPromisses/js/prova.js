class minhaProva extends HTMLElement {

  constructor() {
    super();
    
    this.questoes = [];

    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 16px;
                color: #333;
                background-color: #ffffff;
                border: 2px solid #00d0ff;
                border-radius: 8px;
            }
            h2 {
                color: #000000;
                border-bottom: 2px solid #00d0ff;
                padding-bottom: 8px;
                text-align: center;
            }
            p {
                font-size: 16px;
                margin: 12px 0;
                font-weight: bold;
            }
            p.resposta-errada {
                color: #ff0000;
            }
            button {
                background-color: #000000a3;
                color: #fff;
                border: none;
                padding: 10px 20px;
                margin: 10px;
                cursor: pointer;
            }
            .resultado {
                font-size: 18px;
                font-weight: bold;
            }
        </style>
        <h2>Prova Objetiva</h2> 
        <div id="conteudo">
            Carregando prova...
        </div>
    `;
    fetch("json/prova.json")
        .then((response) => {

            if (!response.ok) {
                throw new Error("Erro ao carregar prova");
            }

            return response.json();
        })

        .then((dados) => {

            this.questoes = dados;

            this.render();

        })

        .catch((erro) => {

            console.error(erro);

            this.shadowRoot.querySelector("#conteudo").innerHTML = `
                <p>Erro ao carregar a prova.</p>
            `;
        });
  }

  render() {
        let valor = ``;
        this.questoes.forEach((questao, index) => {
        valor += `
            <div>
            <p>${questao.pergunta}</p>
                <label>
                <input type="radio" name="questao${index}" value="0">
                ${questao.opcao[0]}
                </label>

                <label>
                <input type="radio" name="questao${index}" value="1">
                ${questao.opcao[1]}
                </label>

                <label>
                <input type="radio" name="questao${index}" value="2">
                ${questao.opcao[2]}
                </label>
            </div>
        `;
        });

        valor += `<div id="resultado" class="resultado"></div>`;
        valor += `<button id="submit">Enviar Respostas</button>`;
        valor += `<button id="reset">Responder Novamente</button>`;
        this.shadowRoot.querySelector("#conteudo").innerHTML = valor;

        this.shadowRoot.querySelector('#submit').addEventListener('click',(event) => {
            this.confere();
        });

        this.shadowRoot.querySelector('#reset').addEventListener('click', (event) => {
            this.limpar();
        });
    }

    confere() {
        this.shadowRoot.querySelector('#resultado').innerHTML = ``;
        let nota = 0;
        this.questoes.forEach((questao, index) => {
            const resposta = this.shadowRoot.querySelector(`input[name="questao${index}"]:checked`);
                if (!resposta) {
                    this.shadowRoot.querySelector('#resultado').innerHTML += `
                        <p class="resposta-errada">
                            A questão ${index + 1} não foi respondida.
                        </p>
                    `;
                    return;
                }
                if (parseInt(resposta.value) === questao.resposta) {
                    nota++;
                } else {
                    this.shadowRoot.querySelector('#resultado').innerHTML += `<p class="resposta-errada">${questao.pergunta} - Resposta incorreta, a resposta correta é: ${questao.opcao[questao.resposta]}</p>`;
                }
        });
        this.shadowRoot.querySelector('#resultado').innerHTML += `
            <p>
                Sua nota é ${nota} de ${this.questoes.length}
            </p>
        `;
    }

    limpar() {
        this.shadowRoot.querySelectorAll('input[type="radio"]').forEach((input) => {
            input.checked = false;
        });
        this.shadowRoot.querySelector('#resultado').innerHTML = ``;
    }
}
customElements.define('minha-prova', minhaProva);
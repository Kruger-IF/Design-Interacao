class MinhaApi extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <style>
            .controle {
                display: block;
                padding: 16px;
                color: #333;
                background-color: #ffffff;
                border: 2px solid #00d0ff;
                border-radius: 8px;
                max-width: 500px;
                text-align: center;
            }
            .form {
                font-weight: bold;
                color: #000000;
            }
            .result{
                text-align: left;
                color: #000000;
            }
        </style>
        <section class="controle">

            <h2>Cadastro de Usuário</h2>

            <p>
                Nesta página você pode enviar seus dados para uma API.
                Após o envio, a API retornará uma resposta que será
                exibida abaixo.
            </p>

            <form id="formulario" class="form">

                <label for="nome">
                    Nome
                </label>

                <input
                    type="text"
                    id="nome"
                    required>

                <br><br>

                <label for="email">
                    E-mail
                </label>

                <input
                    type="email"
                    id="email"
                    required>

                <br><br>

                <button type="submit">
                    Enviar Dados
                </button>

            </form>

            <div id="resultado" class="result"></div>

        </section> 
        `;
    }
}
customElements.define('minha-api', MinhaApi);

const formulario =
document.querySelector("#formulario");

formulario.addEventListener("submit",function(event){

        event.preventDefault();

        const nome =
        document.querySelector("#nome").value.trim();

        const email =
        document.querySelector("#email").value.trim();

        const resultado =
        document.querySelector("#resultado");

        resultado.innerHTML =
        "<p>Enviando dados...</p>";

        fetch(
            "https://jsonplaceholder.typicode.com/users",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            }
        )

        .then((response) => {

            if(!response.ok){
                throw new Error(
                    "Erro ao enviar dados"
                );
            }

            return response.json();
        })

        .then((dados) => {

            resultado.innerHTML = `
                <h3>Dados enviados com sucesso</h3>

                <p>
                    A API recebeu os dados
                    informados.
                </p>

                <p>
                    ID gerado:
                    ${dados.id}
                </p>

                <p>
                    Nome:
                    ${nome}
                </p>

                <p>
                    Email:
                    ${email}
                </p>
            `;
        })

        .catch((erro) => {

            console.error(erro);

            resultado.innerHTML = `
                <p>
                    Ocorreu um erro ao
                    comunicar com a API.
                </p>
            `;
        });
    }
);
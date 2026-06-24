class Apis extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            section {
                display: block;
                padding: 16px;
                color: #333;
                background-color: #ffffff;
                border: 2px solid #00d0ff;
                border-radius: 8px;
                max-width: 500px;
                text-align: center;
            }
            .result{
                color: #000000;
                font-weight: bold;
            }
            .card{
                border: 2px solid #00d0ff;
                border-radius: 8px;
                padding: 16px;
                margin: 16px 0;
                background: #ffffff;
            }

            .card h3{
                color: #000;
                border-bottom: 2px solid #000000;
                padding-bottom: 8px;
            }
        </style>
        <section>
            <h2>Painel de Informações</h2>

            <p>
                Esta página consulta três APIs diferentes
                simultaneamente utilizando Promise.all().
            </p>

            <button id="carregar">
                Carregar Informações
            </button>

            <div id="resultado" class = "result">

                Clique no botão para carregar os dados.

            </div>

        </section>
        `;
    }

    connectedCallback(){
        const botao = this.shadowRoot.querySelector("#carregar");

        botao.addEventListener("click",() => this.carregarInformacoes());
    }
    

    carregarInformacoes(){

        const resultado = this.shadowRoot.querySelector("#resultado");

        resultado.innerHTML = "<p>Carregando informações...</p>";

        Promise.all([

            fetch(
                "https://brasilapi.com.br/api/feriados/v1/2026"
            ),

            fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=-32.03&longitude=-52.10&current_weather=true"
            ),

            fetch(
                "https://economia.awesomeapi.com.br/json/last/USD-BRL"
            )

        ])

        .then((responses)=>{

            responses.forEach((response)=>{

                if(!response.ok){

                    throw new Error(
                        `Erro HTTP ${response.status}`
                    );
                }

            });

            return Promise.all(
                responses.map(
                    (response)=>
                    response.json()
                )
            );

        })

        .then((dados)=>{

            const feriados = dados[0];

            const clima = dados[1];

            const dolar = dados[2].USDBRL;

            resultado.innerHTML = `

                <div class="card">

                    <h3>
                        Próximo Feriado (Ano/Mês/Dia)
                    </h3>

                    <p>
                        ${feriados[7].name}
                    </p>

                    <p>
                        ${feriados[7].date}
                    </p>

                </div>

                <div class="card">

                    <h3>Temperatura em Rio Grande/RS</h3>

                    <p>
                        Temperatura:
                        ${clima.current_weather.temperature} °C
                    </p>

                    <p>
                        Vento:
                        ${clima.current_weather.windspeed} km/h
                    </p>

                </div>

                <div class="card">

                    <h3>
                        Cotação do Dólar
                    </h3>

                    <p>
                        Compra:
                        R$ ${dolar.bid}
                    </p>

                    <p>
                        Venda:
                        R$ ${dolar.ask}
                    </p>

                </div>

            `;

        })

        .catch((erro)=>{

            console.error(erro);

            resultado.innerHTML = `

                <p>

                    Não foi possível carregar
                    as informações.

                </p>

            `;
        });
    }
}
customElements.define('tres-apis', Apis);


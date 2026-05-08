class meuSlot extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <template id="lista">
            <style>
                .lista {
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
                padding: 8px;
                border: 2px solid #00d0ff;
                border-radius: 5px;
                list-style-type: none;
                }
                ::slotted(p){
                border-top: 2px solid #000000;
                border-bottom: 2px solid #000000;
                }
                h2 {
                color: #000000;
                text-align: center;
                }
            </style>

            <section>
                <h2>${this.getAttribute('titulo')}</h2>
                <div class="lista">
                <slot name="item">ITEM</slot>
                </div>
            </section>
        </template>
        `;    
    const template = shadowRoot.querySelector('#lista');
    const templateContent = template.content;
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}
customElements.define('meu-slot', meuSlot);
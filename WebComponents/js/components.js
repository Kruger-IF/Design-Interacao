class MeuHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <header>
            <h1>Trabalhos de Victor Hugo Kruger</h1>
        </header>
        `;
    }
}
customElements.define('meu-header', MeuHeader);

class MeuNav extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <nav>
            <ul class="navigation">
                <li><a href="index.html">Apresentação</a></li>
                <li><a href="trabalho1.html">Trabalho 1</a></li>
                <li><a href="trabalho2.html">Trabalho 2</a></li>
                <li><a href="trabalho3.html">Trabalho 3</a></li>
            </ul>
        </nav>
        `;
    }
}
customElements.define('meu-nav', MeuNav);

class MeuFooter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <footer class="footer">
            <div class="footer-text">
                <p>Sempre a disposição!</p>
                <p>Victor Hugo Kruger - Design de Interação</p>
            </div>
        </footer>
        `;
    }
}
customElements.define('meu-footer', MeuFooter);

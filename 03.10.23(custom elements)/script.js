class AvatarElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['src', 'username'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ((name === 'src' || name === 'username') && oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const src = this.getAttribute('src');
        const username = this.getAttribute('username');
        
        // Аватарка
        const img = document.createElement('img');
        img.setAttribute('src', src);
        img.style.maxWidth = '50px';
        img.style.borderRadius = '50%';
        img.style.display = 'block';
        img.style.margin = '0 auto 6px';
        
        // Ник пользователя
        const usernameElement = document.createElement('p');
        usernameElement.textContent = username;
        usernameElement.style.textAlign = 'center';
        usernameElement.style.margin = '0';

        // Блок с аватаркой и ником
        const wrap = document.createElement('div');
        wrap.style.maxWidth = '100px';
        wrap.appendChild(img)
        wrap.appendChild(usernameElement)

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(wrap);
    }
}

customElements.define('avatar-element', AvatarElement);
class CardComponent extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
        .card {
            border: 1px dotted gray;
            border-radius: 4px;
            padding: 16px;
            margin-bottom: 16px;
        }

        .card-header {
            font-size: 20px;
            margin-bottom: 8px;
        }

        .card-content {
            font-size: 16px;
        }

        .card-image {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            margin-bottom: 16px;
        }
    </style>
    <div class="card">
        <slot name="image"></slot>
        <div class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
    </div>
    `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
    const contentSlot = this.shadowRoot.querySelector('slot[name="content"]');
    const imageSlot = this.shadowRoot.querySelector('slot[name="image"]');

    const headerText = this.getAttribute('header');
    const contentText = this.getAttribute('content');
    const imageUrl = this.getAttribute('image');

    const headerNode = document.createTextNode(headerText);
    const contentNode = document.createTextNode(contentText);

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageUrl);
    imageElement.setAttribute('alt', '');

    while (headerSlot.firstChild) {
      headerSlot.removeChild(headerSlot.firstChild);
    }

    while (contentSlot.firstChild) {
      contentSlot.removeChild(contentSlot.firstChild);
    }

    while (imageSlot.firstChild) {
      imageSlot.removeChild(imageSlot.firstChild);
    }

    headerSlot.appendChild(headerNode);
    contentSlot.appendChild(contentNode);
    imageSlot.appendChild(imageElement);
  }
}

customElements.define('card-component', CardComponent);
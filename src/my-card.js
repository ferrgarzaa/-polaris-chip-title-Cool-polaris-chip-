class MyCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "image", "link", "theme"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.openChanged = this.openChanged.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  openChanged(e) {
    if (e.target.open) {
      this.setAttribute("fancy", "");
    } else {
      this.removeAttribute("fancy");
    }
  }

  render() {
    const title = this.getAttribute("title") || "Card title";
    const image = this.getAttribute("image") || "";
    const link = this.getAttribute("link") || "#";
    const theme = this.getAttribute("theme") || "default";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: sans-serif;
        }

        .card {
          max-width: 400px;
          padding: 14px;
          border-radius: 16px;
          border: 3px solid rgba(0,0,0,0.25);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          background: #fff;
          color: #111;
        }

        .card.mcd {
          background: linear-gradient(135deg, #ff1e1e, #ffd600);
          color: #111;
        }

        .card.cfa {
          background: linear-gradient(135deg, #b30000, #ff5a1f);
          color: #fff;
        }

        .card.green {
          background: linear-gradient(135deg, #0b6b3a, #8ee07a);
          color: #0a0a0a;
        }

        .card.purple {
          background: linear-gradient(135deg, #4b1d8c, #b38bff);
          color: #fff;
        }

        .card.psu {
          background: linear-gradient(135deg, #001e44, #4a7bd0);
          color: #fff;
        }

        :host([fancy]) .card {
          background: var(--my-card-fancy-bg, pink);
          border: 2px solid fuchsia;
          box-shadow: 10px 5px 5px red;
        }

        h2 {
          margin: 0 0 10px;
          font-size: 28px;
          line-height: 1.1;
          min-height: 2.2em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        img {
          width: 100%;
          aspect-ratio: 16 / 9;
          height: auto;
          object-fit: cover;
          border-radius: 12px;
          background: #fff;
          display: block;
        }

        a.details {
          display: inline-block;
          margin-top: 14px;
          padding: 8px 14px;
          border-radius: 8px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-weight: 600;
        }

        a.details:hover { opacity: 0.85; }

        details summary {
          text-align: left;
          font-size: 18px;
          padding: 10px 0 6px;
          cursor: pointer;
        }

        details[open] summary { font-weight: 700; }

        details div {
          border: 2px solid rgba(0,0,0,0.25);
          border-radius: 10px;
          text-align: left;
          padding: 10px;
          height: 70px;
          overflow: auto;
          background: rgba(255,255,255,0.85);
          color: inherit;
        }

        .spacer { height: 8px; }
      </style>

      <section class="card ${theme}">
        <h2>${title}</h2>
        ${image ? `<img src="${image}" alt="${title}">` : ""}
        <div class="spacer"></div>

        <details ${this.hasAttribute("fancy") ? "open" : ""}>
          <summary>Description</summary>
          <div>
            <slot></slot>
          </div>
        </details>

        <a class="details" href="${link}" target="_blank" rel="noopener">Details</a>
      </section>
    `;

    const details = this.shadowRoot.querySelector("details");
    if (details) {
      details.removeEventListener("toggle", this.openChanged);
      details.addEventListener("toggle", this.openChanged);
    }
  }
}

customElements.define("my-card", MyCard);
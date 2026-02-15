class MyCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "image", "subtitle", "link", "theme"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Card title";
    const image = this.getAttribute("image") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const link = this.getAttribute("link") || "#";
    const theme = this.getAttribute("theme") || "default";

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        .card{
          max-width: 400px;
          padding: 14px;
          border-radius: 16px;
          border: 3px solid rgba(0,0,0,0.25);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          background: #fff;
          color: #111;
          font-family: sans-serif;
        }

        .card.mcd {
          background: linear-gradient(135deg, #ff1e1e, #ffd600);
          color: #111;
        }

        .card.cfa {
          background: linear-gradient(135deg, #b30000, #ff5a1f);
          color: #fff;
        }

        .card.psu {
          background: linear-gradient(135deg, #001e44, #4a7bd0);
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

        h2{
          margin: 0 0 10px;
          font-size: 28px;
        }

        p{
          margin: 12px 0 0;
          font-size: 16px;
        }

        img{
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          background: #fff;
          display: block;
        }

        a.details{
          display: inline-block;
          margin-top: 14px;
          padding: 8px 14px;
          border-radius: 8px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-weight: 600;
        }

        a.details:hover{ opacity: 0.85; }
      </style>

      <section class="card ${theme}">
        <h2>${title}</h2>
        ${image ? `<img src="${image}" alt="${title}" />` : ""}
        <p>${subtitle}</p>
        <a class="details" href="${link}" target="_blank" rel="noopener">Details</a>
      </section>
    `;
  }
}

customElements.define("my-card", MyCard);
import { LitElement, html, css } from "lit";

export class CounterApp extends LitElement {

  static get properties() {
    return {
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true }
    };
  }

  constructor() {
    super();
    // default values so it works alone
    this.counter = 0;
    this.min = 0;
    this.max = 25;
  }

  // makes sure counter stays between min and max
  _clampCounter() {
    if (this.counter < this.min) this.counter = this.min;
    if (this.counter > this.max) this.counter = this.max;
  }

  // decreases the number
  _decrement() {
    if (this.counter > this.min) {
      this.counter -= 1;
    }
  }

  // increases the number
  _increment() {
    if (this.counter < this.max) {
      this.counter += 1;
    }
  }

  // runs every time something updates
  updated(changedProperties) {
    if (changedProperties.has("counter")) {
      this._clampCounter();

      // if it hits 21, make confetti
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  // this triggers the confetti effect
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js")
      .then(() => {
        setTimeout(() => {
          const confetti = this.shadowRoot.querySelector("#confetti");
          if (confetti) {
            confetti.setAttribute("popped", "");
          }
        }, 0);
      });
  }

  // decides what color the number should be
  _numberClass() {
    if (this.counter === this.min) return "atMin";
    if (this.counter === this.max) return "atMax";
    if (this.counter === 21) return "at21";
    if (this.counter === 18) return "at18";
    return "normal";
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        padding: 16px;
        font-family: sans-serif;
      }

      .card {
        border-radius: 16px;
        padding: 16px;
        background: white;
        border: 2px solid rgba(0,0,0,0.15);
        min-width: 220px;
      }

      .number {
        font-size: 56px;
        font-weight: 800;
        text-align: center;
        margin-bottom: 16px;
        color: var(--ddd-theme-default-wonderPurple, purple);
      }

      .number.at18 {
        color: var(--ddd-theme-default-opportunityGreen, green);
      }

      .number.at21 {
        color: var(--ddd-theme-default-alertHigh, red);
      }

      .number.atMin {
        color: var(--ddd-theme-default-info, blue);
      }

      .number.atMax {
        color: var(--ddd-theme-default-warning, orange);
      }

      .buttons {
        display: flex;
        gap: 8px;
        justify-content: center;
      }

      button {
        width: 56px;
        height: 44px;
        border-radius: 12px;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
      }

      button[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }
    `;
  }

  render() {
    const atMin = this.counter === this.min;
    const atMax = this.counter === this.max;

    return html`
      <confetti-container id="confetti">
        <div class="card">
          <div class="number ${this._numberClass()}">
            ${this.counter}
          </div>

          <div class="buttons">
            <button @click=${this._decrement} ?disabled=${atMin}>-</button>
            <button @click=${this._increment} ?disabled=${atMax}>+</button>
          </div>
        </div>
      </confetti-container>
    `;
  }
}

customElements.define("counter-app", CounterApp);
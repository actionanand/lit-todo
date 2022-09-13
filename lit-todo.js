import { css as m, LitElement as u, html as h } from "lit";
import { property as i, customElement as a } from "lit/decorators.js";
var f = Object.defineProperty, y = Object.getOwnPropertyDescriptor, p = (c, o, n, r) => {
  for (var t = r > 1 ? void 0 : r ? y(o, n) : o, s = c.length - 1, l; s >= 0; s--)
    (l = c[s]) && (t = (r ? l(o, n, t) : l(t)) || t);
  return r && t && f(o, n, t), t;
};
let e = class extends u {
  constructor() {
    super(...arguments), this.name = "World", this.count = 0;
  }
  render() {
    return h`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }
  _onClick() {
    this.count++;
  }
  foo() {
    return "foo";
  }
};
e.styles = m`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
p([
  i()
], e.prototype, "name", 2);
p([
  i({ type: Number })
], e.prototype, "count", 2);
e = p([
  a("my-element")
], e);
export {
  e as MyElement
};

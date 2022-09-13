/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = window, G = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), Y = /* @__PURE__ */ new WeakMap();
class ot {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Z)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (G && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Y.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Y.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const dt = (o) => new ot(typeof o == "string" ? o : o + "", void 0, Z), ct = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, r) => i + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new ot(e, o, Z);
}, ut = (o, t) => {
  G ? o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = j.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  });
}, V = G ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return dt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var I;
const O = window, Q = O.trustedTypes, pt = Q ? Q.emptyScript : "", J = O.reactiveElementPolyfillSupport, B = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? pt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, nt = (o, t) => t !== o && (t == t || o == o), U = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: nt };
class f extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    (e = this.h) !== null && e !== void 0 || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = U) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const r = this[t];
      this[e] = s, this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || U;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(V(s));
    } else
      t !== void 0 && e.push(V(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return ut(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = U) {
    var s;
    const r = this.constructor._$Ep(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : B).toAttribute(e, i.type);
      this._$El = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const n = s.getPropertyOptions(r), d = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((i = n.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? n.converter : B;
      this._$El = r, this[r] = d.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || nt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, r) => this[r] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) === null || r === void 0 ? void 0 : r.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
f.finalized = !0, f.elementProperties = /* @__PURE__ */ new Map(), f.elementStyles = [], f.shadowRootOptions = { mode: "open" }, J == null || J({ ReactiveElement: f }), ((I = O.reactiveElementVersions) !== null && I !== void 0 ? I : O.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var L;
const H = window, m = H.trustedTypes, F = m ? m.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, $ = `lit$${(Math.random() + "").slice(9)}$`, rt = "?" + $, vt = `<${rt}>`, y = document, w = (o = "") => y.createComment(o), C = (o) => o === null || typeof o != "object" && typeof o != "function", lt = Array.isArray, $t = (o) => lt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, X = /-->/g, q = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), K = /'/g, tt = /"/g, ht = /^(?:script|style|textarea|title)$/i, _t = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), ft = _t(1), A = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), gt = (o, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let n = r._$litPart$;
  if (n === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = n = new T(t.insertBefore(w(), d), d, void 0, e != null ? e : {});
  }
  return n._$AI(o), n;
}, g = y.createTreeWalker(y, 129, null, !1), mt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", n = E;
  for (let l = 0; l < e; l++) {
    const h = o[l];
    let v, a, c = -1, p = 0;
    for (; p < h.length && (n.lastIndex = p, a = n.exec(h), a !== null); )
      p = n.lastIndex, n === E ? a[1] === "!--" ? n = X : a[1] !== void 0 ? n = q : a[2] !== void 0 ? (ht.test(a[2]) && (s = RegExp("</" + a[2], "g")), n = _) : a[3] !== void 0 && (n = _) : n === _ ? a[0] === ">" ? (n = s != null ? s : E, c = -1) : a[1] === void 0 ? c = -2 : (c = n.lastIndex - a[2].length, v = a[1], n = a[3] === void 0 ? _ : a[3] === '"' ? tt : K) : n === tt || n === K ? n = _ : n === X || n === q ? n = E : (n = _, s = void 0);
    const x = n === _ && o[l + 1].startsWith("/>") ? " " : "";
    r += n === E ? h + vt : c >= 0 ? (i.push(v), h.slice(0, c) + "$lit$" + h.slice(c) + $ + x) : h + $ + (c === -2 ? (i.push(void 0), l) : x);
  }
  const d = r + (o[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(o) || !o.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [F !== void 0 ? F.createHTML(d) : d, i];
};
class N {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const d = t.length - 1, l = this.parts, [h, v] = mt(t, e);
    if (this.el = N.createElement(h, i), g.currentNode = this.el.content, e === 2) {
      const a = this.el.content, c = a.firstChild;
      c.remove(), a.append(...c.childNodes);
    }
    for (; (s = g.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const a = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith($)) {
              const p = v[n++];
              if (a.push(c), p !== void 0) {
                const x = s.getAttribute(p.toLowerCase() + "$lit$").split($), P = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: r, name: P[2], strings: x, ctor: P[1] === "." ? At : P[1] === "?" ? Et : P[1] === "@" ? St : k });
              } else
                l.push({ type: 6, index: r });
            }
          for (const c of a)
            s.removeAttribute(c);
        }
        if (ht.test(s.tagName)) {
          const a = s.textContent.split($), c = a.length - 1;
          if (c > 0) {
            s.textContent = m ? m.emptyScript : "";
            for (let p = 0; p < c; p++)
              s.append(a[p], w()), g.nextNode(), l.push({ type: 2, index: ++r });
            s.append(a[c], w());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === rt)
          l.push({ type: 2, index: r });
        else {
          let a = -1;
          for (; (a = s.data.indexOf($, a + 1)) !== -1; )
            l.push({ type: 7, index: r }), a += $.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function b(o, t, e = o, i) {
  var s, r, n, d;
  if (t === A)
    return t;
  let l = i !== void 0 ? (s = e._$Cl) === null || s === void 0 ? void 0 : s[i] : e._$Cu;
  const h = C(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), h === void 0 ? l = void 0 : (l = new h(o), l._$AT(o, e, i)), i !== void 0 ? ((n = (d = e)._$Cl) !== null && n !== void 0 ? n : d._$Cl = [])[i] = l : e._$Cu = l), l !== void 0 && (t = b(o, l._$AS(o, t.values), l, i)), t;
}
class yt {
  constructor(t, e) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : y).importNode(i, !0);
    g.currentNode = r;
    let n = g.nextNode(), d = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (d === h.index) {
        let v;
        h.type === 2 ? v = new T(n, n.nextSibling, this, t) : h.type === 1 ? v = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (v = new wt(n, this, t)), this.v.push(v), h = s[++l];
      }
      d !== (h == null ? void 0 : h.index) && (n = g.nextNode(), d++);
    }
    return r;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class T {
  constructor(t, e, i, s) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$C_ = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$C_;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = b(this, t, e), C(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== A && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : $t(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== u && C(this._$AH) ? this._$AA.nextSibling.data = t : this.k(y.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = N.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.m(i);
    else {
      const n = new yt(r, this), d = n.p(this.options);
      n.m(i), this.k(d), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new N(t)), e;
  }
  O(t) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new T(this.S(w()), this.S(w()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$C_ = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class k {
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0)
      t = b(this, t, e, 0), n = !C(t) || t !== this._$AH && t !== A, n && (this._$AH = t);
    else {
      const d = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = b(this, d[i + l], e, l), h === A && (h = this._$AH[l]), n || (n = !C(h) || h !== this._$AH[l]), h === u ? t = u : t !== u && (t += (h != null ? h : "") + r[l + 1]), this._$AH[l] = h;
    }
    n && !s && this.P(t);
  }
  P(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class At extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const bt = m ? m.emptyScript : "";
class Et extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== u ? this.element.setAttribute(this.name, bt) : this.element.removeAttribute(this.name);
  }
}
class St extends k {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = b(this, t, e, 0)) !== null && i !== void 0 ? i : u) === A)
      return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class wt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    b(this, t);
  }
}
const it = H.litHtmlPolyfillSupport;
it == null || it(N, T), ((L = H.litHtmlVersions) !== null && L !== void 0 ? L : H.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var R, z;
class S extends f {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = gt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return A;
  }
}
S.finalized = !0, S._$litElement$ = !0, (R = globalThis.litElementHydrateSupport) === null || R === void 0 || R.call(globalThis, { LitElement: S });
const st = globalThis.litElementPolyfillSupport;
st == null || st({ LitElement: S });
((z = globalThis.litElementVersions) !== null && z !== void 0 ? z : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = (o) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(o, t) : ((e, i) => {
  const { kind: s, elements: r } = i;
  return { kind: s, elements: r, finisher(n) {
    customElements.define(e, n);
  } };
})(o, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = (o, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, o);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, o);
} };
function at(o) {
  return (t, e) => e !== void 0 ? ((i, s, r) => {
    s.constructor.createProperty(r, i);
  })(o, t, e) : Nt(o, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var D;
((D = window.HTMLSlotElement) === null || D === void 0 ? void 0 : D.prototype.assignedElements) != null;
const Mt = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjI1LjYiIGhlaWdodD0iMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAyNTYgMzIwIj48cGF0aCBmaWxsPSIjMDBFOEZGIiBkPSJtNjQgMTkybDI1LjkyNi00NC43MjdsMzguMjMzLTE5LjExNGw2My45NzQgNjMuOTc0bDEwLjgzMyA2MS43NTRMMTkyIDMyMGwtNjQtNjRsLTM4LjA3NC0yNS42MTV6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzI4MzE5OCIgZD0iTTEyOCAyNTZWMTI4bDY0LTY0djEyOGwtNjQgNjRaTTAgMjU2bDY0IDY0bDkuMjAyLTYwLjYwMkw2NCAxOTJsLTM3LjU0MiAyMy43MUwwIDI1NloiPjwvcGF0aD48cGF0aCBmaWxsPSIjMzI0RkZGIiBkPSJNNjQgMTkyVjY0bDY0LTY0djEyOGwtNjQgNjRabTEyOCAxMjhWMTkybDY0LTY0djEyOGwtNjQgNjRaTTAgMjU2VjEyOGw2NCA2NGwtNjQgNjRaIj48L3BhdGg+PHBhdGggZmlsbD0iIzBGRiIgZD0iTTY0IDMyMFYxOTJsNjQgNjR6Ij48L3BhdGg+PC9zdmc+";
var Tt = Object.defineProperty, xt = Object.getOwnPropertyDescriptor, W = (o, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? xt(t, e) : t, r = o.length - 1, n; r >= 0; r--)
    (n = o[r]) && (s = (i ? n(t, e, s) : n(s)) || s);
  return i && s && Tt(t, e, s), s;
};
let M = class extends S {
  constructor() {
    super(...arguments), this.docsHint = "Click on the Vite and Lit logos to learn more", this.count = 0;
  }
  render() {
    return ft`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${Mt} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `;
  }
  _onClick() {
    this.count++;
  }
};
M.styles = ct`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
W([
  at()
], M.prototype, "docsHint", 2);
W([
  at({ type: Number })
], M.prototype, "count", 2);
M = W([
  Ct("my-element")
], M);
export {
  M as MyElement
};

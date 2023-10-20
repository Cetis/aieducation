import { r as registerInstance, h, e as Host, g as getElement } from './index-48801938.js';

const oiTextCss = ":host{display:block}";

const OiText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.countryName = "United States of America";
  }
  countrySelected(event) {
    if (event.detail) {
      this.countryName = event.detail;
      this.content = document.getElementById(this.countryName);
      this.removeChildContent();
      if (this.content) {
        this.setChildContent();
      }
    }
  }
  removeChildContent() {
    if (document.getElementById('oi-text-current'))
      this.contentElement.removeChild(document.getElementById('oi-text-current'));
  }
  setChildContent() {
    let child = this.content.cloneNode(true);
    child.setAttribute("id", "oi-text-current");
    this.contentElement.appendChild(child);
  }
  componentDidLoad() {
    this.contentElement = document.getElementById('oi-text-content');
    this.content = document.getElementById(this.countryName);
    this.setChildContent();
  }
  render() {
    return (h(Host, null, h("div", { id: "oi-text-content", tabindex: "0" }), h("slot", null)));
  }
  get element() { return getElement(this); }
};
OiText.style = oiTextCss;

export { OiText as oi_text };

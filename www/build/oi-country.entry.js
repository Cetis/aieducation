import { r as registerInstance, h, e as Host, g as getElement } from './index-48801938.js';
import { l as loadDataModel } from './data-04d149f1.js';
import { g as getDefaultFromRequest } from './utils-968696b6.js';

const oiCountryCss = ":host{width:100%;height:100%;display:block;background-color:var(--background-color);color:var(--text-color)}.dark{background-color:var(--primary-color);color:var(--light-color)}h1{margin:20px}section{width:100%;display:flex;flex-flow:row wrap;align-items:stretch;justify-content:center;padding:0}header{width:100%;display:flex;align-items:stretch;justify-content:center}.country{flex-grow:9}.flag{flex-grow:1;margin:auto}.spacer{height:20px}";

const OiCountry = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * The dataset to load
     * @type {string}
     */
    this.dataSrc = null;
    /**
     * Event to listen to
     * @type {string}
     */
    this.name = 'country';
    this.theme = 'light';
    this.countryName = getDefaultFromRequest(this.name);
  }
  countrySelected(event) {
    if (event.detail && event.detail.filter && event.detail.filter == this.name) {
      this.countryName = event.detail.value;
    }
  }
  /**
   * Filter the data and return only that for the selected country
   * @param country
   */
  getCountry(country) {
    return this.data.getOne({ country: country });
  }
  async componentWillLoad() {
    this.countryName = getDefaultFromRequest(this.name) || this.countryName;
    if (this.dataSrc) {
      this.data = await loadDataModel(this.dataSrc);
    }
  }
  componentWillRender() {
    if (this.data && this.countryName) {
      this.country = this.getCountry(this.countryName);
    }
  }
  render() {
    return (h(Host, { tabindex: '0', class: this.theme }, this.countryName &&
      h("section", { class: this.theme }, h("header", null, h("div", { class: 'country' }, h("h1", null, this.countryName)), h("div", { class: 'flag' }, h("img", { src: 'https://flagcdn.com/w40/' + this.country.iso + 'png', srcSet: 'https://flagcdn.com/w80/' + this.country.iso + '.png 2x', width: '40', alt: 'Flag of ' + this.countryName }))), h("div", { class: 'spacer' }), h("slot", null))));
  }
  get element() { return getElement(this); }
};
OiCountry.style = oiCountryCss;

export { OiCountry as oi_country };

import { r as registerInstance, h, e as Host, g as getElement } from './index-48801938.js';
import { f as format_value } from './utils-968696b6.js';
import { l as loadDataModel } from './data-04d149f1.js';

const oiFactCss = ":host{width:100%;height:100%;max-width:100px;display:block;margin:20px;padding:10px;text-align:center;background-color:var(--light-color);color:var(--text-color)}.dark-theme{background-color:var(--primary-color);color:var(--light-color)}.name{background-color:var(--light-color);font-weight:bold;font-size:0.6rem;padding:10px}.value{font-weight:bold;font-size:1rem;padding:10px}.denominator{font-weight:normal}";

const OiFact = class {
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
    this.numeratorName = 'Region Rank';
    this.denominatorName = 'CountRegion';
    this.denominator = null;
    this.countryName = null;
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
    if (this.dataSrc) {
      this.data = await loadDataModel(this.dataSrc);
    }
  }
  componentWillRender() {
    if (this.countryName && this.data) {
      this.country = this.getCountry(this.countryName);
    }
  }
  numeratorValue() {
    return this.country ? format_value(this.country[this.numeratorName]) : '--';
  }
  denominatorValue() {
    if (this.denominator) {
      return format_value(this.denominator);
    }
    return this.country && this.denominatorName ? format_value(this.country[this.denominatorName]) : '--';
  }
  render() {
    return (h(Host, { tabindex: "0" }, this.countryName &&
      h("div", null, h("div", { class: "name" }, this.numeratorName), h("div", { class: "value" }, this.numeratorValue(), h("span", { class: "denominator" }, "/", this.denominatorValue())))));
  }
  get element() { return getElement(this); }
};
OiFact.style = oiFactCss;

export { OiFact as oi_fact };

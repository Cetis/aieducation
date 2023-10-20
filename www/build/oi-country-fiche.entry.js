import { r as registerInstance, h, e as Host, g as getElement } from './index-48801938.js';
import { b as findByMatchingProperties, f as format_value } from './utils-968696b6.js';

const oiCountryFicheCss = ":host{width:100%;height:100%;background:#F7F9FB;display:block}h1{margin:20px;font-size:1.2rem}.spacer{height:20px}header{width:100%;display:flex;align-items:stretch;justify-content:center;padding-top:1rem}.country{flex-grow:9}.flag{flex-grow:1;margin:auto}section{width:100%;display:flex;flex-flow:row wrap;align-items:stretch;justify-content:center;padding:0}section div{padding:10px 20px 10px 20px;flex-grow:1}.name{background-color:white;font-weight:bold;font-size:0.6rem}.value{font-weight:bold;font-size:1rem}.denominator{font-weight:normal}";

const OiCountryFiche = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * If true, when this component receives a country selection,
     * focus on this component and scroll it into view.
     * @type {boolean}
     */
    this.focusOnSelection = true;
    /**
     * The dataset to load
     * @type {string}
     */
    this.dataSrc = "data/air.json";
    this.countryName = 'United States of America';
  }
  countrySelected(event) {
    if (event.detail && event.detail.filter && event.detail.filter == 'country') {
      this.countryName = event.detail.value;
    }
  }
  /**
   * Loads the dataset
   * @returns {Promise<void>}
   */
  load() {
    return fetch(this.dataSrc)
      .then(response => response.json())
      .then(data => {
      this.data = data;
    });
  }
  getCountry(country) {
    return findByMatchingProperties(this.data, { Country: country });
  }
  componentWillLoad() {
    return this.load();
  }
  componentWillRender() {
    this.country = this.getCountry(this.countryName)[0];
  }
  render() {
    return (h(Host, { tabindex: "0" }, h("header", null, h("div", { class: "country" }, h("h1", null, this.countryName)), h("div", { class: "flag" }, h("img", { src: 'https://flagcdn.com/w40/' + this.country.iso + 'png', srcSet: 'https://flagcdn.com/w80/' + this.country.iso + '.png 2x', width: "40", alt: 'Flag of ' + this.countryName }))), h("section", null, h("div", null, h("div", { class: "name" }, "Index score"), h("div", { class: "value" }, this.country ? format_value(this.country.Index) : '--', h("span", { class: "denominator" }, "/100"))), h("div", null, h("div", { class: "name" }, "Rank"), h("div", { class: "value" }, this.country ? format_value(this.country.Rank) : '--', h("span", { class: "denominator" }, "/172"))), h("div", null, h("div", { class: "name" }, "Regional Rank"), h("div", { class: "value" }, this.country ? format_value(this.country['Region Rank']) : '--', h("span", { class: "denominator" }, "/", this.country ? format_value(this.country['CountRegion']) : '--')))), h("section", null, h("div", null, h("div", { class: "name" }, "Responsible Use Score"), h("div", { class: "value" }, this.country && this.country['Responsible Use Score'] ? format_value(this.country['Responsible Use Score']) : '--', h("span", { class: "denominator" }, "/100"))), h("div", null, h("div", { class: "name" }, "Responsible Use Rank"), h("div", { class: "value" }, this.country && this.country['Responsible Use Rank'] ? format_value(this.country['Responsible Use Rank']) : '--', h("span", { class: "denominator" }, "/34")))), h("div", { class: "spacer" }), h("section", null, h("slot", null))));
  }
  get element() { return getElement(this); }
};
OiCountryFiche.style = oiCountryFicheCss;

export { OiCountryFiche as oi_country_fiche };

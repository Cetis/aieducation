import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-48801938.js';
import { s as select, e as event } from './index-84a0b89d.js';
import { g as getDefaultFromRequest, h as hexToRgbA, a as getThemeColour, c as format_table_value } from './utils-968696b6.js';
import { c as createCommonjsModule, a as commonjsGlobal } from './_commonjsHelpers-8fe71198.js';
import { l as loadDataModel } from './data-04d149f1.js';

var smartTableKeyboard = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
	typeof undefined === 'function' && undefined.amd ? undefined(factory) :
	(global['smart-table-keyboard'] = factory());
}(commonjsGlobal, (function () { 'use strict';

const findContainer = (element, selector) => element.matches(selector) === true ? element : findContainer(element.parentElement, selector);
const dataSelectorAttribute = 'data-keyboard-selector';
const dataSkipAttribute = 'data-keyboard-skip';
const valFunc = val => () => val;

function regularCell (element, {rowSelector, cellSelector}) {
  const row = findContainer(element, rowSelector);
  const cells = [...row.querySelectorAll(cellSelector)];
  const index = cells.indexOf(element);
  const returnEl = valFunc(element);
  return {
    selectFromAfter: returnEl,
    selectFromBefore: returnEl,
    next(){
      return cells[index + 1] !== void 0 ? cells[index + 1] : null;
    },
    previous(){
      return cells[index - 1] !== void 0 ? cells[index - 1] : null;
    }
  }
}

function skipCell (element, options) {
  const reg = regularCell(element, options);
  return {
    previous: reg.previous,
    next: reg.next
  }
}

function compositeCell (element, options) {
  const cellElement = findContainer(element, options.cellSelector);
  const selector = cellElement.getAttribute(dataSelectorAttribute);
  const subWidgets = [...cellElement.querySelectorAll(selector)];
  const widgetsLength = subWidgets.length;
  const isSubWidget = element !== cellElement;
  return {
    selectFromBefore(){
      return isSubWidget ? element : subWidgets[0];
    },
    selectFromAfter(){
      return isSubWidget ? element : subWidgets[widgetsLength - 1];
    },
    next(){
      const index = subWidgets.indexOf(element);
      if (isSubWidget && index + 1 < widgetsLength) {
        return subWidgets[index + 1];
      } else {
        return regularCell(cellElement, options).next();
      }
    },
    previous(){
      const index = subWidgets.indexOf(element);
      if (isSubWidget && index > 0) {
        return subWidgets[index - 1];
      } else {
        return regularCell(cellElement, options).previous();
      }
    }
  }
}

function createCell (el, options) {
  if (el === null) {
    return null;
  } else if (el.hasAttribute(dataSkipAttribute)) {
    return skipCell(el, options);
  } else if (el.hasAttribute(dataSelectorAttribute) || !el.matches(options.cellSelector)) {
    return compositeCell(el, options);
  } else {
    return regularCell(el, options);
  }
}

function regularRow (element, grid, {rowSelector = 'tr', cellSelector = 'th,td'}={}) {
  const rows = [...grid.querySelectorAll(rowSelector)];
  const cells = [...element.querySelectorAll(cellSelector)];
  const index = rows.indexOf(element);
  return {
    previous(){
      return rows[index - 1] !== void 0 ? rows[index - 1] : null;
    },
    next(){
      return rows[index + 1] !== void 0 ? rows[index + 1] : null;
    },
    item(index){
      return cells[index] !== void 0 ? cells[index] : null;
    }
  };
}

function skipRow (element, grid, options) {
  const regular = regularRow(element, grid, options);
  return {
    previous: regular.previous,
    next: regular.next
  };
}

function createRow (target, grid, {rowSelector, cellSelector}={}) {
  if (target === null) {
    return null;
  }
  const r = findContainer(target, rowSelector);
  return r.hasAttribute(dataSkipAttribute) ? skipRow(r, grid, {
      rowSelector,
      cellSelector
    }) : regularRow(target, grid, {rowSelector, cellSelector});
}

function keyGrid (grid, options) {
  const {rowSelector, cellSelector} = options;
  return {
    moveRight(target){
      const cell = createCell(target, options);
      let newCell = createCell(cell.next(), options);
      while (newCell !== null && newCell.selectFromBefore === void 0) {
        newCell = createCell(newCell.next(), options);
      }
      return newCell !== null ? newCell.selectFromBefore() : target;
    },
    moveLeft(target){
      const cell = createCell(target, options);
      let newCell = createCell(cell.previous(), options);
      while (newCell !== null && newCell.selectFromAfter === void 0) {
        newCell = createCell(newCell.previous(), options);
      }
      return newCell !== null ? newCell.selectFromAfter() : target;
    },
    moveUp(target){
      const rowElement = findContainer(target, rowSelector);
      const cells = [...rowElement.querySelectorAll(cellSelector)];
      const row = createRow(rowElement, grid, options);
      let newRow = createRow(row.previous(), grid, options);
      while (newRow !== null && newRow.item === void 0) {
        newRow = createRow(newRow.previous(), grid, options);
      }

      if (newRow === null) {
        return target;
      }

      let askedIndex = cells.indexOf(findContainer(target, cellSelector));
      let newCell = createCell(newRow.item(askedIndex), options);
      while (newCell === null || newCell.selectFromBefore === void 0 && askedIndex > 0) {
        askedIndex--;
        newCell = createCell(newRow.item(askedIndex), options);
      }
      return newCell.selectFromBefore();
    },
    moveDown(target){
      const rowElement = findContainer(target, rowSelector);
      const cells = [...rowElement.querySelectorAll(cellSelector)];
      const row = createRow(rowElement, grid, options);
      let newRow = createRow(row.next(), grid, options);
      while (newRow !== null && newRow.item === void 0) {
        newRow = createRow(newRow.next(), grid, options);
      }

      if (newRow === null) {
        return target;
      }

      let askedIndex = cells.indexOf(findContainer(target, cellSelector));
      let newCell = createCell(newRow.item(askedIndex), options);
      while (newCell === null || newCell.selectFromBefore === void 0 && askedIndex > 0) {
        askedIndex--;
        newCell = createCell(newRow.item(askedIndex), options);
      }
      return newCell.selectFromBefore();
    }
  }
}

var index = function (grid, {rowSelector = 'tr', cellSelector = 'td,th'}={}) {
  let lastFocus = null;
  const kg = keyGrid(grid, {rowSelector, cellSelector});

  grid.addEventListener('keydown', ({target, keyCode}) => {
    let newCell = null;
    if (keyCode === 37) {
      newCell = kg.moveLeft(target);
    } else if (keyCode === 38) {
      newCell = kg.moveUp(target);
    } else if (keyCode === 39) {
      newCell = kg.moveRight(target);
    } else if (keyCode === 40) {
      newCell = kg.moveDown(target);
    }

    if (newCell !== null) {
      newCell.focus();
      if (lastFocus !== null) {
        lastFocus.setAttribute('tabindex', '-1');
      }
      newCell.setAttribute('tabindex', '0');
      lastFocus = newCell;
    }
  });
};

return index;

})));
//# sourceMappingURL=smart-table-keyboard.js.map
});

const oiCountryListCss = ":host{display:block;width:100%;margin:0;padding:0;font-size:0.8rem}#page-wrap{width:100%}p{margin:20px 0}a{color:#2c2951;text-decoration-color:lightgrey}tr:hover td{opacity:0.8}table{width:100%;background:white;border-collapse:collapse}tr:nth-of-type(odd){background:#F7F9FB}th{background:white;text-transform:capitalize;font-size:1rem;font-weight:lighter;cursor:s-resize;background-repeat:no-repeat;background-position:3% center;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}td,th{padding:6px;border:2px solid white;text-align:left}td:nth-of-type(1){font-weight:bold}th.des:after{content:\"↓\"}th.aes:after{content:\"↑\"}td.quantile-5{background-color:#040430;color:white}td.quantile-4{background-color:#040430;color:white}td.quantile-3{background-color:steelblue;color:black}td.quantile-2{background-color:lightsteelblue;color:black}td.quantile-1{background-color:lightsalmon;color:black}td.quantile-0{background-color:#ccc;color:white}";

const OiCountryList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.emitter = createEvent(this, "oi-filter", 7);
    /**
     * The column key to use to trigger filter events
     */
    this.trigger = 'country';
    /**
     * The dataset to load
     * @type {string}
     */
    this.dataSrc = null;
    /**
     * The column to sort by
     * @type {string}
     */
    this.sortBy = 'country';
    /**
     * Sort ascending (asc) or descending (desc)
     * @type {string}
     */
    this.sort = 'asc';
    /**
     * The columns to display as a comma-separated list
     * @type {string}
     */
    this.columns = 'country';
    /**
     * Set to true to colour cells by value
     */
    this.heatmap = false;
    this.useTheme = false;
    this.precision = 0;
    /**
     * Pillar to filter indicators by. By default, this is null.
     * If set to a value, the chart will listen to 'pillar' filter events
     * and set to its value.
     */
    this.pillar = getDefaultFromRequest('pillar') || null;
  }
  /**
   * Listen to filter selections.
   */
  countrySelected(event) {
    if (event.detail && event.detail.filter) {
      if (event.detail.filter === 'pillar' && this.pillar) {
        this.pillar = event.detail.value;
      }
    }
  }
  /**
   * Update the view
   */
  update() {
    let keyList = this.data.keyList(this.columns, this.pillar);
    let emitter = this.emitter;
    let precision = this.precision;
    let sortAscending = this.sort === 'asc';
    let sorter = this.sortWithNulls;
    let titles = keyList;
    let data = this.data.get();
    let dataSource = this.data;
    let heatmap = this.heatmap;
    let useTheme = this.useTheme;
    let colour = function (d, dataSource) {
      if (heatmap && useTheme) {
        let quantile = Math.floor(Number(d.value) / 20);
        let text = quantile > 2 ? "white" : "black";
        // This is a bit too 'vibrant'!!
        //let variants = ['darkest', 'dark', 'normal', 'light', 'lightest']
        //let bg = getThemeColour(dataSource.getPillar(d.name), variants[quantile])
        let bg = hexToRgbA(getThemeColour(dataSource.getPillar(d.name)), 1 / (5 - quantile));
        return "background-color:" + bg + "; color:" + text;
      }
      else if (heatmap) {
        let quantile = Math.floor(Number(d.value) / 20);
        let text = quantile > 2 ? "white" : "black";
        let bg = hexToRgbA("#2c2951", 1 / (5 - quantile));
        return "background-color: " + bg + "; color:" + text;
      }
      else {
        return "";
      }
    };
    // Clear the table
    select(this.pagewrapElement).selectAll('table').remove();
    let table = select(this.pagewrapElement).append('table');
    table.attr("aria-label", "Country list. Click country names to view details. Scroll to view more.");
    table.attr("role", "grid");
    let headers = table.append('thead').append('tr')
      .attr("role", "row")
      .selectAll('th')
      .data(titles).enter()
      .append('th')
      .attr("scope", "col")
      .attr("tabindex", "0")
      .attr("role", "columnheader")
      .attr("aria-sort", "none")
      .text(function (d) {
      return d;
    })
      .on('keydown', function () {
      if (event.code === 'Space' || event.code === 'Enter') {
        this.click();
      }
    })
      .on('click', function (d) {
      headers.attr('class', 'header');
      headers.attr('aria-sort', 'none');
      if (sortAscending) {
        sorter(rows, sortAscending, d);
        sortAscending = false;
        this.className = 'aes';
        this.setAttribute("aria-sort", "ascending");
      }
      else {
        sorter(rows, sortAscending, d);
        sortAscending = true;
        this.className = 'des';
        this.setAttribute("aria-sort", "descending");
      }
    });
    let trigger = this.trigger;
    let rows = table.append('tbody').selectAll('tr')
      // @ts-ignore
      .data(data).enter()
      .append('tr');
    //
    // Table cells
    //
    let td = rows.selectAll('td')
      .data(function (d) {
      return titles.map(function (k) {
        // @ts-ignore
        return { 'value': d.get(k), 'name': k };
      });
    }).enter().append('td');
    td.attr("tabindex", "-1");
    td.attr('data-th', function (d) {
      return d.name;
    });
    //
    // Text or links
    //
    td.each(function (d) {
      if (d.name === trigger) {
        select(this).attr("data-keyboard-selector", "a");
        select(this).append("a")
          .attr("tabindex", "-1")
          .attr('href', '#')
          .text(function (d) {
          return format_table_value(d.value, precision);
        })
          .on("keydown", function (d) {
          event.preventDefault();
          if (event.code === 'Space' || event.code === 'Enter') {
            emitter.emit({ filter: trigger, value: d.value });
          }
        })
          .on("click, mousedown", function (d) {
          event.preventDefault();
          emitter.emit({ filter: trigger, value: d.value });
          return false;
        });
      }
      else {
        select(this).text(function (d) {
          return format_table_value(d.value, precision);
        })
          .attr('style', function (d) {
          return colour(d, dataSource);
        })
          .attr('class', function (d) {
          if (!isNaN(Number(d.value)) && heatmap) {
            return 'quantile-' + Math.floor(Number(d.value) / 20);
          }
          else {
            return 'cell';
          }
        });
      }
    });
    //
    // Initial sort
    //
    if (this.sort == 'asc') {
      if (this.sortBy === 'country') {
        rows.sort((a, b) => 0 - (a[this.sortBy] > b[this.sortBy] ? -1 : 1));
      }
      else {
        this.sortWithNulls(rows, this.sort == 'asc', this.sortBy);
        //rows.sort((a, b) => a[this.sortBy] - b[this.sortBy]);
      }
    }
    else {
      if (this.sortBy === 'country') {
        rows.sort((a, b) => 0 - (a[this.sortBy] > b[this.sortBy] ? 1 : -1));
      }
      else {
        this.sortWithNulls(rows, this.sort == 'asc', this.sortBy);
        //rows.sort((a, b) => b[this.sortBy] - a[this.sortBy]);
      }
    }
    //
    // Add in keyboard navigation
    //
    smartTableKeyboard(this.pagewrapElement.getElementsByTagName("table")[0], { rowSelector: 'tr', cellSelector: 'th,td' });
  }
  /**
   * Sort the table by specified key column
   * @param rows
   * @param ascending
   * @param key
   */
  sortWithNulls(rows, ascending, key) {
    return rows.sort((a, b) => {
      let aa = a.get(key);
      let bb = b.get(key);
      if (aa === null) {
        return 1;
      }
      if (bb === null) {
        return -1;
      }
      if (aa === bb) {
        return 0;
      }
      if (!isNaN(aa)) {
        if (ascending) {
          return aa < bb ? -1 : 1;
        }
        else {
          return aa < bb ? 1 : -1;
        }
      }
      else {
        return ascending ? aa.localeCompare(bb) : bb.localeCompare(aa);
      }
      // if (!b[key]) return ascending ? 1 : -1;
      // if (!a[key]) return ascending ? -1 : 1;
      // if (ascending) return a[key] - b[key];
      // return b[key] - a[key];
    });
  }
  async componentWillLoad() {
    this.pillar = getDefaultFromRequest('pillar') || this.pillar;
    this.data = await loadDataModel(this.dataSrc);
  }
  componentDidLoad() {
    this.pagewrapElement = this.element.shadowRoot.getElementById('page-wrap');
    this.update();
  }
  componentWillUpdate() {
  }
  componentDidUpdate() {
    this.update();
  }
  render() {
    return (h(Host, null, h("div", { id: "page-wrap", tabindex: "0" }), h("slot", null)));
  }
  get element() { return getElement(this); }
};
OiCountryList.style = oiCountryListCss;

export { OiCountryList as oi_country_list };

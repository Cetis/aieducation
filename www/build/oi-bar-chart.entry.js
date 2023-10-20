import { r as registerInstance, h, g as getElement } from './index-48801938.js';
import { s as select } from './index-84a0b89d.js';
import { l as linear } from './index-b73bd39e.js';
import './index-e7ac36a1.js';
import { f as format_value, g as getDefaultFromRequest, a as getThemeColour } from './utils-968696b6.js';
import { l as loadDataModel } from './data-04d149f1.js';
import './index-67954fb9.js';

// Chart design based on the recommendations of Stephen Few. Implementation

/**
 * A simple small-multiples bar chart with independent scales
 * @returns {bullet}
 */

const d3_bar = function() {
  var orient = 'left', // TODO top & bottom
    reverse = false,
    duration = 0,
    measures = bulletMeasures,
    width = 380,
    scale = 100,
    size = 'normal',
    offset = 12.5,
    colours = null,
    height = 25;

  let label_y_offset = [];
  label_y_offset[0] = 7.5;
  label_y_offset[1] = 20;
  label_y_offset[2] = 12.5;

  // For each small multiple…
  function bullet(g) {
    g.each(function(d, i) {
      var measurez = d.measures,
        namez = d.names,
        title = d.title,
        g = select(this);

      // Compute the new x-scale.
      var x1 = 0;
      x1 = linear()
        .domain([0, scale])
        .range(reverse ? [width, 0] : [0, width]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || linear()
        .domain([0, scale])
        .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
        w1 = bulletWidth(x1),
        l1 = bulletWidth(x1, 5);

      // Update the measure rects.
      var measure = g.selectAll('rect.measure')
        .data(measurez);

      measure.enter().append('rect')
        // Enable keyboard navigation to this bar only if its actually in use
        .attr('tabindex', function(d, i){return i===0 || i===1 && namez.length === 2 ? 0: -1})
        .attr('class', function(d, i) { return 'measure s' + i })
        .attr('fill', function(d, i){return colours(title, i)})
        .attr('opacity', '0.8')
        .attr('width', w0)
        .attr('height', height / namez.length)
        .attr('x', reverse ? x0 : 0)
        .attr('y', function(d, i) { return offset * i })
        .transition()
        .duration(duration)
        .attr('width', w1)
        .attr('x', reverse ? x1 : 0);

      measure.enter().append('title')
        .text(function(d, i) { return namez[i] + ': ' + title + ': ' + format_value(d)})
        .attr('aria-label', function(d, i) { return namez[i] + ': ' + title + ': ' + format_value(d)});

      measure.transition()
        .duration(duration)
        .attr('tabindex', function(d, i){return i===0 || i===1 && namez.length === 2 ? 0: -1})
        .attr('width', w1)
        .attr('height', height / namez.length)
        .attr('x', reverse ? x1 : 0)
        .attr('y', function(d, i) { return offset * i })
        .select('title')
        .text( function (d, i) { return namez[i] + ': ' + title + ': ' + format_value(d)})
        .attr('aria-label', function(d, i) { return namez[i] + ': ' + title + ': ' + format_value(d)});


      // Labels
      var label = g.selectAll('text.chart-label')
        .data(measurez);

      label.enter().append('text')
        .attr('class', 'chart-label')
        .attr('x', w0)
        .attr('y', function(d, i) { return namez.length === 2 ? label_y_offset[i] : label_y_offset[2] })
        .text(function(d, i) {return namez[i] ? format_value(d) : ""})
        .attr("dy", "0.2em")
        .transition()
        .duration(duration)
        .attr('x', l1);

      label.transition()
        .duration(duration)
        .attr('x', l1)
        .attr('y', function(d, i) { return namez.length === 2 ? label_y_offset[i] : label_y_offset[2] })
        .text(function(d, i) {return namez[i] ? format_value(d) : ""});
    });
  }

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    reverse = orient == 'right' || orient == 'bottom';
    return bullet;
  };

  // measures (actual, benchmark)
  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.colours = function(x){
    if (!arguments.length) return colours;
    colours = x;
    return bullet;
  };

  bullet.size = function(x) {
    if (!arguments.length) return size;
    height = x === 'normal' ? 25 : 14;
    offset = x === 'normal' ? 12.5 : 7;
    size = x;
    label_y_offset[0] = size === 'normal'? 7.5 : 5;
    label_y_offset[1] = size === 'normal'? 20: 12;
    label_y_offset[2] = size === 'normal'? 12.5: 8;
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return bullet;
  };

  return bullet;
};

function bulletMeasures(d) {
  return d.measures;
}

function bulletWidth(x, offset = 0) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0 + offset);
  };
}

const oiBarChartCss = ":host{display:block;width:100%;align-items:center;background-color:var(--background-color);color:var(--text-color)}.dark{color:var(--light-color);background-color:var(--primary-color)}.dark .bullet .chart-label,.dark .bullet .title,.dark .bullet .subtitle{fill:var(--light-color)}.svg-container{display:inline-block;position:relative;width:100%;padding-bottom:7%;vertical-align:top;overflow:hidden}.svg-container.small{padding-bottom:4%;}.svg-content{display:inline-block;position:absolute;top:0;left:0;width:100%;height:100%}.bullet .chart-label{fill:var(--text-color);font-size:9px}.bullet .chart-label{font-weight:bold}.bullet .title{font-weight:normal;font-size:14px}.bullet .subtitle{font-size:10px}.bullet.small .title{font-size:10px}.bullet.small .chart-label{font-size:8px}#placeholder{background-color:var(--neutral-background-color);color:var(--text-color);width:100%;text-align:center;padding-top:20px;padding-bottom:20px;font-size:1rem;font-weight:lighter}";

const OiBarChart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * The dataset to load
     * @type {string}
     */
    this.dataSrc = null;
    /**
     * The keys of the elements to show in the chart as a comma-separated list. Alternatively,
     * use the magic keyword '@pillars' or '@indicators' to pick these up from the data source.
     * @type {string}
     */
    this.keys = 'Vision,Governance and Ethics,Digital Capacity,Adaptability,Size,Innovation Capacity,Human Capital,Infrastructure,Data Availability,Data Representativeness';
    /**
     * The event to listen to for setting the country name
     */
    this.name = 'country';
    /**
     * The selected country to show when first loaded. By default this is empty.
     * @type {string}
     */
    this.country = getDefaultFromRequest(this.name);
    /**
     * The event to listen to for setting the country name. If set to "", will not compare
     */
    this.compareWith = 'benchmark';
    /**
     * The selected benchmark to show when first loaded. By default this is empty.
     * @type {string}
     */
    this.benchmark = getDefaultFromRequest(this.compareWith);
    /**
     * Size variant. Set to 'small' if there are lots of bars.
     * @type {string}
     */
    this.size = 'normal';
    /**
     * Pillar to filter indicators by. By default, this is null.
     * If set to a value, the chart will listen to 'pillar' filter events
     * and set to its value.
     */
    this.pillar = null;
    /**
     * Whether to use theming or not.
     */
    this.useTheme = false;
    this.theme = 'light';
    this.hasRenderedChart = false;
  }
  /**
   * Listen to filter selections.
   */
  countrySelected(event) {
    if (event.detail && event.detail.filter) {
      if (event.detail.filter === this.name) {
        this.country = event.detail.value;
      }
      else if (event.detail.filter === this.compareWith) {
        this.benchmark = event.detail.value;
      }
      else if (event.detail.filter === 'pillar' && this.pillar) {
        this.hasRenderedChart = false;
        this.pillar = event.detail.value;
      }
    }
  }
  //
  // StencilJS lifecycle methods
  //
  async componentWillLoad() {
    this.country = getDefaultFromRequest(this.name) || this.country;
    this.data = await loadDataModel(this.dataSrc);
  }
  componentWillRender() {
    this.country_data = this.prepareData(this.country);
    this.benchmark_data = this.prepareData(this.benchmark);
  }
  componentWillUpdate() {
  }
  componentDidUpdate() {
    this.country_data = this.prepareData(this.country);
    this.benchmark_data = this.prepareData(this.benchmark);
    if ((this.country || this.benchmark) && !this.hasRenderedChart)
      this.draw();
    this.update();
  }
  componentDidLoad() {
    this.chartElement = this.element.shadowRoot.getElementById('oi-bullet-chart');
    if (this.country || this.benchmark) {
      this.draw();
    }
  }
  /**
   * Filter the data to the selected country, and then reshape it so
   * that it is in {key: value} tuples for each property of the country
   * @param country
   */
  prepareData(country) {
    return this.data.get({ 'country': country })[0];
  }
  /**
   * Formats data into the shape needed by the bullet list
   * Gathers the source and benchmark sets, then
   * allocates the source to 'measures' and benchmark
   * to 'markers'.
   * @param source
   * @param benchmark
   */
  formatData(source, benchmark) {
    let merged = [];
    let keyList = this.data.keyList(this.keys, this.pillar);
    for (let i = 0; i < keyList.length; i++) {
      let key = keyList[i];
      let measures = [];
      // @ts-ignore
      if (source) {
        measures = [source.get(key), 0];
      }
      // @ts-ignore
      if (benchmark && source) {
        measures = [source.get(key), benchmark.get(key)];
      }
      let names = [];
      if (this.country) {
        names = [this.country];
      }
      if (this.country && this.benchmark) {
        names = [this.country, this.benchmark];
      }
      let row = {
        title: key,
        subtitle: "",
        measures: measures,
        scale: 100,
        names: names
      };
      merged.push(row);
    }
    return merged;
  }
  /**
   * Updates the bullet chart with new values - called whenever props change
   */
  update() {
    let data = this.formatData(this.country_data, this.benchmark_data);
    let svg = select(this.chartElement).selectAll('svg').selectAll('g.bullet-transform');
    let updater = this.map_update;
    svg.datum(function (d) {
      return updater(d, data);
    }).call(this.chart.duration(1000));
  }
  /**
   * Function passed to the SVG to process updates
   * @param d
   * @param data
   */
  map_update(d, data) {
    let key = d['title'];
    for (let i = 0; i < data.length; i++) {
      if (data[i]['title'] === key) {
        d.measures = data[i].measures;
        d.names = data[i].names;
        return d;
      }
    }
  }
  /**
   * Adds highlight on click events
   * @param event
   * @param useTheme
   * @param chartElement
   */
  highlight(event, useTheme, chartElement) {
    let allbars = select(chartElement).selectAll('svg').selectAll('rect.measure.s0');
    let bar = select(event).select('rect.measure.s0');
    if (useTheme) {
      // 0.8 = base
      // 1.0 = highlight
      // 0.2 = faded
      // Bar is basic or faded: highlight and fade
      if (bar.attr('opacity') === '0.8' || bar.attr('opacity') === '0.4') {
        allbars.attr('opacity', '0.4');
        bar.attr('opacity', '1.0');
      }
      else {
        // Bar is highlighted: base all
        allbars.attr('opacity', '0.8');
      }
    }
    else {
      let baseColour = '#6D88A3';
      let highlightColour = 'mediumvioletred';
      if (bar.attr('fill') === baseColour) {
        allbars.attr('fill', baseColour);
        bar.attr('fill', highlightColour);
      }
      else {
        allbars.attr('fill', baseColour);
      }
    }
  }
  /**
   * Draw the chart on first load
   */
  draw() {
    this.chart = null;
    if (select(this.chartElement).selectAll('div')) {
      select(this.chartElement).selectAll('div').remove();
    }
    if (this.element.shadowRoot.getElementById('placeholder')) {
      this.element.shadowRoot.getElementById('placeholder').remove();
    }
    // Set up colours callback
    let useTheme = this.useTheme;
    let dataSource = this.data;
    let colour = function (title, i) {
      if (useTheme) {
        return i === 0 ? getThemeColour(dataSource.getPillar(title)) : '#ddd';
      }
      else {
        return i === 0 ? '#6D88A3' : '#ddd';
      }
    };
    // Offset for normal vs small bar charts
    let offset = 15;
    if (this.size === 'small') {
      offset = 10;
    }
    this.hasRenderedChart = true;
    let margin = { top: 0, right: 40, bottom: 20, left: 200 };
    // let height = barHeight - margin.top - margin.bottom;
    //let width = this.chartElement.offsetWidth - margin.left - margin.right;
    this.chart = d3_bar().size(this.size).colours(colour);
    let highlight = this.highlight;
    let chartElement = this.chartElement;
    let data = this.formatData(this.country_data, this.benchmark_data);
    let svg = select(this.chartElement).selectAll('svg')
      .data(data)
      .enter()
      .append('div')
      .classed("svg-container " + this.size, true)
      .append('svg')
      .classed("svg-content bullet " + this.size, true)
      .on('click', function () { highlight(this, useTheme, chartElement); })
      .attr('preserveAspectRatio', "xMinYMin meet")
      .attr("viewBox", "0 0 620 " + (offset + 5))
      .append('g')
      .attr('class', 'bullet-transform')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    let title = svg.append('g')
      .style('text-anchor', 'end')
      .attr('transform', 'translate(-6,' + offset + ')');
    title.append('text')
      .attr('tabindex', 0)
      .attr('class', 'title')
      .text(function (d) {
      return d.title;
    });
    title.append('text')
      .attr('class', 'subtitle')
      .attr('dy', '1em')
      .text(function (d) {
      return d.subtitle;
    });
    select(this.chartElement).append('div').attr('class', 'placeholder');
    svg.call(this.chart);
  }
  render() {
    return (h("div", { class: this.theme }, h("div", { id: 'oi-bullet-chart', tabindex: '0' }), h("div", { id: 'placeholder' }, h("slot", null))));
  }
  get element() { return getElement(this); }
};
OiBarChart.style = oiBarChartCss;

export { OiBarChart as oi_bar_chart };

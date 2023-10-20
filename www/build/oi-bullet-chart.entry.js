import { r as registerInstance, h, e as Host, g as getElement } from './index-48801938.js';
import { s as select } from './index-84a0b89d.js';
import { n as descending, l as linear } from './index-b73bd39e.js';
import './index-e7ac36a1.js';
import { f as format_value, g as getDefaultFromRequest } from './utils-968696b6.js';
import { l as loadDataModel } from './data-04d149f1.js';
import './index-67954fb9.js';

// Chart design based on the recommendations of Stephen Few. Implementation

const d3_bullet = function() {
  var orient = 'left', // TODO top & bottom
    reverse = false,
    duration = 0,
    ranges = bulletRanges,
    markers = bulletMarkers,
    measures = bulletMeasures,
    width = 400,
    height = 25,
    tickFormat = null;

  // For each small multiple…
  function bullet(g) {
    g.each(function(d, i) {
      var rangez = ranges.call(this, d, i).slice().sort(descending),
        markerz = markers.call(this, d, i).slice().sort(descending),
        measurez = measures.call(this, d, i).slice().sort(descending),
        namez = d.names,
        title = d.title,
        g = select(this);

      // Compute the new x-scale.
      var x1 = 0;
      x1 = linear()
        .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
        .range(reverse ? [width, 0] : [0, width]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || linear()
        .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
        .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
        w1 = bulletWidth(x1);

      // Update the range rects.
      var range = g.selectAll('rect.range')
        .data(rangez);

      range.enter().append('rect')
        .attr('class', function(d, i) {
          return 'range s' + i;
        })
        .attr('width', w0)
        .attr('height', height)
        .attr('x', reverse ? x0 : 0)
        .transition()
        .duration(duration)
        .attr('width', w1)
        .attr('x', reverse ? x1 : 0);

      range.transition()
        .duration(duration)
        .attr('x', reverse ? x1 : 0)
        .attr('width', w1)
        .attr('height', height);

      // Update the measure rects.
      var measure = g.selectAll('rect.measure')
        .data(measurez);

      measure.enter().append('rect')
        .attr('class', function(d, i) {
          return 'measure s' + i;
        })
        .attr('width', w0)
        .attr('height', height / 3)
        .attr('x', reverse ? x0 : 0)
        .attr('y', height / 3)
        .transition()
        .duration(duration)
        .attr('width', w1)
        .attr('x', reverse ? x1 : 0);

      measure.append('title')
        .text((d) => namez[0] + ': ' + title + ': ' + format_value(d));

      measure.transition()
        .duration(duration)
        .attr('width', w1)
        .attr('height', height / 3)
        .attr('x', reverse ? x1 : 0)
        .attr('y', height / 3)
        .select('title')
        .text((d) => namez[0] + ': ' + title + ': ' + format_value(d));

      // Update the marker lines.
      var marker = g.selectAll('line.marker')
        .data(markerz);

      marker.enter().append('line')
        .attr('class', 'marker')
        .attr('x1', x0)
        .attr('x2', x0)
        .attr('y1', height / 6)
        .attr('y2', height * 5 / 6)
        .transition()
        .duration(duration)
        .attr('x1', x1)
        .attr('x2', x1);

      marker.append('title')
        .text((d) => namez[1] + ': ' + title + ': ' + format_value(d));

      marker.transition()
        .duration(duration)
        .attr('x1', x1)
        .attr('x2', x1)
        .attr('y1', height / 6)
        .attr('y2', height * 5 / 6)
        .select('title')
        .text((d) => namez[1] + ': ' + title + ': ' + format_value(d));


      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update the tick groups.
      var tick = g.selectAll('g.tick')
        .data(x1.ticks(8), function(d) {
          return this.textContent || format(d);
        });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append('g')
        .attr('class', 'tick')
        .attr('transform', bulletTranslate(x0))
        .style('opacity', 1e-6);

      tickEnter.append('line')
        .attr('y1', height)
        .attr('y2', height * 7 / 6);

      tickEnter.append('text')
        .attr('class', 'tick-label')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .attr('y', height * 7 / 6)
        .text(format);

      // Transition the entering ticks to the new scale, x1.
      tickEnter.transition()
        .duration(duration)
        .attr('transform', bulletTranslate(x1))
        .style('opacity', 1);

      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = tick.transition()
        .duration(duration)
        .attr('transform', bulletTranslate(x1))
        .style('opacity', 1);

      tickUpdate.select('line')
        .attr('y1', height)
        .attr('y2', height * 7 / 6);

      tickUpdate.select('text')
        .attr('y', height * 7 / 6);

      // Transition the exiting ticks to the new scale, x1.
      tick.exit().transition()
        .duration(duration)
        .attr('transform', bulletTranslate(x1))
        .style('opacity', 1e-6)
        .remove();
    });
    //timer.timerFlush();
  }

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    reverse = orient == 'right' || orient == 'bottom';
    return bullet;
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };

  // markers (previous, goal)
  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

  // measures (actual, forecast)
  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return bullet;
  };

  return bullet;
};

function bulletRanges(d) {
  return d.ranges;
}

function bulletMarkers(d) {
  return d.markers;
}

function bulletMeasures(d) {
  return d.measures;
}

function bulletTranslate(x) {
  return function(d) {
    return 'translate(' + x(d) + ',0)';
  };
}

function bulletWidth(x) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}

const oiBulletChartCss = ":host{display:block;width:100%;align-items:center}.svg-container{display:inline-block;position:relative;width:100%;padding-bottom:7%;vertical-align:top;overflow:hidden}.svg-content{display:inline-block;position:absolute;top:0;left:0;width:100%;height:100%}.bullet .marker{stroke:#000;stroke-width:2px}.bullet .tick line{stroke:#666;stroke-width:.5px}.bullet .tick .tick-label{font-size:0.4rem}.bullet .range.s0{fill:#fff}.bullet .range.s1{fill:#eee}.bullet .range.s2{fill:#ddd}.bullet .range.s3{fill:#ccc}.bullet .measure.s0{fill:#6D88A3}.bullet .measure.s1{fill:#6D88A3}.bullet .title{font-weight:normal;font-size:14px;fill:#333333}.bullet .subtitle{fill:#999;font-size:10px}.bullet.highlighted .measure.s0{fill:mediumvioletred}.bullet.highlighted .marker.s1{stroke:black;stroke-width:4px}";

const OiBulletChart = class {
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
     * The selected country to show when first loaded. By default this is empty.
     * @type {string}
     */
    this.country = getDefaultFromRequest('country');
    /**
     * The selected benchmark to show when first loaded. By default this is empty.
     * @type {string}
     */
    this.benchmark = getDefaultFromRequest('benchmark');
  }
  /**
   * Listen to filter selections.
   */
  countrySelected(event) {
    if (event.detail && event.detail.filter) {
      if (event.detail.filter === 'country') {
        this.country = event.detail.value;
      }
      else if (event.detail.filter === 'benchmark') {
        this.benchmark = event.detail.value;
      }
    }
  }
  //
  // StencilJS lifecycle methods
  //
  async componentWillLoad() {
    this.country = getDefaultFromRequest('country') || this.country;
    this.benchmark = getDefaultFromRequest('benchmark') || this.benchmark;
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
    this.update();
  }
  componentDidLoad() {
    this.chartElement = this.element.shadowRoot.getElementById('oi-bullet-chart');
    this.draw();
  }
  /**
   * Filter the data to the selected country, and then reshape it so
   * that it is in {key: value} tuples for each property of the country
   * @param country
   */
  prepareData(country) {
    return this.data.get({ country: country })[0];
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
    let keyList = this.data.keyList(this.keys);
    for (let i = 0; i < keyList.length; i++) {
      let key = keyList[i];
      let row = {
        title: key,
        subtitle: key,
        measures: source ? [source.get(key)] : [0],
        markers: benchmark ? [benchmark.get(key)] : [0],
        ranges: [25, 50, 75, 100],
        names: [this.country, this.benchmark]
      };
      merged.push(row);
    }
    return merged;
  }
  /**
   * Adds highlight on click events
   * @param event
   * @param chartElement
   */
  highlight(event, chartElement) {
    let cancel = (select(event).attr('class') == "svg-content bullet highlighted");
    select(chartElement).selectAll('svg').attr("class", 'svg-content bullet');
    if (!cancel) {
      select(event).attr("class", "svg-content bullet highlighted");
    }
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
    let subtitles = select(this.chartElement).selectAll('svg').selectAll('.subtitle');
    subtitles.datum(function (d) {
      return updater(d, data);
    });
    subtitles.text(function (d) {
      return format_value(d.measures[0]);
    });
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
        d.ranges = data[i].ranges;
        d.measures = data[i].measures;
        d.markers = data[i].markers;
        d.names = data[i].names;
        return d;
      }
    }
  }
  /**
   * Draw the chart on first load
   */
  draw() {
    let margin = { top: 0, right: 40, bottom: 20, left: 200 };
    let height = 50 - margin.top - margin.bottom;
    //let width = this.chartElement.offsetWidth - margin.left - margin.right;
    this.chart = d3_bullet();
    let highlight = this.highlight;
    let chartElement = this.chartElement;
    let data = this.formatData(this.country_data, this.benchmark_data);
    let svg = select(this.chartElement).selectAll('svg')
      .data(data)
      .enter()
      .append('div')
      .classed("svg-container", true)
      .append('svg')
      .classed("svg-content bullet", true)
      .on('click', function () { highlight(this, chartElement); })
      .attr('preserveAspectRatio', "xMinYMin meet")
      .attr("viewBox", "0 0 620 30")
      .append('g')
      .attr('class', 'bullet-transform')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    let title = svg.append('g')
      .style('text-anchor', 'end')
      .attr('transform', 'translate(-6,' + height / 2 + ')');
    title.append('text')
      .attr('tabindex', 0)
      .attr('class', 'title')
      .text(function (d) {
      return d.title;
    });
    title.append('text')
      .attr('tabindex', 0)
      .attr('class', 'subtitle')
      .attr('dy', '1em')
      .text(function (d) {
      return format_value(d.measures[0]);
    });
    svg.call(this.chart);
  }
  render() {
    return (h(Host, null, h("div", { id: 'oi-bullet-chart', tabindex: '0' }), h("slot", null)));
  }
  get element() { return getElement(this); }
};
OiBulletChart.style = oiBulletChartCss;

export { OiBulletChart as oi_bullet_chart };

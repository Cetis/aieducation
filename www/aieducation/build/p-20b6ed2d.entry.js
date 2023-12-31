import {r as t, h as i, H as e, g as n} from "./p-68751d42.js";
import "./p-d9655876.js";
import {s, f as r, g as l, l as a} from "./p-56e73c83.js";
import {d as o, l as h} from "./p-373b29c4.js";

function u(t) {
    return t.ranges
}

function c(t) {
    return t.markers
}

function f(t) {
    return t.measures
}

function d(t) {
    return function (i) {
        return "translate(" + t(i) + ",0)"
    }
}

function m(t) {
    var i = t(0);
    return function (e) {
        return Math.abs(t(e) - i)
    }
}

const g = class {
    constructor(i) {
        t(this, i), this.dataSrc = null, this.keys = "Vision,Governance and Ethics,Digital Capacity,Adaptability,Size,Innovation Capacity,Human Capital,Infrastructure,Data Availability,Data Representativeness", this.country = l("country"), this.benchmark = l("benchmark")
    }

    countrySelected(t) {
        t.detail && t.detail.filter && ("country" === t.detail.filter ? this.country = t.detail.value : "benchmark" === t.detail.filter && (this.benchmark = t.detail.value))
    }

    async componentWillLoad() {
        this.country = l("country") || this.country, this.benchmark = l("benchmark") || this.benchmark, this.data = await a(this.dataSrc)
    }

    componentWillRender() {
        this.country_data = this.prepareData(this.country), this.benchmark_data = this.prepareData(this.benchmark)
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
        this.country_data = this.prepareData(this.country), this.benchmark_data = this.prepareData(this.benchmark), this.update()
    }

    componentDidLoad() {
        this.chartElement = this.element.shadowRoot.getElementById("oi-bullet-chart"), this.draw()
    }

    prepareData(t) {
        return this.data.get({country: t})[0]
    }

    formatData(t, i) {
        let e = [], n = this.data.keyList(this.keys);
        for (let s = 0; s < n.length; s++) {
            let r = n[s], l = {
                title: r,
                subtitle: r,
                measures: t ? [t.get(r)] : [0],
                markers: i ? [i.get(r)] : [0],
                ranges: [25, 50, 75, 100],
                names: [this.country, this.benchmark]
            };
            e.push(l)
        }
        return e
    }

    highlight(t, i) {
        let e = "svg-content bullet highlighted" == s(t).attr("class");
        s(i).selectAll("svg").attr("class", "svg-content bullet"), e || s(t).attr("class", "svg-content bullet highlighted")
    }

    update() {
        let t = this.formatData(this.country_data, this.benchmark_data),
            i = s(this.chartElement).selectAll("svg").selectAll("g.bullet-transform"), e = this.map_update;
        i.datum((function (i) {
            return e(i, t)
        })).call(this.chart.duration(1e3));
        let n = s(this.chartElement).selectAll("svg").selectAll(".subtitle");
        n.datum((function (i) {
            return e(i, t)
        })), n.text((function (t) {
            return r(t.measures[0])
        }))
    }

    map_update(t, i) {
        let e = t.title;
        for (let n = 0; n < i.length; n++) if (i[n].title === e) return t.ranges = i[n].ranges, t.measures = i[n].measures, t.markers = i[n].markers, t.names = i[n].names, t
    }

    draw() {
        this.chart = function () {
            var t = "left", i = !1, e = 0, n = u, l = c, a = f, g = 400, p = 25, b = null;

            function v(t) {
                t.each((function (t, u) {
                    var c = n.call(this, t, u).slice().sort(o), f = l.call(this, t, u).slice().sort(o),
                        v = a.call(this, t, u).slice().sort(o), y = t.names, x = t.title, k = s(this), w = 0;
                    w = h().domain([0, Math.max(c[0], f[0], v[0])]).range(i ? [g, 0] : [0, g]);
                    var D = this.__chart__ || h().domain([0, Math.max(c[0], f[0], v[0])]).range(w.range());
                    this.__chart__ = w;
                    var A = m(D), M = m(w), j = k.selectAll("rect.range").data(c);
                    j.enter().append("rect").attr("class", (function (t, i) {
                        return "range s" + i
                    })).attr("width", A).attr("height", p).attr("x", i ? D : 0).transition().duration(e).attr("width", M).attr("x", i ? w : 0), j.transition().duration(e).attr("x", i ? w : 0).attr("width", M).attr("height", p);
                    var z = k.selectAll("rect.measure").data(v);
                    z.enter().append("rect").attr("class", (function (t, i) {
                        return "measure s" + i
                    })).attr("width", A).attr("height", p / 3).attr("x", i ? D : 0).attr("y", p / 3).transition().duration(e).attr("width", M).attr("x", i ? w : 0), z.append("title").text((t => y[0] + ": " + x + ": " + r(t))), z.transition().duration(e).attr("width", M).attr("height", p / 3).attr("x", i ? w : 0).attr("y", p / 3).select("title").text((t => y[0] + ": " + x + ": " + r(t)));
                    var C = k.selectAll("line.marker").data(f);
                    C.enter().append("line").attr("class", "marker").attr("x1", D).attr("x2", D).attr("y1", p / 6).attr("y2", 5 * p / 6).transition().duration(e).attr("x1", w).attr("x2", w), C.append("title").text((t => y[1] + ": " + x + ": " + r(t))), C.transition().duration(e).attr("x1", w).attr("x2", w).attr("y1", p / 6).attr("y2", 5 * p / 6).select("title").text((t => y[1] + ": " + x + ": " + r(t)));
                    var R = b || w.tickFormat(8), W = k.selectAll("g.tick").data(w.ticks(8), (function (t) {
                        return this.textContent || R(t)
                    })), _ = W.enter().append("g").attr("class", "tick").attr("transform", d(D)).style("opacity", 1e-6);
                    _.append("line").attr("y1", p).attr("y2", 7 * p / 6), _.append("text").attr("class", "tick-label").attr("text-anchor", "middle").attr("dy", "1em").attr("y", 7 * p / 6).text(R), _.transition().duration(e).attr("transform", d(w)).style("opacity", 1);
                    var H = W.transition().duration(e).attr("transform", d(w)).style("opacity", 1);
                    H.select("line").attr("y1", p).attr("y2", 7 * p / 6), H.select("text").attr("y", 7 * p / 6), W.exit().transition().duration(e).attr("transform", d(w)).style("opacity", 1e-6).remove()
                }))
            }

            return v.orient = function (e) {
                return arguments.length ? (i = "right" == (t = e) || "bottom" == t, v) : t
            }, v.ranges = function (t) {
                return arguments.length ? (n = t, v) : n
            }, v.markers = function (t) {
                return arguments.length ? (l = t, v) : l
            }, v.measures = function (t) {
                return arguments.length ? (a = t, v) : a
            }, v.width = function (t) {
                return arguments.length ? (g = t, v) : g
            }, v.height = function (t) {
                return arguments.length ? (p = t, v) : p
            }, v.tickFormat = function (t) {
                return arguments.length ? (b = t, v) : b
            }, v.duration = function (t) {
                return arguments.length ? (e = t, v) : e
            }, v
        }();
        let t = this.highlight, i = this.chartElement, e = this.formatData(this.country_data, this.benchmark_data),
            n = s(this.chartElement).selectAll("svg").data(e).enter().append("div").classed("svg-container", !0).append("svg").classed("svg-content bullet", !0).on("click", (function () {
                t(this, i)
            })).attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 620 30").append("g").attr("class", "bullet-transform").attr("transform", "translate(200,0)"),
            l = n.append("g").style("text-anchor", "end").attr("transform", "translate(-6,15)");
        l.append("text").attr("tabindex", 0).attr("class", "title").text((function (t) {
            return t.title
        })), l.append("text").attr("tabindex", 0).attr("class", "subtitle").attr("dy", "1em").text((function (t) {
            return r(t.measures[0])
        })), n.call(this.chart)
    }

    render() {
        return i(e, null, i("div", {id: "oi-bullet-chart", tabindex: "0"}), i("slot", null))
    }

    get element() {
        return n(this)
    }
};
g.style = ":host{display:block;width:100%;align-items:center}.svg-container{display:inline-block;position:relative;width:100%;padding-bottom:7%;vertical-align:top;overflow:hidden}.svg-content{display:inline-block;position:absolute;top:0;left:0;width:100%;height:100%}.bullet .marker{stroke:#000;stroke-width:2px}.bullet .tick line{stroke:#666;stroke-width:.5px}.bullet .tick .tick-label{font-size:0.4rem}.bullet .range.s0{fill:#fff}.bullet .range.s1{fill:#eee}.bullet .range.s2{fill:#ddd}.bullet .range.s3{fill:#ccc}.bullet .measure.s0{fill:#6D88A3}.bullet .measure.s1{fill:#6D88A3}.bullet .title{font-weight:normal;font-size:14px;fill:#333333}.bullet .subtitle{fill:#999;font-size:10px}.bullet.highlighted .measure.s0{fill:mediumvioletred}.bullet.highlighted .marker.s1{stroke:black;stroke-width:4px}";
export {g as oi_bullet_chart}
function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
function format_table_value(val, precision = 3) {
  // Number?
  let n = Number(val);
  if (isNaN(n))
    return val; // String
  // Integer only?
  if (n % 1 === 0)
    return n.toFixed(0);
  return number_format(val, precision);
}
function format_value(val) {
  // Number?
  let n = Number(val);
  if (isNaN(n))
    return val; // String
  // Integer only?
  if (n % 1 === 0)
    return n.toFixed(0);
  return number_format(val, 2);
}
/**
 * Custom JavaScript function that rounds a number w/
 * decimal places.
 *
 * @param val - The value that you want to format with decimal places.
 * @param decimals - The number of decimal places that should be used.
 * @returns {float}
 */
function number_format(val, decimals) {
  //Parse the value as a float value
  let f;
  try {
    f = parseFloat(val);
  }
  catch (e) {
    return val;
  }
  if (isNaN(f))
    return val;
  //Format the value w/ the specified number
  //of decimal places and return it.
  return f.toFixed(decimals);
}
/**
 * Utility method used to get the correct country's data
 * given a country name
 * @param set - an array of objects such as a dataset
 * @param properties - a dictionary of tuples e.g. {Country: 'Tunisia'}
 * @returns {any}
 */
function findByMatchingProperties(set, properties) {
  return set.filter(function (entry) {
    return Object.keys(properties).every(function (key) {
      return entry[key] === properties[key];
    });
  });
}
/**
 * Reshapes a data set based on a list of keys. Turns data in the
 * form of an object with properties into an array of tuples
 * For example {country: "Albania", size: 26, foo: 19} becomes
 * [{key: "size", value: 26}, {key: "foo", value: 19]}.
 * Only the keys listed are included in the output.
 * @param data
 * @param keys
 */
function reshapeData(data, keys) {
  let output = Object.entries(data).map(([key, value]) => ({ key, value }));
  output = output.filter(function (entry) {
    return keys.includes(entry.key);
  });
  return output;
}
function getDefaultFromRequest(key) {
  let queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(key);
}
// TODO find a nice way to inject a theme
function getThemeColour(key, variant = 'normal') {
  key = key.toLowerCase().replace(/\s/g, '-');
  let themes = {};
  themes['darkest'] = {
    "technical-robustness": '#536B35',
    "accessibility-and-inclusion": '#291E44',
    "public-engagement": '#136664',
    'effectiveness': '#600B4E',
    'service-experience': '#3A191D'
  };
  themes['dark'] = {
    "technical-robustness": '#719148',
    "accessibility-and-inclusion": '#3f306a',
    "public-engagement": '#1a8b89',
    'effectiveness': '#86106c',
    'service-experience': '#ae4a56'
  };
  themes['normal'] = {
    "technical-robustness": '#96c160',
    "accessibility-and-inclusion": '#7e60d4',
    "public-engagement": '#23b9b6',
    'effectiveness': '#b31590',
    'service-experience': '#e86372'
  };
  themes['light'] = {
    "technical-robustness": '#B3E874',
    "accessibility-and-inclusion": '#9570F9',
    "public-engagement": '#2AE0DD',
    'effectiveness': '#D81AAF',
    'service-experience': '#FF6D7E'
  };
  themes['lightest'] = {
    "technical-robustness": '#C5FF7F',
    "accessibility-and-inclusion": '#9872FF',
    "public-engagement": '#30FFFB',
    'effectiveness': '#FF1ECE',
    'service-experience': '#FF6D96'
  };
  let theme = themes[variant];
  if (key in theme) {
    return theme[key];
  }
  return null;
}
function hexToRgbA(hex, alpha) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
  }
  throw new Error('Bad Hex');
}

export { getThemeColour as a, findByMatchingProperties as b, format_table_value as c, format_value as f, getDefaultFromRequest as g, hexToRgbA as h, number_format as n };

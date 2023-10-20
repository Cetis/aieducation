/**
 * Class representing a single key:value pair with metadata
 */
class DataItem {
  constructor() {
    /**
     * The key of the data item
     */
    this.key = null;
    /**
     * The value of the data item.
     */
    this.value = null;
    /**
     * The category of the item, typically the 'pillar' that the key ('indicator') belongs to
     */
    this.keyCategory = null;
  }
  /**
   * Populates the item from a tuple
   * @param tuple
   */
  fromTuple(tuple) {
    this.key = tuple.key;
    this.value = tuple.value;
  }
  /**
   * Returns a copy of this DataItem as a tuple
   */
  asTuple() {
    let tuple = {};
    tuple[this.key] = this.value;
    return tuple;
  }
}
/**
 * A class representing a single 'entity' and all of its properties
 * as an array of DataItem instances. Provides convenience methods for
 * treating the object as a conventional object
 */
class DataObject {
  constructor() {
    this.items = [];
  }
  /**
   * Returns the DataItem specified by the
   * key, or null if there is not exactly one
   * matching item
   * @param key
   */
  getItem(key) {
    let item = this.items.filter(function (item) {
      return item.key === key;
    });
    if (item.length === 1) {
      return item[0];
    }
    return null;
  }
  /**
   * Gets the value for the specified key
   * @param key
   */
  get(key) {
    let item = this.getItem(key);
    if (item)
      return item.value;
    return null;
  }
  /**
   * Filters an object to only contain matching keys.
   * The returns a copy of the object rather than
   * modifying the original
   * @param keys
   */
  filter(keys) {
    let items = this.items;
    if (this.items.length > 0) {
      items = this.items.filter(function (entry) {
        return keys.includes(entry.key);
      });
    }
    let dataObject = new DataObject();
    dataObject.items = items;
    return dataObject;
  }
  /**
   * Returns true if the object contains the specified item
   * @param item
   */
  contains(item) {
    let result = this.items.filter(function (entry) {
      return (entry.key === item.key && (entry.value === item.value || item.value === '*any'));
    });
    return result.length !== 0;
  }
  /**
   * Returns a copy of the DataObject as a standard
   * JS Object with property tuples rather than
   * a list of items.
   */
  asObject() {
    let obj = {};
    for (let i = 0; i < this.items.length; i++) {
      obj[this.items[i].key] = this.items[i].value;
    }
    return obj;
  }
  /**
   * Populates the DataObject from an object,
   * converting its properties into DataItem instances
   * @param obj
   */
  fromObject(obj) {
    let tuples = this.reshapeData(obj, null);
    for (let i = 0; i < tuples.length; i++) {
      let item = new DataItem();
      item.fromTuple(tuples[i]);
      this.items.push(item);
    }
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
  reshapeData(data, keys) {
    let output = Object.entries(data).map(([key, value]) => ({ key, value }));
    if (keys) {
      output = output.filter(function (entry) {
        return keys.includes(entry.key);
      });
    }
    return output;
  }
}
/**
 * Data in 'wide' format - one row per entity with multiple properties
 */
const WIDE = 'WIDE';
/**
 * Data in 'long' format - one row per property, with entities across many rows
 */
const LONG = 'LONG';
/**
 * Data in GeoJSON format
 */
const GEOJSON = 'GEOJSON';
/**
 * Class representing a complete data model,
 * for example loaded from a JSON or CSV file.
 * The model is exposed as a collection of
 * DataObject instances and retains metadata
 * taken from the source data such as categories
 * of properties for 'long' formatted data.
 * ('Wide' data and GeoJSON data does not contain
 * key category metadata)
 *
 * Typical usage is to instantiate with a JSON
 * object and then obtain a collection of objects
 * using get({filter} or a single object using
 * getOne({filter}), and then perform further
 * operations on the DataObjects using their
 * class methods.
 *
 * Filters are objects with key:value pairs
 * e.g. {country: 'Spain'} used to match
 * objects. The '*any' meta-value is used
 * to match objects that contain the key
 * with any value, including null.
 *
 * Additional utility methods available are:
 *
 * getValues(key) returns the domain of a key used
 * in the data
 *
 * keyList(str) returns a list of keys from a given
 * string, interpolated with metadata from the
 * model if it contains a '@pillar' or '@indicator'
 * keyword.
 *
 * getPillar(key) returns the 'pillar' (keyCategory)
 * for a key. Not available for wide and GeoJSON data.
 *
 * The original, unmodified data supplied to the
 * model can be accessed from the source_data
 * property.
 *
 */
class DataModel {
  constructor(data, sourceDataType = null, group = null, mappings = null) {
    /**
     * The original, unmodified data object used to create the model
     */
    this.source_data = null;
    /**
     * The DataObject instances in this model
     */
    this.data = null;
    /**
     * The type of data this model was created from, e.g. WIDE
     */
    this.sourceDataType = null;
    /**
     * For LONG data, the grouping key used to identify entities across
     * multiple rows.
     */
    this.group = null;
    /**
     * Mappings, in the form of key:value tuples, used to identify
     * keys, keyCategories, values and dimensions in the source data
     */
    this.mappings = {};
    /**
     * The set of all the keys in the DataObjects in the model
     */
    this.keys = null;
    /**
     * The set of all the keyCategories in the DataObjects in the model
     */
    this.keyCategories = null;
    /**
     * Metadata in the model - keys and their categories
     */
    this.metadata = {};
    this.source_data = data;
    this.sourceDataType = sourceDataType;
    this.group = group;
    this.mappings = mappings;
    this.keys = new Set();
    this.keyCategories = new Set();
    this.createInternalRepresentation();
  }
  /**
   * Builds the model from the source data
   * @private
   */
  createInternalRepresentation() {
    this.data = [];
    if (!this.sourceDataType) {
      this.detectDataStructure();
    }
    if (this.sourceDataType === WIDE) {
      this.importWideData();
    }
    else if (this.sourceDataType === LONG) {
      this.importLongData();
    }
    else {
      this.importGeoJSONData();
    }
  }
  /**
   * Tries to auto-detect the structure of data
   * @private
   */
  detectDataStructure() {
    if ('features' in this.source_data) {
      // GeoJSON
      this.sourceDataType = GEOJSON;
    }
    else if ('value' in this.source_data[0]) {
      // if the data includes a 'value' column, its probably 'long' data
      let fields = Object.keys(this.source_data[0]);
      this.sourceDataType = LONG;
      this.mappings = {};
      this.mappings['value'] = 'value';
      fields = pop(fields, 'value');
      // Our default group is 'country'
      if ('Country' in this.source_data[0]) {
        this.group = 'Country';
        fields = pop(fields, 'Country');
      }
      else if ('country' in this.source_data[0]) {
        this.group = 'country';
        fields = pop(fields, 'country');
      }
      // Try some default mappings
      if ('indicator' in this.source_data[0]) {
        this.mappings['key'] = 'indicator';
        fields = pop(fields, 'indicator');
      }
      if ('measure' in this.source_data[0]) {
        this.mappings['key'] = 'measure';
        fields = pop(fields, 'measure');
      }
      if ('pillar' in this.source_data[0]) {
        this.mappings['keyCategory'] = 'pillar';
        fields = pop(fields, 'pillar');
      }
      if ('category' in this.source_data[0]) {
        this.mappings['keyCategory'] = 'category';
        fields = pop(fields, 'category');
      }
      // Whatever we're left with is probably the group!
      if (!this.group) {
        this.group = fields.pop();
      }
    }
    else {
      this.sourceDataType = WIDE;
    }
  }
  /**
   * With "Wide" data, each row is a data object
   * @private
   */
  importWideData() {
    for (let i = 0; i < this.source_data.length; i++) {
      let obj = new DataObject();
      let sourceObject = this.source_data[i];
      obj.fromObject(sourceObject);
      this.data.push(obj);
    }
  }
  /**
   * With "Long" data, each row is a single item, grouped by one
   * or more keys
   * @private
   */
  importLongData() {
    // First, define objects based on groups
    let groups = [];
    for (let i = 0; i < this.source_data.length; i++) {
      let group = this.source_data[i][this.group];
      if (!groups.includes(group)) {
        groups.push(this.source_data[i][this.group]);
      }
    }
    let objects = [];
    for (let i = 0; i < groups.length; i++) {
      let group = new DataObject();
      let groupName = new DataItem();
      groupName.key = this.group;
      groupName.value = groups[i];
      group.items.push(groupName);
      objects.push(group);
    }
    // Define fields and find any that aren't mapped
    let fields = Object.keys(this.source_data[0]);
    let mappedFields = Object.values(this.mappings);
    fields = pop(fields, this.group);
    fields = fields.filter(function (item) {
      return mappedFields.indexOf(item) === -1;
    });
    // Next, import all the items
    for (let i = 0; i < this.source_data.length; i++) {
      let src = this.source_data[i];
      let item = new DataItem();
      item.key = src[this.mappings['key']];
      item.value = src[this.mappings['value']];
      item.keyCategory = src[this.mappings['keyCategory']];
      // Add to magic indicators/pillars lists
      if (item.key !== item.keyCategory) {
        this.metadata[item.key] = item.keyCategory;
        this.keys.add(item.key);
        this.keyCategories.add(item.keyCategory);
      }
      // Find a group object to add it to
      let group = src[this.group];
      for (let g = 0; g < objects.length; g++) {
        if (objects[g].get(this.group) == group) {
          objects[g].items.push(item);
        }
      }
    }
    // Finally lets add any 'dimensions'
    // Unmapped items are most likely dimensions
    // at object level, so we add them there.
    for (let i = 0; i < objects.length; i++) {
      let object = objects[i];
      let dimensions = [];
      for (let i = 0; i < fields.length; i++) {
        let item = new DataItem();
        item.key = fields[i];
        //
        // Find the first value from the source
        // data and use it for the object
        //
        let groupKey = this.group;
        let groupValue = object.get(this.group);
        let groupRows = this.source_data.filter(function (entry) {
          return entry[groupKey] == groupValue;
        });
        item.value = groupRows[0][fields[i]];
        item.keyCategory = 'dimensions';
        dimensions.push(item);
      }
      object.items = object.items.concat(dimensions);
    }
    this.data = objects;
  }
  /**
   * Import GeoJSON data
   * @private
   */
  importGeoJSONData() {
    let data = this.source_data.features;
    for (let i = 0; i < data.length; i++) {
      let obj = new DataObject();
      let sourceObject = data[i].properties;
      obj.fromObject(sourceObject);
      this.data.push(obj);
    }
  }
  /**
   * Gets the pillar name for an indicator
   * @param indicator
   */
  getPillar(indicator) {
    if (indicator in this.metadata) {
      return this.metadata[indicator];
    }
    if (Object.values(this.metadata).includes(indicator)) {
      return indicator;
    }
    return null;
  }
  /**
   * Returns a list of keys including interpolation of 'magic' keywords
   * converting @pillars into the set of keyCategories and @indicators
   * into the set of keys.
   * @param keys the string containing keys separated by commas
   * @param pillar optional pillar to filter @indicators by
   */
  keyList(keys, pillar = null) {
    if (!keys)
      return [];
    let keyList = keys.split(',').map(s => s.trim());
    let pillarIdx = keyList.indexOf('@pillars');
    let indicatorIdx = keyList.indexOf('@indicators');
    if (pillarIdx !== -1) {
      keyList.splice(pillarIdx, 1, ...Array.from(this.keyCategories));
    }
    if (indicatorIdx !== -1) {
      if (pillar) {
        let keys = [];
        for (const [key, value] of Object.entries(this.metadata)) {
          if (value === pillar) {
            keys.push(key);
          }
        }
        keyList.splice(indicatorIdx, 1, ...Array.from(keys));
      }
      else {
        keyList.splice(indicatorIdx, 1, ...Array.from(this.keys));
      }
    }
    return keyList;
  }
  /**
   * Converts an object into a filter using
   * DataObject as the new class
   * @param objectFilter
   * @private
   */
  static getDataItemFilter(objectFilter) {
    let dataItemFilter = new DataObject();
    dataItemFilter.fromObject(objectFilter);
    return dataItemFilter;
  }
  /**
   * Returns the DataObjects in this model matching the supplied
   * filter. The filter itself is an object used as a template for
   * matching DataObjects.
   * @param filter
   */
  get(filter = {}) {
    let output = this.filterByMatchingItems(this.data, DataModel.getDataItemFilter(filter));
    if (!output)
      return null;
    return output;
  }
  /**
   * Returns the DataObjects in this model matching the supplied
   * filter. The filter itself is an object used as a template for
   * matching DataObjects. Unlike get(filter) this only returns
   * a single object, and null if there isn't exactly one match
   * @param filter
   */
  getOne(filter = {}) {
    let results = this.get(filter);
    if (results.length === 1) {
      return results[0].asObject();
    }
    return null;
  }
  /**
   * For a given key, return the value of all matching
   * objects in the model
   * @param key
   */
  getValues(key) {
    let values = [];
    for (let i = 0; i < this.data.length; i++) {
      values.push(this.data[i].get(key));
    }
    return values;
  }
  /**
   * Filters a set (array or other collection) using an DataObject
   * as a filter. Underlying implementation of the public get() function.
   * @param set
   * @param filter
   * @private
   */
  filterByMatchingItems(set, filter) {
    return set.filter(function (entry) {
      for (let i in filter.items) {
        if (!entry.contains(filter.items[i])) {
          return false;
        }
      }
      return true;
    });
  }
}
/**
 * Loads a dataset from a URL, or from the browser's
 * Cache API if available.
 * @returns {Promise<DataModel>}
 */
async function loadDataModel(url) {
  const cacheVersion = 2;
  const cacheName = `data-model-${cacheVersion}`;
  if (!url)
    return null;
  if ('caches' in window) {
    await deleteOldCaches(cacheName);
    return caches.open(cacheName).then(modelCache => 
    // @ts-ignore
    modelCache.match(url).then(response => {
      if (response) {
        return response.json().then(data => {
          return new DataModel(data);
        });
      }
      else {
        return fetch(url).then(response => {
          let responseCopy = response.clone();
          return response.json().then(data => {
            modelCache.put(url, responseCopy);
            return new DataModel(data);
          });
        });
      }
    }));
  }
  else {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
      return new DataModel(data);
    });
  }
}
/**
 * Delete any old caches to respect user's disk space,
 * only keeping the named cache
 * @param currentCache
 */
async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();
  for (const key of keys) {
    const isOurCache = key.startsWith('data-model-');
    if (currentCache === key || !isOurCache) {
      continue;
    }
    await caches.delete(key);
  }
}
/**
 * Utility function similar to Python's pop(value)
 * @param arr
 * @param value
 */
function pop(arr, value) {
  arr = arr.filter(e => e !== value);
  return arr;
}

export { loadDataModel as l };

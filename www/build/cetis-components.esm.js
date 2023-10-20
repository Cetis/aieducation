import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-48801938.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.17.1 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-551d7421.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["oi-filter",[[1,"oi-filter",{"values":[1],"description":[1],"dataSrc":[1,"data-src"],"columnName":[1,"column-name"],"label":[1],"name":[1],"enableSearch":[4,"enable-search"],"enableClearSelection":[4,"enable-clear-selection"],"selected":[1]},[[8,"oi-filter","measureSelected"]]]]],["oi-bar-chart",[[1,"oi-bar-chart",{"dataSrc":[1,"data-src"],"keys":[1],"name":[1],"country":[1],"compareWith":[1,"compare-with"],"benchmark":[1],"size":[1],"pillar":[1025],"useTheme":[4,"use-theme"],"theme":[1]},[[8,"oi-filter","countrySelected"]]]]],["oi-beeswarm",[[1,"oi-beeswarm",{"listenToMeasureChanges":[4,"listen-to-measure-changes"],"dataSrc":[1,"data-src"],"color":[1],"size":[1],"radius":[2],"measureName":[1025,"measure-name"],"keys":[1],"pillar":[1025]},[[8,"oi-filter","measureSelected"]]]]],["oi-bullet-chart",[[1,"oi-bullet-chart",{"dataSrc":[1,"data-src"],"keys":[1],"country":[1],"benchmark":[1]},[[8,"oi-filter","countrySelected"]]]]],["oi-country",[[1,"oi-country",{"dataSrc":[1,"data-src"],"name":[1],"theme":[1],"countryName":[1,"country-name"]},[[8,"oi-filter","countrySelected"]]]]],["oi-country-fiche",[[1,"oi-country-fiche",{"focusOnSelection":[4,"focus-on-selection"],"dataSrc":[1,"data-src"],"countryName":[32]},[[8,"oi-filter","countrySelected"]]]]],["oi-country-list",[[1,"oi-country-list",{"trigger":[1],"dataSrc":[1,"data-src"],"sortBy":[1,"sort-by"],"sort":[1],"columns":[1],"heatmap":[4],"useTheme":[4,"use-theme"],"precision":[2],"pillar":[1025]},[[8,"oi-filter","countrySelected"]]]]],["oi-fact",[[1,"oi-fact",{"dataSrc":[1,"data-src"],"name":[1],"numeratorName":[1,"numerator-name"],"denominatorName":[1,"denominator-name"],"denominator":[2],"countryName":[32]},[[8,"oi-filter","countrySelected"]]]]],["oi-map",[[1,"oi-map",{"listenToMeasureChanges":[4,"listen-to-measure-changes"],"dataSrc":[1,"data-src"],"measureName":[1,"measure-name"],"zoom":[2],"lowColour":[1025,"low-colour"],"midColour":[1025,"mid-colour"],"highColour":[1025,"high-colour"],"centerX":[2,"center-x"],"centerY":[2,"center-y"],"tooltipBackgroundColour":[1,"tooltip-background-colour"],"tooltipColour":[1,"tooltip-colour"],"mapBackgroundColour":[1,"map-background-colour"],"mapCountryEdgeColour":[1,"map-country-edge-colour"],"noDataColour":[1,"no-data-colour"],"useTheme":[4,"use-theme"],"useThemeReversed":[4,"use-theme-reversed"],"shouldUpdate":[32]},[[8,"oi-filter","measureSelected"]]]]],["oi-radial-barchart",[[1,"oi-radial-barchart",{"dataSrc":[1,"data-src"],"keys":[1],"colours":[1],"name":[1],"countryName":[1025,"country-name"],"useTheme":[4,"use-theme"],"showLabels":[4,"show-labels"],"theme":[1]},[[8,"oi-filter","countrySelected"]]]]],["oi-share",[[1,"oi-share",{"hashtags":[1],"text":[1],"service":[1],"url":[1],"appendParameters":[4,"append-parameters"],"variant":[1],"params":[32]},[[8,"oi-filter","filter"]]]]],["oi-text",[[4,"oi-text",null,[[8,"globalCountrySelect","countrySelected"]]]]],["choicesjs-stencil",[[0,"choicesjs-stencil",{"type":[1],"value":[1],"name":[1],"silent":[4],"items":[16],"choices":[16],"renderChoiceLimit":[2,"render-choice-limit"],"maxItemCount":[2,"max-item-count"],"addItems":[4,"add-items"],"removeItems":[4,"remove-items"],"removeItemButton":[4,"remove-item-button"],"editItems":[4,"edit-items"],"duplicateItemsAllowed":[4,"duplicate-items-allowed"],"delimiter":[1],"paste":[4],"searchEnabled":[4,"search-enabled"],"searchChoices":[4,"search-choices"],"searchFields":[1,"search-fields"],"searchFloor":[2,"search-floor"],"searchResultLimit":[2,"search-result-limit"],"position":[1],"resetScrollPosition":[4,"reset-scroll-position"],"shouldSort":[4,"should-sort"],"shouldSortItems":[4,"should-sort-items"],"sorter":[16],"placeholder":[8],"placeholderValue":[1,"placeholder-value"],"searchPlaceholderValue":[1,"search-placeholder-value"],"prependValue":[1,"prepend-value"],"appendValue":[1,"append-value"],"renderSelectedChoices":[1,"render-selected-choices"],"loadingText":[1,"loading-text"],"noResultsText":[1,"no-results-text"],"noChoicesText":[1,"no-choices-text"],"itemSelectText":[1,"item-select-text"],"addItemText":[1,"add-item-text"],"maxItemText":[1,"max-item-text"],"uniqueItemText":[1,"unique-item-text"],"classNames":[16],"fuseOptions":[16],"addItemFilter":[1,"add-item-filter"],"customAddItemText":[1,"custom-add-item-text"],"callbackOnInit":[16],"callbackOnCreateTemplates":[16],"valueComparer":[16],"highlightItem":[64],"unhighlightItem":[64],"highlightAll":[64],"unhighlightAll":[64],"removeActiveItemsByValue":[64],"removeActiveItems":[64],"removeHighlightedItems":[64],"showDropdown":[64],"hideDropdown":[64],"getValue":[64],"setValue":[64],"setChoiceByValue":[64],"setChoices":[64],"clearChoices":[64],"clearStore":[64],"clearInput":[64],"enable":[64],"disable":[64],"ajax":[64]}]]]], options);
});

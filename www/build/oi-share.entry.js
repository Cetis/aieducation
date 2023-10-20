import { r as registerInstance, h, e as Host, g as getElement } from './index-48801938.js';

const oiShareCss = "a.button{position:relative;border-radius:5px;height:20px;background-color:#3388ff;color:white;text-align:right;text-decoration:none;padding:10px 10px 10px 40px}a.icon{position:relative;height:20px;color:black;text-align:right;text-decoration:none;padding:10px 10px 10px 40px}a.facebook.button{background-color:rgb(56, 88, 152)}a.twitter.button{background-color:rgb(29, 155, 240)}svg{display:inline-block;position:absolute;top:12px;left:12px;height:40%}";

const OiShare = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.TWITTER = 'twitter';
    this.FB = 'facebook';
    this.LINKEDIN = 'linkedin';
    this.ICON = 'icon';
    this.BUTTON = 'button';
    /**
     * The hashtags to include in the share
     * @type {string}
     */
    this.hashtags = 'test';
    /**
     * The text of the share
     * @type {string}
     */
    this.text = 'Test';
    /**
     * The service to share using - twitter, facebook or linkedin
     */
    this.service = this.TWITTER;
    /**
     * The URL to include in the tweet
     * @type {string}
     */
    this.url = 'https://jisc.ac.uk';
    /**
     * If true, append parameters to the URL for any filters set on the page
     * @type {boolean}
     */
    this.appendParameters = true;
    this.variant = this.ICON;
    this.params = {};
  }
  /**
   * Listen to filter selections and append to URL
   */
  filter(event) {
    if (event.detail && event.detail.filter) {
      this.params[event.detail.filter] = event.detail.value;
      // This is a hack to make a copy of the object to trigger stencil's lifecycle events
      this.params = Object.assign({}, this.params);
    }
  }
  path() {
    if (this.service === this.TWITTER) {
      return 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z';
    }
    else if (this.service === this.FB) {
      return 'M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z';
    }
    else
      return 'M19.959 11.719v7.379h-4.278v-6.885c0-1.73-.619-2.91-2.167-2.91-1.182 0-1.886.796-2.195 1.565-.113.275-.142.658-.142 1.043v7.187h-4.28s.058-11.66 0-12.869h4.28v1.824l-.028.042h.028v-.042c.568-.875 1.583-2.126 3.856-2.126 2.815 0 4.926 1.84 4.926 5.792zM2.421.026C.958.026 0 .986 0 2.249c0 1.235.93 2.224 2.365 2.224h.028c1.493 0 2.42-.989 2.42-2.224C4.787.986 3.887.026 2.422.026zM.254 19.098h4.278V6.229H.254v12.869z';
  }
  viewbox() {
    if (this.service === this.TWITTER) {
      return '0 0 512 512';
    }
    else if (this.service === this.FB) {
      return '0 0 310 310';
    }
    else if (this.service === this.LINKEDIN) {
      return '-2 -2 24 24';
    }
  }
  /**
   * Creates a URL by appending parameters to the base URL
   */
  getUrl() {
    if (!this.url) {
      return '';
    }
    let url = new URL(this.url);
    if (this.appendParameters) {
      for (let [k, v] of Object.entries(this.params)) {
        if (typeof v === 'string') {
          url.searchParams.append(k, v);
        }
      }
    }
    return url.toString();
  }
  link() {
    if (this.service === this.TWITTER) {
      let url = new URL('https://twitter.com/intent/tweet');
      url.searchParams.append('text', this.text);
      url.searchParams.append('url', this.getUrl());
      url.searchParams.append('hashtags', this.hashtags);
      return url.toString();
    }
    else if (this.service === this.FB) {
      let url = new URL('https://www.facebook.com/sharer.php');
      url.searchParams.append('u', this.getUrl());
      return url.toString();
    }
    else if (this.service === this.LINKEDIN) {
      let url = new URL('https://www.linkedin.com/shareArticle');
      url.searchParams.append('mini', 'true');
      url.searchParams.append('url', this.getUrl());
      url.searchParams.append('summary', this.text);
      return url.toString();
    }
  }
  render() {
    return (h(Host, { tabindex: '0' }, h("a", { href: this.link(), class: this.service + ' ' + this.variant, target: '_blank' }, h("svg", { viewBox: this.viewbox() }, h("path", { fill: 'currentColor', d: this.path() })), this.variant === this.BUTTON &&
      h("slot", null))));
  }
  get element() { return getElement(this); }
};
OiShare.style = oiShareCss;

export { OiShare as oi_share };

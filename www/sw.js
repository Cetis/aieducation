/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "5a5be9f69614e8d14a1599965be088a5"
  },
  {
    "url": "aieducation/build/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "aieducation/build/p-1078ca38.entry.js"
  },
  {
    "url": "aieducation/build/p-1e7506b0.js"
  },
  {
    "url": "aieducation/build/p-203bcab2.entry.js"
  },
  {
    "url": "aieducation/build/p-20b6ed2d.entry.js"
  },
  {
    "url": "aieducation/build/p-26a2e3e9.entry.js"
  },
  {
    "url": "aieducation/build/p-373b29c4.js"
  },
  {
    "url": "aieducation/build/p-39efb889.entry.js"
  },
  {
    "url": "aieducation/build/p-3a3f2088.entry.js"
  },
  {
    "url": "aieducation/build/p-3e8ff66b.js"
  },
  {
    "url": "aieducation/build/p-3f696ae7.entry.js"
  },
  {
    "url": "aieducation/build/p-3fd925b5.entry.js"
  },
  {
    "url": "aieducation/build/p-4afb4000.entry.js"
  },
  {
    "url": "aieducation/build/p-4de2876a.entry.js"
  },
  {
    "url": "aieducation/build/p-56e73c83.js"
  },
  {
    "url": "aieducation/build/p-5856ef41.entry.js"
  },
  {
    "url": "aieducation/build/p-68751d42.js"
  },
  {
    "url": "aieducation/build/p-90239767.entry.js"
  },
  {
    "url": "aieducation/build/p-94ded2b9.entry.js"
  },
  {
    "url": "aieducation/build/p-a71d77b7.entry.js"
  },
  {
    "url": "aieducation/build/p-d9655876.js"
  },
  {
    "url": "aieducation/build/p-e6875359.css"
  },
  {
    "url": "build/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "build/p-1078ca38.entry.js"
  },
  {
    "url": "build/p-1e7506b0.js"
  },
  {
    "url": "build/p-203bcab2.entry.js"
  },
  {
    "url": "build/p-20b6ed2d.entry.js"
  },
  {
    "url": "build/p-26a2e3e9.entry.js"
  },
  {
    "url": "build/p-373b29c4.js"
  },
  {
    "url": "build/p-39efb889.entry.js"
  },
  {
    "url": "build/p-3a3f2088.entry.js"
  },
  {
    "url": "build/p-3e8ff66b.js"
  },
  {
    "url": "build/p-3f696ae7.entry.js"
  },
  {
    "url": "build/p-3fd925b5.entry.js"
  },
  {
    "url": "build/p-4afb4000.entry.js"
  },
  {
    "url": "build/p-4de2876a.entry.js"
  },
  {
    "url": "build/p-56e73c83.js"
  },
  {
    "url": "build/p-5856ef41.entry.js"
  },
  {
    "url": "build/p-68751d42.js"
  },
  {
    "url": "build/p-90239767.entry.js"
  },
  {
    "url": "build/p-94ded2b9.entry.js"
  },
  {
    "url": "build/p-a71d77b7.entry.js"
  },
  {
    "url": "build/p-d9655876.js"
  },
  {
    "url": "build/p-e6875359.css"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

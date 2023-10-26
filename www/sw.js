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
    "revision": "902875edab06956ce207737378b3a733"
  },
  {
    "url": "aieducation/build/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "aieducation/build/p-1e7506b0.js"
  },
  {
    "url": "aieducation/build/p-26929299.entry.js"
  },
  {
    "url": "aieducation/build/p-370ff099.entry.js"
  },
  {
    "url": "aieducation/build/p-373b29c4.js"
  },
  {
    "url": "aieducation/build/p-3e8ff66b.js"
  },
  {
    "url": "aieducation/build/p-4afb4000.entry.js"
  },
  {
    "url": "aieducation/build/p-4de2876a.entry.js"
  },
  {
    "url": "aieducation/build/p-5856ef41.entry.js"
  },
  {
    "url": "aieducation/build/p-5d43805d.entry.js"
  },
  {
    "url": "aieducation/build/p-68751d42.js"
  },
  {
    "url": "aieducation/build/p-6fdf68a4.entry.js"
  },
  {
    "url": "aieducation/build/p-721c6aed.entry.js"
  },
  {
    "url": "aieducation/build/p-794a040d.js"
  },
  {
    "url": "aieducation/build/p-a51e011f.entry.js"
  },
  {
    "url": "aieducation/build/p-a71d77b7.entry.js"
  },
  {
    "url": "aieducation/build/p-d20b2e75.entry.js"
  },
  {
    "url": "aieducation/build/p-dc7b2e6a.entry.js"
  },
  {
    "url": "aieducation/build/p-e33dfbd0.entry.js"
  },
  {
    "url": "aieducation/build/p-e6875359.css"
  },
  {
    "url": "aieducation/build/p-fdff0b98.js"
  },
  {
    "url": "aieducation/build/p-fefc73ae.entry.js"
  },
  {
    "url": "build/index.esm.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "build/p-1e7506b0.js"
  },
  {
    "url": "build/p-26929299.entry.js"
  },
  {
    "url": "build/p-370ff099.entry.js"
  },
  {
    "url": "build/p-373b29c4.js"
  },
  {
    "url": "build/p-3e8ff66b.js"
  },
  {
    "url": "build/p-4afb4000.entry.js"
  },
  {
    "url": "build/p-4de2876a.entry.js"
  },
  {
    "url": "build/p-5856ef41.entry.js"
  },
  {
    "url": "build/p-5d43805d.entry.js"
  },
  {
    "url": "build/p-68751d42.js"
  },
  {
    "url": "build/p-6fdf68a4.entry.js"
  },
  {
    "url": "build/p-721c6aed.entry.js"
  },
  {
    "url": "build/p-794a040d.js"
  },
  {
    "url": "build/p-a51e011f.entry.js"
  },
  {
    "url": "build/p-a71d77b7.entry.js"
  },
  {
    "url": "build/p-d20b2e75.entry.js"
  },
  {
    "url": "build/p-dc7b2e6a.entry.js"
  },
  {
    "url": "build/p-e33dfbd0.entry.js"
  },
  {
    "url": "build/p-e6875359.css"
  },
  {
    "url": "build/p-fdff0b98.js"
  },
  {
    "url": "build/p-fefc73ae.entry.js"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

(function() {
  'use strict';

  var cacheName = 'cache_v4.2';
  var cacheFiles = [
    './',
    './index.html',
    './sw.js',
    './manifest.json',
    './src/assets/js/libs/sweetalert.min.js',
    './src/assets/js/libs/leaflet.awesome-markers.js',
    './src/assets/images/evento.svg',
    './src/assets/images/fixo.svg',
    './src/assets/images/markers-shadow.png',
    './src/assets/images/markers-shadow@2x.png',
    './src/assets/images/markers-soft.png',
    './src/assets/images/markers-soft@2x.png',
    './dist/bundle.js'
  ];

  // ====

  // Primeiro evento / acontece apenas uma vez
  function Install(event) {
    event.waitUntil(
      caches
      .open(cacheName)
      .then(function(cache) {
        return cache.addAll(cacheFiles)
      })
      .then(function() {
        return self.skipWaiting()
      })
    );
  }

  // Deleta o cache mais antigo
  function Activate(event) {
    event.waitUntil(
      caches
      .keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== cacheName) return caches.delete(key)
        }))
      })
    )

    return self.clients.claim();
  }

  // Trigger para todos os requests da aplicação
  function Fetch(event) {
    event.respondWith(
      caches
      .match(event.request)
      .then(function(response) {
        return response || fetch(event.request)
      })
    );
  }

  // ====

  self.addEventListener('install', Install);
  self.addEventListener('activate', Activate);
  self.addEventListener('fetch', Fetch);
})();
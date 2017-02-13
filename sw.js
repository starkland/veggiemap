var cacheName = 'cache_v1';
var filesToCache = [
  './',
  './index.html',
  './css/main.css',
  './images/evento.svg',
  './images/fixo.svg',
  './js/app.js',
  './js/modules/core.js',
  './js/modules/form.js',
  './js/modules/map.js',
  './js/controllers/form.js',
  './js/controllers/map.js',
  './js/services/maps.js',
  './js/services/network.js',
  './js/services/firebase.js'
];

// ====

// Primeiro evento / acontece apenas uma vez
function installServiceWorker(event) {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache).then(function() {
        self.skipWaiting();
      });
    })
  );
}

// Deleta o cache mais antigo
function activateServiceWorker(event) {
  console.info('Event: Activate');

  event.waitUntil(
    caches.keys().then(cacheName, function() {
      return Promise.all(
        cacheName.map(function (cache) {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      )
    })
  );
}

// Trigger para todos os requests da aplicação
function fetchServiceWorker(event) {
  console.info('Event: Activate', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          })
        });
      }
    })
  );
}

// ====

self.addEventListener('install', installServiceWorker);
self.addEventListener('activate', activateServiceWorker);
self.addEventListener('fetch', fetchServiceWorker);
(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    return installServiceWorker()
  }

  // ====

  function installServiceWorker() {
    navigator.serviceWorker.register('./service-worker.js');
  }
})();
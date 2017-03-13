(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    return installServiceWorker()
  }

  // ====

  function installServiceWorker() {
    navigator.serviceWorker.register('./service-worker.js');
    navigator.serviceWorker.oncontrollerchange = onControllerChange
  }

  //

  function onControllerChange(event) {
    console.warn('A partir de agora, o evento de activate foi disparado.', event);
  }
})();
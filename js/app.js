(function() {
  'use strict';

  function InitApp($window, $rootScope) {
    $window.addEventListener('offline', function() {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);

    $window.addEventListener('online', function() {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
  }

  angular.module('VeggieMap',
    [
      'Core',
      'Form',
      'Map'
    ]
  ).run(InitApp);
})();
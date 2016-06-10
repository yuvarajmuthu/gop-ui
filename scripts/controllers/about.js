'use strict';

/**
 * @ngdoc function
 * @name opskyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the opskyApp
 */
angular.module('opskyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

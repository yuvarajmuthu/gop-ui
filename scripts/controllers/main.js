'use strict';

/**
 * @ngdoc function
 * @name opskyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the opskyApp
 */
angular.module('opskyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

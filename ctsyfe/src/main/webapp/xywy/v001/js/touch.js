"use strict";

angular.module("touch", [])
.directive("ngTouchstart", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      $element.bind('touchstart', onTouchStart);

      function onTouchStart(event) {
        var method = $element.attr('ng-touchstart');
        $scope.$event = event;
        $scope.$apply(method);
      };
    }
  };
})
.directive("ngTouchmove", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      $element.bind('touchmove', ngTouchmove);

      function ngTouchmove(event) {
        var method = $element.attr('ng-touchmove');
        $scope.$event = event;
        $scope.$apply(method);
      };
    }
  };
})
.directive("ngTouchend", function () {
	  return {
	    controller: function ($scope, $element, $attrs) {
	      $element.bind('touchend', ngTouchend);

	      function ngTouchend(event) {
	        var method = $element.attr('ng-touchend');
	        $scope.$event = event;
	        $scope.$apply(method);
	      };
	    }
	  };
})
.directive("ngTouchcancel", function () {
    return {
      controller: function ($scope, $element, $attrs) {
        $element.bind('touchcancel', ngTouchcancel);

        function ngTouchcancel(event) {
          var method = $element.attr('ng-touchcancel');
          $scope.$event = event;
          $scope.$apply(method);
        };
      }
    };
})
;


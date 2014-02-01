var justaminute = angular.module("justaminute", []);

justaminute.controller("CountdownController", function($scope, $interval){
  var intrvl, continuing;
  $scope.data = {};

  function countdown(seconds) {
    intrvl = $interval(function() {
      if(seconds > 1) {
	seconds -= 1;
	$scope.data.seconds = seconds;
      } else {
	var sound = new Howl({urls: ['ping.wav']}).play();
	if (continuing) {
	  seconds = 60;
	  $scope.data.seconds = seconds;
	} else {
	  $scope.data.seconds = 0;
	  $interval.cancel(intrvl);
	  intrvl = null;
	}
      }
    }, 1000);
  }

  $scope.reset = function() {
    if (intrvl){
      $interval.cancel(intrvl);
      countdown(60);
    } else {
      countdown(60)
    }
  };

  $scope.toggleContinuous = function() {
    if(!intrvl) {
      countdown(60)
    }
    continuing = !continuing;
    $scope.data.continuing = continuing;
  };

  $scope.stop = function() {
    if (intrvl) {
      $interval.cancel(intrvl);
      $scope.data.seconds = 0;
    }
  }

  countdown(60);
});

'use strict';

(function () {
  var timingFunctions = {
    parabola: function (timeFraction) {
      return -4 * Math.pow(timeFraction, 2) + 4 * timeFraction;
    },
    jump: function (timeFraction) {
      return -103 * Math.pow(timeFraction, 5) + 144.6 * Math.pow(timeFraction, 4) - 37 * Math.pow(timeFraction, 3) - 8 * Math.pow(timeFraction, 2) + 3.76 * timeFraction;
    },
    circ: function (timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction));
    },
    linear: function (timeFraction) {
      return timeFraction;
    },
    twoMount: function (timeFraction) {
      return -38.092 * Math.pow(timeFraction, 4) + 69.666 * Math.pow(timeFraction, 3) - 39.451 * Math.pow(timeFraction, 2) + 7.8369 * timeFraction - 0.0432;
    },
  };

  window.animate = function (draw, duration, timingFunction, endFunction) {
    var start = performance.now();

    var animation = function (step) {
      var timeFraction = (step - start) / duration;

      timeFraction = (timeFraction > 1) ? 1 : (timeFraction < 0) ? 0 : timeFraction;

      if (typeof timingFunction === 'string') {
        timingFunction = timingFunctions[timingFunction];
      }

      var progress = timingFunction(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animation);
      }

      if (timeFraction === 1 && endFunction) {
        endFunction();
      }
    };

    requestAnimationFrame(animation);
  };
})();

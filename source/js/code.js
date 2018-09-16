'use strict';

(function () {
  var CODE_OPTIONS = {
    top: [30, 40, 25, 60, 70],
    left: [5, 10, 15, 60, 70, 80],
    duration: [2500, 3000, 4500, 5500],
    timingFunctions: ['parabola', 'linear', 'twoMount'],
    fontSize: [20, 18, 14, 24, 28],
    code: [
      'for(let i = 0; i <= arr.length; i++) {}',
      'var getRandomNumber = function (to, from) {',
      'transform: translateX(-50%) scale(1.2)',
      'CODE_OPTIONS.timingFunctions[getRandomNumber(CODE_OPTIONS.timingFunctions.length - 1)]',
      'requestAnimationFrame(animation);',
      'return -38.092 * Math.pow(timeFraction, 4) + 69.666 * Math.pow(timeFraction, 3) - 39.451 * Math.pow(timeFraction, 2) + 7.8369 * timeFraction - 0.0432;'
    ]
  };
  var REPEAT_DURATION = [7000, 20000];
  var code = document.createElement('p');

  var getRandomNumber = function (to, from) {
    from = from || 0;

    return Math.round(Math.random() * (to - from) + from);
  };

  var clearCode = function () {
    code.textContent = '';

    var delay = getRandomNumber(REPEAT_DURATION[1], REPEAT_DURATION[0]);

    setTimeout(createCode, delay);
  };

  var createCode = function () {
    var str = CODE_OPTIONS.code[getRandomNumber(CODE_OPTIONS.code.length - 1)];
    var timingFunction = CODE_OPTIONS.timingFunctions[getRandomNumber(CODE_OPTIONS.timingFunctions.length - 1)];
    var duration =  CODE_OPTIONS.duration[getRandomNumber(CODE_OPTIONS.duration.length - 1)];
    var from = 0;
    var to = str.length - 1;

    code.style.top = CODE_OPTIONS.top[getRandomNumber(CODE_OPTIONS.top.length - 1)] + '%';
    code.style.left = CODE_OPTIONS.left[getRandomNumber(CODE_OPTIONS.left.length - 1)] + '%';
    code.style.fontSize = CODE_OPTIONS.fontSize[getRandomNumber(CODE_OPTIONS.fontSize.length - 1)] + 'px';

    var writeCode = function (progress) {
      var segment = (to - from) * progress + from;

      code.textContent = str.substring(from, Math.round(segment)) + '|';
    }

    window.animate(writeCode, duration, timingFunction, clearCode);
  };

  code.classList.add('code');
  document.body.appendChild(code);

  setTimeout(createCode, 0);
})();

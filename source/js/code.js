'use strict';

(function () {
  var CODE_OPTIONS = {
    top: [10, 30, 40, 25, 60, 70, 90],
    left: [5, 10, 15, 60, 70, 80],
    duration: [2500, 3000, 4500, 5500],
    timingFunctions: ['parabola', 'twoMount'],
    fontSize: [20, 18, 14, 24, 28],
    code: [
      `for(let i = 0; i <= options.length; i++) {
        createCard(i);
      }`,
      `const getRandomNumber = function (to, from) {
        from = from || 0;

        return Math.round(Math.random() * (to - from) + from);
      };`,
      `flex-basis: 50%;\ntransform: translateX(-50%) scale(1.2);`,
      'CODE_OPTIONS.timingFunctions[getRandomNumber(options.length - 1)]',
      'requestAnimationFrame(animation);',
      'return 38.92 * Math.pow(timeFraction, 4) - 69.67 * Math.pow(timeFraction, 3) + 39.451;',
      `const clearCode = function () {
        code.textContent = '';

        const delay = (set) ? set.time : 0;`
    ]
  };
  var REPEAT_DURATION = [2000, 7000];
  var code = document.createElement('pre');
  var preview = null;

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
    do {
      var str = CODE_OPTIONS.code[getRandomNumber(CODE_OPTIONS.code.length - 1)];
    } while (str === preview);

    preview = str;

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

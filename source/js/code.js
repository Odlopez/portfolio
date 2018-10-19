'use strict';

(function () {
  var CODE_OPTIONS = {
    top: [10, 30, 40, 25, 60, 70, 90],
    left: [5, 10, 15, 60, 70, 80],
    duration: [2500, 3000, 4500, 5500],
    timingFunctions: ['parabola', 'twoMount'],
    fontSize: [1.125, 0.875, 1.25, 1.5],
    code: [
      'for(let i = 0; i <= options.length; i++) {\n        createCard(i);\n      }',
      'const getRandomNumber = function (to, from) {\n        from = from || 0;\n\n        return Math.round(Math.random() * (to - from) + from);\n      };',
      '\n      flex-basis: 50%;\n      transform: translateX(-50%) scale(1.2);\n      border: 2px solid $pink;\n      box-shadow: 10px 10px 0 0 $dgray;\n\n        &:nth-of-type(4n+2),\n        &:nth-of-type(4n+3) {\n          border: 2px solid $violet;\n        }',
      'CODE_OPTIONS.timingFunctions[getRandomNumber(options.length - 1)]',
      'var progress = timingFunction(timeFraction);\n\n      draw(progress);\n\n      if (timeFraction < 1) {\n        requestAnimationFrame(animation);\n      }',
      'circ: function (timeFraction) {\n        return 1 - Math.sin(Math.acos(timeFraction));\n      },\n      linear: function (timeFraction) {\n        return timeFraction;\n      },',
      'const clearCode = function () {\n        code.textContent = \'\';\n\n        const delay = (set) ? set.time : 0;',
      'const sortFisherYates = function (arr, getNewArray) {\n        let j;\n\n        if (getNewArray) {\n          arr = arr.slice(0);\n        }\n\n        for (let i = arr.length - 1; i > 0; i--) {\n          j = getRandomNumber(arr.length - 1);\n          [arr[j], arr[i]] = [arr[i], arr[j]]\n        }\n\n        return arr;\n      };'
    ]
  };
  var REPEAT_DURATION = [2000, 7000];
  var code = document.createElement('pre');
  var preview = null;

  var getRandomNumber = function getRandomNumber(to, from) {
    from = from || 0;

    return Math.round(Math.random() * (to - from) + from);
  };

  var clearCode = function clearCode() {
    code.textContent = '';

    var delay = getRandomNumber(REPEAT_DURATION[1], REPEAT_DURATION[0]);

    setTimeout(createCode, delay);
  };

  var createCode = function createCode() {
    do {
      var str = CODE_OPTIONS.code[getRandomNumber(CODE_OPTIONS.code.length - 1)];
    } while (str === preview);

    preview = str;

    var timingFunction = CODE_OPTIONS.timingFunctions[getRandomNumber(CODE_OPTIONS.timingFunctions.length - 1)];
    var duration = CODE_OPTIONS.duration[getRandomNumber(CODE_OPTIONS.duration.length - 1)];
    var from = 0;
    var to = str.length - 1;

    code.style.top = CODE_OPTIONS.top[getRandomNumber(CODE_OPTIONS.top.length - 1)] + '%';
    code.style.left = CODE_OPTIONS.left[getRandomNumber(CODE_OPTIONS.left.length - 1)] + '%';
    code.style.fontSize = CODE_OPTIONS.fontSize[getRandomNumber(CODE_OPTIONS.fontSize.length - 1)] + 'rem';

    var writeCode = function writeCode(progress) {
      var segment = (to - from) * progress + from;

      code.textContent = str.substring(from, Math.round(segment)) + '|';
    };

    window.animate(writeCode, duration, timingFunction, clearCode);
  };

  code.classList.add('code');
  document.body.appendChild(code);

  setTimeout(createCode, 0);
})();

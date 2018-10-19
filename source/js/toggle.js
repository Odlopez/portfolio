'use strict';

(function () {
  var inputs = document.querySelectorAll('.about-you__input');
  var inputsObj = {
    inputs: inputs,
    quantity: 0,
    counter: 0,
    checkFlag: function() {
      this.quantity = 0;

      for (var i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i].checked) {
          this.quantity++;
        }
      }

      return this.quantity;
    },
    countsClicks: function() {
      this.counter++;
      if(!(this.counter % 50)) {
        alert('Вы очень упорны, но хватит! Цикл бесконечный, правда.)');
      }
    }
  };

  var getRandomNumber = function (to, from) {
    from = from || 0;
    return Math.round(Math.random() * (to - from) + from);
  };

  var uncheckRandomInput = function (elem) {
    var index = 0;

    do {
      index = getRandomNumber(0, inputs.length - 1);
    } while(inputs[index] === elem);

    inputs[index].checked = false;
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', function(evt) {
      inputsObj.checkFlag();

      if (inputsObj.checkFlag() === 3) {
         uncheckRandomInput(evt.target);
      }

      inputsObj.countsClicks();
    });
  }
})();

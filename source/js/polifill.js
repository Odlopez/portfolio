'use strict';

(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
      var searchElement = function (elem) {
        var parent = elem.parentNode;

        if (!parent) {
          return null;
        }

        var isElemExist = Array.prototype.slice.apply(parent.querySelectorAll(selector)).some(function (it) {
          return it === elem;
        });

        if (isElemExist) {
          return elem;
        }

        return (searchElement(parent));
      };

      return searchElement(this);
    };
  }
})();


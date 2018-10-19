'use strict';

(function () {
  var DURATION_SCROLL = 400;
  var ancors = document.querySelectorAll('[href^="#"]');

  var scrolling = function (e) {
    e.preventDefault();

    var target = e.target.href ? e.target.href.replace( /[^#]*(.*)/, '$1' ) : '';

    if (target.length > 1) {
      var from = window.pageYOffset;
      var to = document.querySelector(target).getBoundingClientRect().top + window.pageYOffset;

      var scrollingBy = function (progress) {
        if (to < from) {
          window.scrollTo(0, from - (from - to) * progress);
        } else {
          window.scrollTo(0,  from + (to - from) * progress);
        }
      };

      window.animate(scrollingBy, DURATION_SCROLL, 'linear');
    }
  };

  Array.prototype.slice.apply(ancors).forEach(function (it) {
    it.addEventListener('click', scrolling);
  });
})();

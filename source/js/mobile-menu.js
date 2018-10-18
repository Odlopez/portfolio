'use strict';

(function () {
  var OPEN_HEADER_CLASS = 'header--open';
  var KEY_CODE = {
    ESC: 27
  };
  var MOBILE_RESOLUTION = 600;
  var header = document.querySelector('.header');
  var overlay = header.querySelector('.header__overlay');
  var mainMenu = header.querySelector('.main-menu');
  var button = mainMenu.querySelector('.main-menu__button');
  var menuItems = mainMenu.querySelectorAll('li');
  var firstMenuItem = menuItems[0].querySelector('a');
  var lastMenuItem = menuItems[menuItems.length - 1];

  var openMenu = function () {
    header.classList.add(OPEN_HEADER_CLASS);
    onBlurButton();

    Array.prototype.slice.apply(menuItems).forEach(function (it) {
      var link = it.querySelector('a');
      link.addEventListener('click', closeMenu);
    });

    button.removeEventListener('click', openMenu);
    button.addEventListener('click', closeMenu);
    button.addEventListener('blur', onBlurButton);
    lastMenuItem.addEventListener('blur', onBlurLastItem);
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var closeMenu = function () {
    header.classList.remove(OPEN_HEADER_CLASS);

    Array.prototype.slice.apply(menuItems).forEach(function (it) {
      var link = it.querySelector('a');
      link.removeEventListener('click', closeMenu);
    });

    button.addEventListener('click', openMenu);
    button.removeEventListener('click', closeMenu);
    button.removeEventListener('blur', onBlurButton);
    lastMenuItem.removeEventListener('blur', onBlurLastItem);
    overlay.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onBlurLastItem = function () {
    button.focus();
  };

  var onBlurButton = function () {
    firstMenuItem.focus();
  };

  var onDocumentKeydown = function (e) {
    if (e.keyCode === KEY_CODE.ESC){
      closeMenu();
    }
  };

  button.addEventListener('click', openMenu);
  window.addEventListener('resize', function () {
    if (window.innerWidth > MOBILE_RESOLUTION && header.classList.contains(OPEN_HEADER_CLASS)) {
      closeMenu();
    }
  });
})();

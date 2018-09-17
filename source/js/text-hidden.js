'use strict';

(function () {
  var textBlocks = document.querySelectorAll('.card__text');

  var onTextHideButtonClick = function (e) {
    e.preventDefault();

    e.target.closest('.card__text').style.overflow = 'visible';
    e.target.closest('.card__text').style.maxHeight = 'none';
    e.target.closest('.card__button-wrap').style.position = 'relative';

    e.target.removeEventListener('click', onTextHideButtonClick);
    e.target.innerHTML = `Свернуть &#8593;`;
    e.target.addEventListener('click', onTextHideButtonClickClose);
  }

  var onTextHideButtonClickClose = function (e) {
    e.preventDefault();

    e.target.closest('.card__text').style.overflow = 'hidden';
    e.target.closest('.card__text').style.maxHeight = '';
    e.target.closest('.card__button-wrap').style.position = 'absolute';

    e.target.removeEventListener('click', onTextHideButtonClickClose);
    e.target.textContent = `Читать далее...`;
    e.target.addEventListener('click', onTextHideButtonClick);
  }

  textBlocks.forEach(function(it, i) {
    if (it.querySelector('.card__copy-wrap').clientHeight > it.clientHeight) {
      var textHideButtonWrap = it.querySelector('.card__button-wrap');
      var textHideButton = textHideButtonWrap.querySelector('.card__text-button');

      textHideButtonWrap.style.display = 'flex';
      textHideButton.addEventListener('click', onTextHideButtonClick);
    }
  });
})();

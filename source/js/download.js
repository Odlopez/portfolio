'use strict';

(function () {
  window.downloadFile = function (sUrl) {

    if (/(iP)/g.test(navigator.userAgent)) {
      alert('Your device does not support files downloading. Please try again in desktop browser.');
      return false;
    }

    if (window.downloadFile.isChrome || window.downloadFile.isSafari || window.downloadFile.isFirefox) {
      var link = document.createElement('a');
      link.href = sUrl;

      if (link.download !== undefined) {
        var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
        link.download = fileName;
      }

      if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
    }

    if (sUrl.indexOf('?') === -1) {
      sUrl += '?download';
    }

    window.open(sUrl, '_self');
    return true;
  }

  window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  window.downloadFile.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
})();

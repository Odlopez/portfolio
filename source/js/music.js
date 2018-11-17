'use strict';

(function () {
  var TIME_INTERVAL = 1500;
  var template = '<button class=\"custom-audio__play\" type=\"button\">\n  <svg class=\"custom-audio__paused-svg\" width=\"25\" height=\"25\">\n    <use xlink:href=\"#paused\"></use>\n  </svg>\n  <svg class=\"custom-audio__play-svg\" width=\"25\" height=\"25\">\n    <use xlink:href=\"#play\"></use>\n  </svg>\n  \u0418\u0433\u0440\u0430\u0442\u044C\n</button>\n<div class=\"custom-audio__progress-inner\">\n  <div class=\"custom-audio__progress\">\n    <div class=\"custom-audio__slider custom-audio__slider--progress\" tabindex=\"0\"></div>\n  </div>\n</div>\n<div class=\"custom-audio__volume-inner\">\n  <svg class=\"custom-audio__volume-icon\" width=\"25\" height=\"25\">\n    <use xlink:href=\"#volume\"></use>\n  </svg>\n  <div class=\"custom-audio__volume\">\n    <div class=\"custom-audio__slider custom-audio__slider--volume\" tabindex=\"0\"></div>\n  </div>\n</div>\n<button class=\"custom-audio__download\" type=\"button\" title=\"\u0441\u043A\u0430\u0447\u0430\u0442\u044C\">\n  <svg class=\"custom-audio__download-svg\" width=\"20\" height=\"25\">\n    <use xlink:href=\"#download\"></use>\n  </svg>\n  \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C\n</button>';
  var musicInner = document.querySelector('.misuc__inner');

  var playTrack = function (data) {
    data.audio.play();
    data.audio.setAttribute('play', true);
    data.playIcon.style.display = 'none';
    data.pausedIcon.style.display = 'block';
  };

  var stopTrack = function (data) {
    data.audio.pause();
    data.audio.setAttribute('play', '');
    data.playIcon.style.display = 'block';
    data.pausedIcon.style.display = 'none';
  };

  var shiftSlider = function (progress, slider, progressLine) {
    slider.style.left = (100 * progress) + '%';
    slider.style.transform = 'translate(' + (-100 * progress) + '%, -50%)';
    progressLine.style.background =  'linear-gradient(to right,rgba(17,138,115,.4) 0%,rgba(17,138,115,.4) ' + slider.style.left +',#383140 ' + slider.style.left + ',#383140 100%)';
  };

  var changeProgress = function (audio, progress) {
    audio.currentTime = audio.duration * progress;
  };

  var changeVolume = function (audio, progress) {
    audio.volume = progress;
  };

  var changeSlider = function (data, draw) {
    return function (e) {
      var slider = e.target;
      var progressLine = slider.offsetParent;
      var shift = e.clientX - slider.offsetLeft;

      var onSliderMove = function (eMove) {
        eMove.preventDefault();

        var progress = (eMove.clientX - shift) / progressLine.offsetWidth;

        if (progress < 0) {
          progress = 0;
        }

        if (progress > 1) {
          progress = 1;
        }

        shiftSlider(progress, slider, progressLine);
        draw(data.audio, progress);
      };

      var onSliderMouseup = function () {
        document.removeEventListener('mousemove', onSliderMove);
        document.removeEventListener('mouseup', onSliderMouseup);
      };

      document.addEventListener('mousemove', onSliderMove);
      document.addEventListener('mouseup', onSliderMouseup);
    };

  };

  var onProgressLineClick = function (data, slider, progressLine, draw) {
    return function (e) {
      var progress = (e.clientX - progressLine.getBoundingClientRect().left) / progressLine.offsetWidth;
      shiftSlider(progress, slider, progressLine);
      draw(data.audio, progress);
    };
  };

  var Music = function () {
    this.tracks = document.querySelectorAll('.music__audio');
    this.customTracks = [];
    this.played = false;
  };

  Music.prototype.makeAudio = function (audio) {
    var wrap = document.createElement('div');
    wrap.className = 'music__custom-audio custom-audio';
    wrap.innerHTML = template;
    musicInner.appendChild(wrap);

    audio.style.display = 'none';

    var playButton = wrap.querySelector('.custom-audio__play');
    var downloadButton = wrap.querySelector('.custom-audio__download');
    var pausedIcon = wrap.querySelector('.custom-audio__paused-svg');
    var playIcon = wrap.querySelector('.custom-audio__play-svg');
    var progressSlider = wrap.querySelector('.custom-audio__slider--progress');
    var volumeSlider = wrap.querySelector('.custom-audio__slider--volume');
    var progressLine = wrap.querySelector('.custom-audio__progress');
    var volumeLine = wrap.querySelector('.custom-audio__volume');

    var customTrackData = {
      customTrack: wrap,
      audio: audio,
      playButton: playButton,
      progressSlider: progressSlider,
      progressLine: progressLine,
      volumeSlider: volumeSlider,
      volumeLine: volumeLine,
      downloadButton: downloadButton,
      pausedIcon: pausedIcon,
      playIcon: playIcon,
      isPlay: false,
      timerID: null
    };

    this.customTracks.push(customTrackData);

    this.addEvents(customTrackData);
  };

  Music.prototype.addEvents = function (data) {
    var self = this;

    data.playButton.addEventListener('click', function () {
      if (!data.audio.getAttribute('play')) {
        playTrack(data);

        if (self.played) {
          self.customTracks.forEach(function (it) {
            if (it.isPlay && it.customTrack !== data.customTrack) {
              stopTrack(it);
            }
          });
        }

        data.isPlay = true;
        self.played = true;

        data.timerID = setTimeout(function playing() {
          var progress = data.audio.currentTime / data.audio.duration;

          shiftSlider(progress, data.progressSlider, data.progressLine);

          if (!data.audio.ended) {
            data.timerID = setTimeout(playing, TIME_INTERVAL);
          } else {
            data.timerID = null;
            stopTrack(data);
            shiftSlider(0, data.progressSlider, data.progressLine);
          }
        }, TIME_INTERVAL);
      } else {
        stopTrack(data);
      }
    });

    data.downloadButton.addEventListener('click', function () {
      window.downloadFile(data.audio.currentSrc);
    });

    data.progressSlider.addEventListener('mousedown', changeSlider(data, changeProgress));
    data.volumeSlider.addEventListener('mousedown', changeSlider(data, changeVolume));

    data.progressLine.addEventListener('click', onProgressLineClick(data, data.progressSlider, data.progressLine, changeProgress));
    data.volumeLine.addEventListener('click', onProgressLineClick(data, data.volumeSlider, data.volumeLine, changeVolume));
  };

  Music.prototype.appendTracks = function () {
    var self = this;

    Array.prototype.slice.apply(this.tracks).forEach(function (it) {
      self.makeAudio(it);
    });
  };

  var music = new Music();
  music.appendTracks();

})();


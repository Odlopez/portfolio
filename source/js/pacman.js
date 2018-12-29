'use strict';

(function () {
  var ScreenSize = {
    WIDTH: 800,
    HEIGHT: 800
  };
  var PACMAN_OPTIONS = {
    eatingIntensity: [3, 4, 5, 6],
    duration: [1500, 2000, 2500, 3000],
    radius: [20, 30, 40, 50]
  };
  var CANVAS_OPTIONS = {
    top: [15, 25, 30, 40, 50, 60, 70],
    right: [20, 30, 40, 50, 60, 70, 80],
    width: [50, 60, 70, 80]
  };
  var MARGIN = 1;
  var MINI_TRIANGLE_COEFFICIENT = 1.5;
  var PACMAN_COLOR = 'gold';
  var POINT_COLOR = '#dce2aa';
  var BACKGROUND_COLOR = '#25212d';
  var REPEAT_DURATION = [5000, 17000];
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var getRandomNumber = function getRandomNumber(to, from) {
    from = from || 0;

    return Math.round(Math.random() * (to - from) + from);
  };

  /**
   * Возвращает массив координат для точек - еды пакмана
   * @param {Number} quantity
   * @param {Number} startPoint
   * @param {Number} coordY
   * @param {Number} pointRadius
   */
  var getPointsCoord = function (quantity, startPoint, coordY, pointRadius) {
    var coordArray = [];

    for (let i = 0; i < quantity; i++) {
      coordArray[i] = [startPoint, coordY];

      startPoint += pointRadius * 5;
    }

    return coordArray;
  };

  /**
   * Отрисовывает круг на канвасе
   * @param {CanvasContext} ctx
   * @param {Number} start
   * @param {Number} radius
   * @param {String} fill
   */
  var createCircle = function (ctx, startX, startY, radius, fill) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };

  /**
   *
   * @param {CanvasContext} ctx
   * @param {Number} startX
   * @param {Number} startY
   * @param {Number} height
   * @param {Number} intensity
   * @param {String} fill
   * @param {Number} progress
   */
  var createTriangle = function (ctx, startX, startY, height, intensity, fill, progress) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + height + MARGIN, startY - (height * Math.sin(Math.PI * intensity * progress)));
    ctx.lineTo(startX + height + MARGIN, startY + (height * Math.sin(Math.PI * intensity * progress)));
    ctx.fill();
    ctx.closePath();
  };

  /**
   * Очищает полотно
   * @param {CanvasContext} ctx
   */
  var clearCanvas = function (ctx) {
    ctx.clearRect(0, 0, ScreenSize.WIDTH, ScreenSize.HEIGHT);
  };

  /**
   * Возвращаем начальные координаты пакмана в зависимости от
   * @param {Number} progress
   */
  var getCoordX = function (radius, progress) {
    return radius + (ScreenSize.WIDTH - radius * 2) * progress;
  };

  /**
   * Возвращает функцию отрисовки пакмана
   * @param {CanvasContext} ctx
   */
  var getRenderPacmanFunc = function (ctx) {
    var radius = PACMAN_OPTIONS.radius[getRandomNumber(PACMAN_OPTIONS.radius.length - 1)];
    var miniTriangleRadius = radius / MINI_TRIANGLE_COEFFICIENT;
    var eatingIntensity = PACMAN_OPTIONS.eatingIntensity[getRandomNumber(PACMAN_OPTIONS.eatingIntensity.length - 1)];
    var pointRadius = radius * 0.2;
    var startPoint = getCoordX(radius, 0);
    var pointQuantity = ScreenSize.WIDTH / pointRadius / 5;
    var pointsCoordArray = getPointsCoord(pointQuantity, startPoint, radius, pointRadius);

    return function (progress) {
      // очищаем полотно
      clearCanvas(ctx);

      var startX = getCoordX(radius, progress);

      // отрисовываем круг
      createCircle(ctx, startX, radius, radius, PACMAN_COLOR);

      // отрисовываем треугольник
      createTriangle(ctx, startX, radius, radius, eatingIntensity, BACKGROUND_COLOR, progress);

      // отрисовываем точки
      for (let i = 0; i < pointsCoordArray.length; i++) {
        if (pointsCoordArray[i][0] < startX + pointRadius * 3) {
          continue;
        }
        createCircle(ctx, pointsCoordArray[i][0], pointsCoordArray[i][1], pointRadius, POINT_COLOR);
      }

      // открисовываем треугольник
      createTriangle(ctx, startX, radius, miniTriangleRadius, eatingIntensity, BACKGROUND_COLOR, progress);
    }
  };

  /**
   * Заканчивает анимацию, очищает полотно и запускает через рандомное время еще одну анимацию
   */
  var endAnimate = function () {
    clearCanvas(ctx);

    var delay = getRandomNumber(REPEAT_DURATION[1], REPEAT_DURATION[0]);

    setTimeout(startAnimatePacman, delay);
  };

  /**
   * Отрисовывает полотно канваса в документе
   */
  var createCanvas = function () {
    canvas.width = ScreenSize.WIDTH;
    canvas.height = ScreenSize.HEIGHT;

    document.body.appendChild(canvas);
    canvas.classList.add('canvas');
  };

  /**
   * Стартуем анимацию пакмана
   */
  var startAnimatePacman = function () {
    canvas.style.top = CANVAS_OPTIONS.top[getRandomNumber(CANVAS_OPTIONS.top.length - 1)] + '%';
    canvas.style.right = CANVAS_OPTIONS.right[getRandomNumber(CANVAS_OPTIONS.right.length - 1)] + '%';
    canvas.style.width = CANVAS_OPTIONS.width[getRandomNumber(CANVAS_OPTIONS.width.length - 1)] + '%';

    var renderPacman = getRenderPacmanFunc(ctx);
    var duration = PACMAN_OPTIONS.duration[getRandomNumber(PACMAN_OPTIONS.duration.length - 1)];

    window.animate(renderPacman, duration, 'linear', endAnimate);
  };

  createCanvas();
  setTimeout(function () {
    startAnimatePacman();
  }, getRandomNumber(REPEAT_DURATION[1], REPEAT_DURATION[0]));
})();

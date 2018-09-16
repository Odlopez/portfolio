"use strict";

var tastes = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var pictures = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicg', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];

var contents = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}; ///Функция, которая выводит случайное число в диапазоне

var getRandomBool = function(bool) {
    bool = bool || Math.random();
    if(bool >= 0.5) {
        return 'Содержит сахар';
    } else {
        return 'Без сахара';
    }
};

var choiseTastes = function(){
    var gustos = [];
    for (var i = 0; i < 26; i++){
        var choises = {
            name: tastes[i],
            picture: pictures[i],
            amount: getRandomInRange(0, 20),
            price: getRandomInRange(100, 1500),
            weight: getRandomInRange(30, 300),
            rating: {
                value: getRandomInRange(1, 5),
                number: getRandomInRange(10, 900)
            },
            nutritionFacts: {
                sugar: getRandomBool,
                ///return Math.random() > 0.3;
                energy: getRandomInRange(70, 500)
            }
        };
    }
};

var cardsAddLoad = document.querySelector('.catalog__cards');
cardsAddLoad.classList.remove('catalog__cards--load');

var cardsHiddenLoad = document.querySelector('.catalog__load'); 
cardsHiddenLoad.classList.add('visually-hidden');
    
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

var templateStyle = document.querySelector('#card');
    
templateStyle.setAttribute ('style', 'display: block;');
    
var stock = document.querySelector('#card')
    .content
    .querySelector('.card--in-stock');
    
for (var i = 0; amount < tastes; i++){ 
    console.log(amount, tastes);
    var cardInStock = stock.cloneNode(true); 
    stock.appendChild(cardInStock);
};
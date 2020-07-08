'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X_MIN = 100;
var LOCATION_X_MAX = 1100;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 77;
var NUMBER_ADS = 8; // Ads - обьявления (без сокращения)


var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var arrayRandElement = function (arr) {
  var rand = getRandomInRange(0, newArray.length - 1);
  return arr[rand];
};

var cutArray = function (arr) { // понял что будет так, мог ошибиться запросто
  var newArray = arr.slice([0], [getRandomInRange(1, newArray.length)]); // возвращает новый массив, в который копирует элементы, начиная с индекса start и до end
  // newArray.length = getRandomInRange(1, newArray.length); // строчка будет не нужна, передать в slice
  return newArray;
};

var shuffleArray = function (arr) { //
  var newArray = arr.slice();
  for (var i = 0; i < newArray.length; i++) {
    var j = getRandomInRange(0, newArray.length - 1);
    var temp = newArray[i];
    newArray[i] = newArray[j];    // меняет порядок элементов в массиве
    newArray[j] = temp;
  }

  return newArray;
};

var createAd = function (number) {
  var arrAds = [];

  for (var i = 0; i < number; i++) {
    var locationX = getRandomInRange(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = getRandomInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Заголовок',
        address: locationX + ', ' + locationY,
        price: getRandomInRange(1, 5000),
        type: arrayRandElement(TYPES),
        rooms: getRandomInRange(1, 100),
        guests: getRandomInRange(0, 3),
        checkin: arrayRandElement(CHECKINS),
        checkout: arrayRandElement(CHECKOUTS),
        features: shuffleArray(FEATURES),
        description: 'Описание',
        photos: cutArray(shuffleArray(PHOTOS)),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    };
    arrAds.push(ad);
  }
  return arrAds;
};

var removeMapFaded = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var createPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var arrAds = createAd(NUMBER_ADS);
for (var i = 0; i < arrAds.length; i++) {
  fragment.appendChild(createPin(arrAds[i]));
}
mapPins.appendChild(fragment);

removeMapFaded();


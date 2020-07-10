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
var NUMBER_ADS = 8;
var MIN_PRICE = 1;
var MAX_PRICE = 5000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 100;
var MIN_GUESTS = 0;
var MAX_GUESTS = 3;

var filtersContainer = document.querySelector('.map__filters-container');


var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementFromArray = function (array) {
  var rand = getRandomInRange(0, newArray.length - 1);
  return array[rand];
};

var cutArray = function (array) {
  var newArray = array.slice((0, getRandomInRange(1, newArray.length)); // возвращает новый массив, в который копирует элементы, начиная с индекса start и до end
  return newArray;
};

var shuffleArray = function (array) { //
  var newArray = array.slice();
  for (var i = 0; i < newArray.length; i++) {
    var j = getRandomInRange(0, newArray.length - 1);
    var temp = newArray[i];
    newArray[i] = newArray[j];    // меняет порядок элементов в массиве
    newArray[j] = temp;
  }

  return newArray;
};

var createAds = function (number) {
  var arrayAds = [];

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
        price: getRandomInRange(MIN_PRICE, MAX_PRICE),
        type: getRandomElementFromArray(TYPES),
        rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInRange(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomElementFromArray(CHECKINS),
        checkout: getRandomElementFromArray(CHECKOUTS),
        features: shuffleArray(FEATURES),
        description: 'Описание',
        photos: cutArray(shuffleArray(PHOTOS)),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    };
    arrayAds.push(ad);
  }
  return arrayAds;
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
var arrayAds = createAds(NUMBER_ADS);
for (var i = 0; i < arrayAds.length; i++) {
  fragment.appendChild(createPin(arrayAds[i]));
}
mapPins.appendChild(fragment);

removeMapFaded();


// 2 часть задания (адская смесь гугла, моих представлений и чужих кодов,
// в целом понимание слабое, пиши комменты подробнее плис)


var getCardFeatures = function (offersClasses, template) {
  var featuresList = template.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresList.length; i++) {
    featuresList[i].classList.add('hidden');

    offersClasses.forEach(function (entry) {
      if (featuresList[i].classList.contains(entry)) {
        featuresList[i].classList.remove('hidden');
      }
    });
  }
};

var createOfferCard = function (item) {
  var cardTemplate = document.querySelector('#card').content;
  var card = cardTemplate.cloneNode(true);
  var cardPhotos = card.querySelector('.popup__photos');
  var photoImg = cardPhotos.querySelector('.popup__photo');
  var featuresClasses = generateClassesArray(item.offer.features, 'popup__feature--'); ??
  card.querySelector('.popup__title').textContent = item.offer.title;
  card.querySelector('.popup__text--address').textContent = item.offer.address;
  card.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = TypesMap[item.offer.type];
  card.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  card.querySelector('.popup__description').textContent = item.offer.description;
  card.querySelector('.popup__photos').src = 'none';
  card.querySelector('.popup__avatar').src = item.author.avatar;

  getCardFeatures(featuresClasses, card);

  cardPhotos.innerHTML = '';

  for (var i = 0; i < item.offer.photos.length; i++) {
    var image = photoImg.cloneNode(true);
    image.src = item.offer.photos[i];
    cardPhotos.appendChild(image);
  }

  return card;
};

var renderCard = function (item) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createOfferCard(item));

  return fragment;
};

var similarAds = generateSimilarAds(OFFERS_COUNT);
pinsMap.appendChild(renderAllPins(similarAds));
map.insertBefore(renderCard(similarAds[0]), filtersContainer);


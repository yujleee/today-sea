/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* eslint-disable no-restricted-syntax */


function Search() {
  const searchInput = document.querySelector('.input-search');
  const searchForm = searchInput.parentNode;
  const resultList = document.querySelector('.result-list');

  let beachInfo = {};
  const beachNames = [];
  this.searchCount = -1;
  this.searchMaxCount = 0;

  const fetchData = async () => {
    await fetch('../assets/beachData.json')
      .then((response) => response.json())
      .then((data) => {
        beachInfo = Object.values(data);
        return beachInfo;
      })
      .then((data) => {
        for (const [idx, beach] of Object.entries(data)) {
          beachNames[idx] = beach.name;
        }
        return beachNames;
      })
      .catch((err) => console.error(err));
  };

  fetchData();

  const handleSearch = () => {
    const word = searchInput.value;
    let beachList = [];
    if (word !== '') {
      const recommandName = beachNames.filter((name) => name.toLowerCase().startsWith(word));
      beachList = recommandName.map((item) => `<li>${item}</li>`).join('');
    }
    resultList.innerHTML = beachList;
    this.searchMaxCount = resultList.childElementCount;
  };

  const submitBeach = (e) => {
    const beachName = searchInput.value.length === 1 ? e.target.innerText : searchInput.value;
    let beachNumber = 1;
    for (const [idx, beach] of Object.entries(beachInfo)) {
      if (beach.name === beachName) {
        beachNumber = beach['beach-num'];
      }
    }

    searchInput.value = beachName;

    const payload = {
      num: beachNumber,
      name: beachName,
    };

    _store_store_js__WEBPACK_IMPORTED_MODULE_0__.store.setLocalStorage('beachInfo', payload);
    searchForm.submit();
  };

  const handleSearchResult = (e) => {
    if (this.searchCount >= this.searchMaxCount) {
      this.searchCount = -1;
    } else if (this.searchCount > this.searchMaxCount || this.searchCount < 0) {
      this.searchCount = this.searchMaxCount;
    }

    const li = resultList.childNodes[this.searchCount];
    switch (e.key) {
      case 'ArrowUp':
        this.searchCount -= 1;

        break;
      case 'ArrowDown':
        this.searchCount += 1;
        break;
      case 'Enter':
        searchInput.value = li.innerText;
        submitBeach();
        break;
      default:
        break;
    }
    li.classList.toggle('is-active');
  };

  searchInput.addEventListener('keyup', (e) => {
    if (e.key !== 'backspace') {
      resultList.parentNode.classList.add('is-active');
      handleSearch();
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      handleSearchResult(e);
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchResult(e);
    }
  });

  resultList.addEventListener('click', (e) => {
    submitBeach(e);
  });
}

const search = new Search();


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
const store = {
  setLocalStorage(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
  },

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderFcstInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _renderSunInfo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _renderTideInfo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);





const URL = 'https://apis.data.go.kr/1360000/BeachInfoservice';
const API_KEY = 'JgOTEFegmT85gM1vQ7XNalEJFJb0gusFB26pkZkBameKaU3B5WlTltcyt6xWvGR8aNvLvw7Jw6gqnQSiMm6KgQ%3D%3D';
const BASE_TIME = [2, 5, 8, 11, 14, 17, 20, 23];

const beachNumber = _store_store_js__WEBPACK_IMPORTED_MODULE_3__.store.getLocalStorage('beachInfo').num;
const now = {};

const savePayload = (a, b) => {
  const payload = {
    date: a,
    time: b,
  };

  return payload;
};

const startLoading = () => {
  document.querySelector('.loading').classList.remove('before-load');
};

const removeLoading = () => {
  document.querySelector('.loading').addEventListener('transitionend', (e) => {
    console.log(e.currentTarget);
    console.log('loading end');

    document.body.removeChild(e.currentTarget);
  });
};

const getBaseTime = (currentTime) => {
  const baseTime = BASE_TIME.find((it) => currentTime <= it);
  return baseTime < 10 ? `0${baseTime}00` : `${baseTime}00`;
};

const getCurrentTime = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString('ko-KO', { month: '2-digit' }).slice(0, 2);
  const date = today.toLocaleString('ko-KO', { day: '2-digit' }).slice(0, 2);
  now.date = `${year}${month}${date}`;
  now.time = getBaseTime(today.getHours());
  return now;
};

const getForecastInfo = () => {
  fetch(
    `${URL}/getVilageFcstBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&base_time=${now.time}&beach_num=${beachNumber}&numOfRows=20`
  )
    .then((response) => response.json())
    .then((data) => {
      startLoading();
      (0,_renderFcstInfo_js__WEBPACK_IMPORTED_MODULE_0__.renderFcstInfo)(data);
    })
    .catch((error) => {
      console.error(error);
      //   window.location.replace('./error.html');
    });
};

const getSunInfo = () => {
  fetch(`${URL}/getSunInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`)
    .then((response) => response.json())
    .then((data) => (0,_renderSunInfo_js__WEBPACK_IMPORTED_MODULE_1__.renderSunInfo)(data))
    .catch((error) => {
      console.error(error);
      window.location.replace('./error.html');
    });
};

const getTideInfo = () => {
  fetch(`${URL}/getTideInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`)
    .then((response) => response.json())
    .then((data) => {
      (0,_renderTideInfo_js__WEBPACK_IMPORTED_MODULE_2__.renderTideInfo)(data);
      removeLoading();
    })
    .catch((error) => {
      console.error(error);
      window.location.replace('./error.html');
    });
};

const App = async () => {
  await getCurrentTime();
  _store_store_js__WEBPACK_IMPORTED_MODULE_3__.store.setLocalStorage('currentTime', savePayload(now.date, now.time));
  getForecastInfo();
  getSunInfo();
  getTideInfo();
};

App();


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderFcstInfo": () => (/* binding */ renderFcstInfo)
/* harmony export */ });
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _weatherImg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* eslint-disable no-restricted-syntax */



const beachName = _store_store_js__WEBPACK_IMPORTED_MODULE_0__.store.getLocalStorage('beachInfo').name;
const baseTime = _store_store_js__WEBPACK_IMPORTED_MODULE_0__.store.getLocalStorage('currentTime').time;

const beachInfoTop = document.querySelector('.beach-info-top');
const infoArea = document.querySelector('.info-area');

const windDirectionType = {
  45: '북-북동',
  90: '북동-동',
  135: '동-남동',
  180: '남동-남',
  225: '남-남서',
  270: '남서-서',
  315: '남-북서',
  360: '북서-북',
};

const getWindDirection = (vce) => {
  let windType = '';

  for (const [deg, type] of Object.entries(windDirectionType)) {
    if (vce <= deg) {
      windType = type;
    }
  }
  return windType;
};

const renderFcstInfo = (pos) => {
  const getData = (data) => {
    const result = {};
    data.item.forEach((it) => {
      result[it.category] = it.fcstValue;
    });
    return result;
  };

  const weather = getData(pos.response.body.items);
  beachInfoTop.querySelector('.beach-name').innerText = beachName;
  beachInfoTop.querySelector('.base-time').innerText = `오늘 ${baseTime.slice(0, 2)}시 기준`;
  beachInfoTop.querySelector('.weather-img img').setAttribute('src', (0,_weatherImg_js__WEBPACK_IMPORTED_MODULE_1__.selectImg)(weather.SKY, weather.PTY));
  beachInfoTop.querySelector('.current-temp').innerText = `${weather.TMP}°`;

  infoArea.querySelector('.humidty').innerText = `${weather.REH}%`;
  infoArea.querySelector('.wave').innerText = `${weather.WAV}`;
  infoArea.querySelector('.wind-speed').innerText = `${weather.WSD}`;
  infoArea.querySelector('.wind-direction').innerText = `${getWindDirection(weather.VEC)}`;
};


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectImg": () => (/* binding */ selectImg)
/* harmony export */ });
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const weatherImg = [
  {
    img_id: 1,
    name: 'clear',
    img: '../assets/images/clear.png',
  },
  {
    img_id: 4,
    name: 'cloud',
    img: '../assets/images/cloud.png',
  },
  {
    img_id: 3,
    name: 'fewCloud',
    img: '../assets/images/few-cloud.png',
  },
  {
    img_id: 2,
    name: 'rain',
    img: '../assets/images/rain.png',
  },
  {
    img_id: 6,
    name: 'lightRain',
    img: '../assets/images/light-Rain.png',
  },
  {
    img_id: 8,
    name: 'snow',
    img: '../assets/images/snow.png',
  },
  {
    img_id: 5,
    name: 'night',
    img: '../assets/images/night.png',
  },
];

const currentTime = Number(_store_store_js__WEBPACK_IMPORTED_MODULE_0__.store.getLocalStorage('currentTime').time);

const selectImg = (sky, pty) => {
  let src = '';

  if (currentTime >= 2000) {
    const imgList = weatherImg.find((it) => it.name === 'night');
    return imgList.img;
  }

  if (Number(pty) === 0) {
    const imgList = weatherImg.find((it) => it.img_id === Number(sky));
    src = imgList.img;
  }

  if (Number(pty) >= 1) {
    const imgList = weatherImg.find((it) => it.img_id === Number(pty) + 1);
    src = imgList.img;
  }
  return src;
};


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderSunInfo": () => (/* binding */ renderSunInfo)
/* harmony export */ });
const infoArea = document.querySelector('.info-area');

const renderSunInfo = (pos) => {
  const getData = (data) => {
    const result = {
      sunrise: data.item[0].sunrise !== ':' ? data.item[0].sunrise : '정보없음',
      sunset: data.item[0].sunset !== ':' ? data.item[0].sunset : '정보없음',
    };

    return result;
  };

  const sunInfo = getData(pos.response.body.items);
  infoArea.querySelector('.sunrise').innerText = sunInfo.sunrise;
  infoArea.querySelector('.sunset').innerText = sunInfo.sunset;
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTideInfo": () => (/* binding */ renderTideInfo)
/* harmony export */ });
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const infoArea = document.querySelector('.info-area');
const currentTime = _store_store_js__WEBPACK_IMPORTED_MODULE_0__.store.getLocalStorage('currentTime').time;

const tideType = ['ET1', 'FT1', 'ET2', 'FT2'];

const renderTideInfo = (pos) => {
  const getData = (data) => {
    const values = Object.values(data);
    const result = {};
    values[0].forEach((it) => {
      if (it.tiType === '-') {
        // eslint-disable-next-line no-return-assign
        tideType.forEach((type) => (result[type] = '정보없음'));
      }
      result[it.tiType] = it.tiTime;
    });
    return result;
  };

  const weather = getData(pos.response.body.items);

  let ebbTide = '';
  let floodTide = '';

  if (Number(currentTime.slice(0, 2)) < 12) {
    ebbTide = weather.ET1;
    floodTide = weather.FT1;
  } else {
    ebbTide = weather.ET2;
    floodTide = weather.FT2;
  }

  infoArea.querySelector('.ebb-tide').innerText = `${ebbTide}`;
  infoArea.querySelector('.flood-tide').innerText = `${floodTide}`;
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _weatherImg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _renderFcstInfo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _renderSunInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _renderTideInfo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);








})();

/******/ })()
;
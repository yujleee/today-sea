import { renderFcstInfo } from './renderFcstInfo.js';
import { renderSunInfo } from './renderSunInfo.js';
import { renderTideInfo } from './renderTideInfo.js';
import { store } from './store/store.js';

const URL = 'https://apis.data.go.kr/1360000/BeachInfoservice';
const API_KEY = 'JgOTEFegmT85gM1vQ7XNalEJFJb0gusFB26pkZkBameKaU3B5WlTltcyt6xWvGR8aNvLvw7Jw6gqnQSiMm6KgQ%3D%3D';

const beachNumber = store.getLocalStorage('beachInfo').num;
const now = {
  date: store.getLocalStorage('currentTime').date,
  time: store.getLocalStorage('currentTime').time,
};

const startLoading = () => {
  document.querySelector('.loading').classList.remove('before-load');
};

const removeLoading = () => {
  document.querySelector('.loading').addEventListener('transitionend', (e) => {
    document.body.removeChild(e.currentTarget);
  });
};

const getForecastInfo = async () => {
  await fetch(
    `${URL}/getVilageFcstBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&base_time=${now.time}&beach_num=${beachNumber}&numOfRows=20`
  )
    .then((response) => response.json())
    .then((data) => {
      startLoading();
      renderFcstInfo(data);
    })
    .catch((error) => {
      console.error(error);
      window.location.replace('./error.html');
    });
};

const getSunInfo = async () => {
  await fetch(
    `${URL}/getSunInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`
  )
    .then((response) => response.json())
    .then((data) => renderSunInfo(data))
    .catch((error) => {
      console.error(error);
      window.location.replace('./error.html');
    });
};

const getTideInfo = async () => {
  await fetch(
    `${URL}/getTideInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderTideInfo(data);
      removeLoading();
    })
    .catch((error) => {
      console.error(error);
      window.location.replace('./error.html');
    });
};

const App = () => {
  getForecastInfo();
  getSunInfo();
  getTideInfo();
};

window.onload = () => {
  App();
};

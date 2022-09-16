import { renderFcstInfo } from './renderFcstInfo.js';
import { renderSunInfo } from './renderSunInfo.js';
import { renderTideInfo } from './renderTideInfo.js';
import { store } from './store/store.js';
import { moveToErrorPage } from './handleError.js';

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

const endLoading = () => {
  document.querySelector('.loading').addEventListener('transitionend', (e) => {
    document.body.removeChild(e.currentTarget);
  });
};

const getForecastInfo = async () => {
  try {
    const response = await fetch(
      `${URL}/getVilageFcstBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&base_time=${now.time}&beach_num=${beachNumber}&numOfRows=20`
    );

    if (!response.ok) {
      throw new Error('단기 예보 데이터를 받아오지 못했습니다.');
    }

    const data = await response.json();
    startLoading();
    renderFcstInfo(data);
  } catch (error) {
    moveToErrorPage();
  }
};

const getSunInfo = async () => {
  try {
    const response = await fetch(
      `${URL}/getSunInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`
    );

    if (!response.ok) {
      throw new Error('일출,일몰 데이터를 받아오지 못했습니다.');
    }

    const data = await response.json();
    renderSunInfo(data);
  } catch (error) {
    moveToErrorPage();
  }
};

const getTideInfo = async () => {
  try {
    const response = await fetch(
      `${URL}/getTideInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`
    );

    if (!response.ok) {
      throw new Error('조석 데이터를 받아오지 못했습니다.');
    }

    const data = await response.json();
    renderTideInfo(data);
    endLoading();
  } catch (error) {
    moveToErrorPage();
  }
};

const App = () => {
  getForecastInfo();
  getSunInfo();
  getTideInfo();
};

window.onload = () => {
  App();
};

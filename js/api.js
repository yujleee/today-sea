import { renderFcstInfo } from './renderFcstInfo.js';
import { renderSunInfo } from './renderSunInfo.js';
import { renderTideInfo } from './renderTideInfo.js';
import { store } from './store/store.js';

const URL = 'https://apis.data.go.kr/1360000/BeachInfoservice';
const API_KEY = 'JgOTEFegmT85gM1vQ7XNalEJFJb0gusFB26pkZkBameKaU3B5WlTltcyt6xWvGR8aNvLvw7Jw6gqnQSiMm6KgQ%3D%3D';
const BASE_TIME = [2, 5, 8, 11, 14, 17, 20, 23];

const beachNumber = store.getLocalStorage('beachInfo').num;
const now = {};

const savePayload = (a, b) => {
  const payload = {
    date: a,
    time: b,
  };

  return payload;
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
    .then((data) => renderFcstInfo(data))
    .catch((error) => console.error('예보 없음', error));
};

const getSunInfo = () => {
  fetch(`${URL}/getSunInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`)
    .then((response) => response.json())
    .then((data) => renderSunInfo(data))
    .catch((error) => console.error(error));
};

const getTideInfo = () => {
  fetch(`${URL}/getTideInfoBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&beach_num=${beachNumber}`)
    .then((response) => response.json())
    .then((data) => renderTideInfo(data))
    .catch((error) => console.error(error));
};

const App = async () => {
  await getCurrentTime();
  store.setLocalStorage('currentTime', savePayload(now.date, now.time));
  getForecastInfo();
  getSunInfo();
  getTideInfo();
};

App();

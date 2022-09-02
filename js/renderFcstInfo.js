/* eslint-disable no-restricted-syntax */
import { store } from './store/store.js';
import { selectImg } from './weatherImg.js';

const beachName = store.getLocalStorage('beachInfo').name;
const baseTime = store.getLocalStorage('currentTime').time;

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

export const renderFcstInfo = (pos) => {
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
  beachInfoTop.querySelector('.weather-img img').setAttribute('src', selectImg(weather.SKY, weather.PTY));
  beachInfoTop.querySelector('.current-temp').innerText = `${weather.TMP}°`;

  infoArea.querySelector('.humidty').innerText = `${weather.REH}%`;
  infoArea.querySelector('.wave').innerText = `${weather.WAV}`;
  infoArea.querySelector('.wind-speed').innerText = `${weather.WSD}`;
  infoArea.querySelector('.wind-direction').innerText = `${getWindDirection(weather.VEC)}`;
};

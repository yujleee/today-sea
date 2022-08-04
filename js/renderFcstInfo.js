import { selectImg } from './weatherImg.js';

const beachInfo = JSON.parse(localStorage.getItem('beachInfo'));

const beachInfoTop = document.querySelector('.beach-info-top');
const infoArea = document.querySelector('.info-area');

export const renderFcstInfo = (pos) => {
  const getData = (data) => {
    const result = {};
    data.item.forEach((it) => {
      result[it.category] = it.fcstValue;
    });
    return result;
  };

  const weather = getData(pos.response.body.items);

  beachInfoTop.querySelector('.beach-name').innerText = beachInfo.name;
  beachInfoTop.querySelector('.weather-img img').setAttribute('src', selectImg(weather.SKY, weather.PTY));
  beachInfoTop.querySelector('.current-temp').innerText = `${weather.TMP}°`;

  infoArea.querySelector('.humidty').innerText = `${weather.REH}%`;
  infoArea.querySelector('.wave').innerText = `${weather.WAV}`;
  infoArea.querySelector('.wind-speed').innerText = `${weather.WSD}`;
  infoArea.querySelector('.wind-direction').innerText = `${weather.VEC}`;
};

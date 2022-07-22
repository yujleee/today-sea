const today = document.querySelector('.today .temperature-card');

const weatherImg = [
  {
    name: 'clear',
    img: '../assets/images/clear.png',
  },
  {
    name: 'cloud',
    img: '../assets/images/cloud.png',
  },
  {
    name: 'fewCloud',
    img: '../assets/images/few-cloud.png',
  },
  {
    name: 'rain',
    img: '../assets/images/rain.png',
  },
  {
    name: 'lightRain',
    img: '../assets/images/light-Rain.png',
  },
  {
    name: 'clear',
    img: '../assets/images/clear.png',
  },
];

const render = (pos) => {
  const currentTime = new Date().toLocaleString();
  document.querySelector('.current-time').innerText = `${currentTime}`;
  today.querySelector('.current-temp').innerText = `${pos.main.feels_like.toFixed(1)}°`;
  today.querySelector('.info-list .temp-max').innerText = `${pos.main.temp_max.toFixed(1)}°`;
  today.querySelector('.info-list .temp-min').innerText = `${pos.main.temp_min.toFixed(1)}°`;
  today.querySelector('.info-list .humidity').innerText = `${pos.main.humidity.toFixed(1)}°`;
};

export default render;

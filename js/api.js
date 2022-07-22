const API_KEY = 'c40261d80ade97363b1cfe766d7fdbaa';

const render = (pos) => {
  console.log(pos.main.temp);
};

const loadWeather = async (lat, lon) => {
  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => console.error(error));
};

const successPosition = (pos) => {
  const { latitude, longitude } = pos.coords;
  loadWeather(latitude, longitude);
};

const failPosition = (e) => {
  console.error('Geolocation 오류', e);
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}

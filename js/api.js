import render from './render.js';

const API_KEY = 'e70e0a26b718dcd848479ffc22d2ecc1';

const App = () => {
  const loadWeather = async (lat, lon) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
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
};

App();

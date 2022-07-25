import render from './render.js';

const URL = 'https://apis.data.go.kr/1360000/BeachInfoservice';
const API_KEY = 'JgOTEFegmT85gM1vQ7XNalEJFJb0gusFB26pkZkBameKaU3B5WlTltcyt6xWvGR8aNvLvw7Jw6gqnQSiMm6KgQ%3D%3D';

const now = {};
const currentTime = async () => {
  const today = new Date();
  if (today.getMonth() + 1 < 9) {
    now.date = `${today.getFullYear()}0${today.getMonth() + 1}${today.getDate()}`;
  } else {
    now.date = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  }
  now.time = `${today.getHours() + 2}00`;
  return now;
};

const App = async () => {
  currentTime();

  const vilageFcstBeach = await fetch(
    `${URL}/getVilageFcstBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&base_time=${now.time}&beach_num=1`
  )
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => console.error(error));
};

App();

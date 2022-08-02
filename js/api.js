import render from './render.js';

const URL = 'https://apis.data.go.kr/1360000/BeachInfoservice';
const API_KEY = 'JgOTEFegmT85gM1vQ7XNalEJFJb0gusFB26pkZkBameKaU3B5WlTltcyt6xWvGR8aNvLvw7Jw6gqnQSiMm6KgQ%3D%3D';

const now = {};
const currentTime = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString('ko-KO', { month: '2-digit' }).slice(0, 2);
  const date = today.toLocaleString('ko-KO', { day: '2-digit' }).slice(0, 2);
  now.date = `${year}${month}${date}`;
  now.time = `${today.getHours()}00`;
  return now;
};

const App = async () => {
  currentTime();
  const beachInfo = JSON.parse(localStorage.getItem('beachInfo'));
  const beachNumber = beachInfo.num;

  await fetch(
    `${URL}/getVilageFcstBeach?serviceKey=${API_KEY}&dataType=JSON&base_date=${now.date}&base_time=${now.time}&beach_num=${beachNumber}`
  )
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => console.error(error));
};

App();

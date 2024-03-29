import { store } from './store/store.js';

const infoArea = document.querySelector('.info-area');
const currentTime = store.getLocalStorage('currentTime').time;

const tideType = ['ET1', 'FT1', 'ET2', 'FT2'];

export const renderTideInfo = (pos) => {
  const getData = (data) => {
    const values = Object.values(data);
    const result = {};
    values[0].forEach((it) => {
      if (it.tiType === '-') {
        // eslint-disable-next-line no-return-assign
        tideType.forEach((type) => (result[type] = '정보없음'));
      }
      result[it.tiType] = it.tiTime;
    });
    return result;
  };

  const weather = getData(pos.response.body.items);

  let ebbTide = '';
  let floodTide = '';

  if (Number(currentTime.slice(0, 2)) < 12) {
    ebbTide = weather.ET1;
    floodTide = weather.FT1;
  } else {
    ebbTide = weather.ET2;
    floodTide = weather.FT2;
  }

  infoArea.querySelector('.ebb-tide').innerText = `${ebbTide}`;
  infoArea.querySelector('.flood-tide').innerText = `${floodTide}`;
};

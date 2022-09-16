import { store } from './store/store.js';

const weatherImg = [
  {
    img_id: 1,
    name: 'clear',
    img: 'clear.png',
  },
  {
    img_id: 4,
    name: 'cloud',
    img: 'cloud.png',
  },
  {
    img_id: 3,
    name: 'fewCloud',
    img: 'few-cloud.png',
  },
  {
    img_id: 2,
    name: 'rain',
    img: 'rain.png',
  },
  {
    img_id: 6,
    name: 'lightRain',
    img: 'light-Rain.png',
  },
  {
    img_id: 8,
    name: 'snow',
    img: 'snow.png',
  },
  {
    img_id: 5,
    name: 'night',
    img: 'night.png',
  },
];

const currentTime = Number(store.getLocalStorage('currentTime').time);

export const selectImg = (sky, pty) => {
  let src = '';

  if (currentTime >= 2000) {
    const imgList = weatherImg.find((it) => it.name === 'night');
    return `../assets/images/${imgList.img}`;
  }

  if (Number(pty) === 0) {
    const imgList = weatherImg.find((it) => it.img_id === Number(sky));
    src = `../assets/images/${imgList.img}`;
  }

  if (Number(pty) >= 1) {
    const imgList = weatherImg.find((it) => it.img_id === Number(pty) + 1);
    src = `../assets/images/${imgList.img}`;
  }
  return src;
};

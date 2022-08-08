import { store } from './store/store.js';

const weatherImg = [
  {
    img_id: 1,
    name: 'clear',
    img: '../assets/images/clear.png',
  },
  {
    img_id: 4,
    name: 'cloud',
    img: '../assets/images/cloud.png',
  },
  {
    img_id: 3,
    name: 'fewCloud',
    img: '../assets/images/few-cloud.png',
  },
  {
    img_id: 2,
    name: 'rain',
    img: '../assets/images/rain.png',
  },
  {
    img_id: 6,
    name: 'lightRain',
    img: '../assets/images/light-Rain.png',
  },
  {
    img_id: 8,
    name: 'snow',
    img: '../assets/images/snow.png',
  },
  {
    img_id: 5,
    name: 'night',
    img: '../assets/images/night.png',
  },
];

const currentTime = Number(store.getLocalStorage('currentTime').time);

export const selectImg = (sky, pty) => {
  let src = '';

  if (currentTime >= 2000) {
    const imgList = weatherImg.find((it) => it.name === 'night');
    return imgList.img;
  }

  if (Number(pty) === 0) {
    const imgList = weatherImg.find((it) => it.img_id === Number(sky));
    src = imgList.img;
  }

  if (Number(pty) >= 1) {
    const imgList = weatherImg.find((it) => it.img_id + 1 === Number(pty));
    src = imgList.img;
  }

  return src;
};

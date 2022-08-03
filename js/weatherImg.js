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
];

export const selectImg = (sky, pty) => {
  let src = '';
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

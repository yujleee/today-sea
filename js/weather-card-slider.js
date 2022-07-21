/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const weatherSlider = tns({
  loop: false,
  arrowKeys: true,
  mouseDrag: true,
  preventScrollOnTouch: true,
  container: '.card-wrap',
  controls: false,
  autoplayButtonOutput: false,
  center: true,
  gutter: -50,
  responsive: {
    540: {
      gutter: -60,
    },
    720: {
      gutter: -70,
    },
    1200: {
      gutter: -80,
    },
  },
});

const btnGuide = document.querySelector('.btn-guide');
const guideWrapper = document.querySelector('.guide-wrapper');
const btnClose = guideWrapper.querySelector('.btn-close');
const overlay = document.querySelector('.overlay');

btnGuide.addEventListener('click', () => {
  overlay.classList.add('is-active');
  guideWrapper.classList.add('is-active');
});

btnClose.addEventListener('click', () => {
  overlay.classList.remove('is-active');
  guideWrapper.classList.remove('is-active');
});

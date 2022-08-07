/* eslint-disable no-restricted-syntax */
import { store } from './store/store.js';

const searchInput = document.querySelector('.input-search');
const searchForm = searchInput.parentNode;
const resultList = document.querySelector('.result-list');

let beachInfo = {};
const beachNames = [];

const fetchData = async () => {
  await fetch('../assets/beachData.json')
    .then((response) => response.json())
    .then((data) => {
      beachInfo = Object.values(data);
      return beachInfo;
    })
    .then((data) => {
      for (const [idx, beach] of Object.entries(data)) {
        beachNames[idx] = beach.name;
      }
      return beachNames;
    })
    .catch((err) => console.error(err));
};

fetchData();

const handleSearch = () => {
  const word = searchInput.value;
  let beachList = [];
  if (word !== '') {
    const recommandName = beachNames.filter((name) => name.toLowerCase().startsWith(word));
    beachList = recommandName.map((item) => `<li>${item}</li>`).join('');
  }
  resultList.innerHTML = beachList;
};

const submitBeach = (e) => {
  const beachName = e.target.innerText;
  let beachNumber = 1;
  for (const [idx, beach] of Object.entries(beachInfo)) {
    if (beach.name === beachName) {
      beachNumber = beach['beach-num'];
    }
  }

  searchInput.value = beachName;
  const payload = {
    num: beachNumber,
    name: beachName,
  };

  store.setLocalStorage('beachInfo', payload);
  searchForm.submit();
};

searchInput.addEventListener('keyup', (e) => {
  if (e.key !== 'backspace') {
    resultList.parentNode.classList.add('is-active');
    handleSearch();
  }
});

resultList.addEventListener('click', (e) => {
  submitBeach(e);
});

/* eslint-disable no-restricted-syntax */
import { store } from './store/store.js';

function Search() {
  const BASE_TIME = [2, 5, 8, 11, 14, 17, 20, 23];
  const searchInput = document.querySelector('.input-search');
  const searchForm = searchInput.parentNode;
  const resultList = document.querySelector('.result-list');

  let beachInfo = {};
  const beachNames = [];
  this.searchCount = -1;
  this.searchMaxCount = 0;

  const now = {};

  const savePayload = (a, b) => {
    const payload = {
      date: a,
      time: b,
    };

    return payload;
  };

  const getBaseTime = (currentTime) => {
    const index = BASE_TIME.findIndex((it) => currentTime <= it);
    const baseTime = BASE_TIME[index - 1];
    return baseTime < 10 ? `0${baseTime}00` : `${baseTime}00`;
  };

  const getCurrentTime = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.toLocaleString('ko-KO', { month: '2-digit' }).slice(0, 2);
    const date = today.toLocaleString('ko-KO', { day: '2-digit' }).slice(0, 2);
    now.date = `${year}${month}${date}`;
    now.time = getBaseTime(today.getHours());
    return now;
  };

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
    this.searchMaxCount = resultList.childElementCount;
  };

  const submitBeach = (e) => {
    const beachName = searchInput.value.length === 1 ? e.target.innerText : searchInput.value;
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

    getCurrentTime();

    store.setLocalStorage('beachInfo', payload);
    store.setLocalStorage('currentTime', savePayload(now.date, now.time));
    searchForm.submit();
  };

  const handleSearchResult = (e) => {
    if (this.searchCount >= this.searchMaxCount) {
      this.searchCount = -1;
    } else if (this.searchCount > this.searchMaxCount || this.searchCount < 0) {
      this.searchCount = this.searchMaxCount;
    }

    const li = resultList.childNodes[this.searchCount];
    switch (e.key) {
      case 'ArrowUp':
        this.searchCount -= 1;

        break;
      case 'ArrowDown':
        this.searchCount += 1;
        break;
      case 'Enter':
        searchInput.value = li.innerText;
        submitBeach();
        break;
      default:
        break;
    }
    li.classList.toggle('is-active');
  };

  searchInput.addEventListener('keyup', (e) => {
    if (e.key !== 'backspace') {
      resultList.parentNode.classList.add('is-active');
      handleSearch();
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      handleSearchResult(e);
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchResult(e);
    }
  });

  resultList.addEventListener('click', (e) => {
    submitBeach(e);
  });
}

window.onload = () => {
  const search = new Search();
};

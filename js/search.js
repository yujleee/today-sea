/* eslint-disable no-restricted-syntax */
import { store } from './store/store.js';

function Search() {
  const BASE_TIME = [2, 5, 8, 11, 14, 17, 20, 23];
  const searchInput = document.querySelector('.input-search');
  const submitButton = document.querySelector('.search-btn');
  const errorText = document.querySelector('.error-text');
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
      beachList = recommandName.map((item, idx) => `<li data-index=${idx}>${item}</li>`).join('');
    }

    if (beachList.length === 0) {
      resultList.parentNode.classList.remove('is-active');
      errorText.classList.add('is-active');
      return;
    }

    resultList.parentNode.classList.add('is-active');
    resultList.innerHTML = beachList;
    this.searchMaxCount = resultList.childElementCount;
  };

  const submitBeach = (e, activeText) => {
    const beachName = activeText || e.target.innerText;
    let beachNumber = -1;

    for (const [idx, beach] of Object.entries(beachInfo)) {
      //   beachNumber = beach.name === beachName ? beach['beach-num'] : -1;
      if (beach.name === beachName) {
        beachNumber = beach['beach-num'];
      }
    }
    try {
      if (beachNumber === -1) {
        throw new SyntaxError('검색 결과가 존재하지 않습니다.');
      }
    } catch (error) {
      if (error.name === 'SyntaxError') {
        errorText.classList.add('is-active');
        errorText.innerText = error.message;
        return;
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

    const li = resultList.childNodes;

    switch (e.key) {
      case 'ArrowUp':
        this.searchCount -= 1;

        break;
      case 'ArrowDown':
        this.searchCount += 1;
        break;
      default:
        break;
    }

    Array.from(li).forEach((item) => {
      const idx = Number(item.getAttribute('data-index'));
      if (idx === this.searchCount) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  };

  searchInput.addEventListener(
    'input',
    _.debounce((e) => {
      resultList.parentNode.classList.remove('is-active');
      if (e.target.value.length !== 0) {
        handleSearch();
      }
    }, 300)
  );

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      handleSearchResult(e);
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    errorText.classList.remove('is-active');
    if (e.key === 'Enter') {
      e.preventDefault();

      const li = resultList.childNodes;
      const activeText = Array.from(li).find((item) => item.classList.contains('is-active'));
      //   this.target.value = activeText.innerText;
      submitBeach(e, activeText.innerText);
    }
  });

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    submitBeach(e);
  });

  resultList.addEventListener('click', (e) => {
    submitBeach(e);
  });
}

window.onload = () => {
  const search = new Search();
};

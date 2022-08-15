/* eslint-disable no-restricted-syntax */
import { store } from './store/store.js';

function Search() {
  const searchInput = document.querySelector('.input-search');
  const searchForm = searchInput.parentNode;
  const resultList = document.querySelector('.result-list');

  let beachInfo = {};
  const beachNames = [];
  this.searchCount = 0;
  this.searchMaxCount = 0;

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
    //   searchForm.submit();
  };

  const handleSearchResult = (e) => {
    console.log(resultList.childElementCount);
    const li = resultList.childNodes[this.searchCount];
    if (this.searchCount > this.searchMaxCount || this.searchCount < 0) {
      this.searchCount = 0;
    } else {
      switch (e.key) {
        case 'ArrowUp':
          this.searchCount -= 1;
          console.log('up', this.searchCount);
          break;
        case 'ArrowDown':
          this.searchCount += 1;
          console.log('down', this.searchCount);
          break;
        default:
          break;
      }
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

  resultList.addEventListener('click', (e) => {
    submitBeach(e);
  });
}

const search = new Search();

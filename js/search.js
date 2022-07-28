/* eslint-disable no-restricted-syntax */
const searchInput = document.querySelector('.input-search');

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
  if (word !== '') {
    const recommandName = beachNames.filter((name) => name.toLowerCase().startsWith(word));
  }
};

searchInput.addEventListener('keyup', (e) => {
  if (e.key !== 'backspace') {
    handleSearch();
  }
});

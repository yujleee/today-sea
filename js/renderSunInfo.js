const infoArea = document.querySelector('.info-area');

export const renderSunInfo = (pos) => {
  const getData = (data) => {
    const result = {
      sunrise: data.item[0].sunrise !== ':' ? data.item[0].sunrise : '정보없음',
      sunset: data.item[0].sunset !== ':' ? data.item[0].sunset : '정보없음',
    };

    return result;
  };

  const sunInfo = getData(pos.response.body.items);
  infoArea.querySelector('.sunrise').innerText = sunInfo.sunrise;
  infoArea.querySelector('.sunset').innerText = sunInfo.sunset;
};

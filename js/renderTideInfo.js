// const infoArea = document.querySelector('.info-area');

export const renderTideInfo = (pos) => {
  console.log(pos);
  const getData = (data) => {
    const values = Object.values(data);
    const result = {};
    values[0].forEach((it) => {
      result[it.tiType] = it.tiTime;
    });
    return result;
  };

  const weather = getData(pos.response.body.items);
  console.log(weather);

  // infoArea.querySelector('.tide').innerText = `${weather.REH}%`;
};

const search = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
search.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  //елементи форми
  const { query, days } = evt.currentTarget.elements;
  // значення елементів форми
  getWeather(query.value, days.value)
    .then(data => (list.innerHTML = createMarcup(data.forecast.forecastday)))
    .catch(err => console.log(err));
}

// ------------запит на погоду---------------
function getWeather(city, days) {
  const API_KEY = 'b8c62e719a6e4ef6972172816241607';
  const BASE_URL = 'http://api.weatherapi.com/v1';

  const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days: days,
    lang: 'uk',
  });
  return fetch(
    // `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang="uk"` АБО
    `${BASE_URL}/forecast.json?${params}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

//-------------рендеримо наш список--------------
function createMarcup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { icon, text },
        },
      }) => `
  <li>
  <img src="${icon}" alt ="${text}">
  <p>${text}</p>
  <h2>${date}</h2>
  <h3>${avgtemp_c}</h3>
  </li>`
    )
    .join(' ');
}

const input_search = document.querySelector('#searchCountry');
const root = document.querySelector('body');
const main_div = document.querySelector('.countries');
let arr = [];

fetch('https://restcountries.com/v2/all').then(response => {
  const promise_body = response.json();
  promise_body.then(body => {
    createHtml(body);
    arr = body;
  });
});

function createHtml(body) {
  main_div.innerHTML = '';
  body.forEach(element => {
    const country_name = document.createElement('h2');
    country_name.textContent = element.name;
    const country_region = document.createElement('span');
    country_region.textContent = `Region:  ${element.region}`;
    const country_capital = document.createElement('span');
    country_capital.textContent = `Capital:  ${element.capital}`;
    const country_population = document.createElement('span');
    country_population.textContent = `Population :  ${element.population}`;
    const country_flag = document.createElement('img');
    country_flag.src = element.flags.svg;
    const div = document.createElement('div');
    div.classList.add('country');
    div.append(
      country_flag,
      country_name,
      country_capital,
      country_region,
      country_population
    );
    main_div.append(div);
  });
  input_search.value = '';
}
input_search.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  const searched_country = arr.filter(element => {
    return (
      element.name === input_search.value ||
      element.translations.pt === input_search.value
    );
  });
  if (!input_search.value) {
    createHtml(arr);
    return;
  }
  createHtml(searched_country);
});

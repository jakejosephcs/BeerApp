const beersUrl = 'https://api.punkapi.com/v2/beers?page=';
const beerDiv = document.querySelector('.beers');

const filterABVForm = document.getElementById('filterABV');
let filterABV = '';

const filterIBUForm = document.getElementById('filterIBU');
let filterIBU = '';

const pageNumber = document.getElementById('pageNumber');
const nextPage = document.getElementById('nextPage');
const prevPage = document.getElementById('prevPage');
let page = 1;

nextPage.addEventListener('click', () => {
  page++;
  getBeers();
});

prevPage.addEventListener('click', () => {
  page--;
  getBeers();
});

filterABVForm.addEventListener('change', e => {
  const choice = e.target.value;

  switch (choice) {
    case 'all':
      break;
    case 'weak':
      filterABV = '&abv_lt=4.6';
      break;
    case 'medium':
      filterABV = '&abv_gt=4.5&abv_lt=7.6';
      break;
    case 'strong':
      filterABV = '&abv_gt=7.5';
      break;
  }

  page = 1;
  getBeers();
});

filterIBUForm.addEventListener('change', e => {
  const choice = e.target.value;

  switch (choice) {
    case 'all':
      break;
    case 'weak':
      filterIBU = '&ibu_lt=35';
      break;
    case 'medium':
      filterIBU = '&ibu_gt=34&ibu_lt=75';
      break;
    case 'strong':
      filterIBU = '&ibu_gt=74';
      break;
  }

  page = 1;
  getBeers();
});

async function getBeers() {
  const url = beersUrl + page + filterABV + filterIBU;
  const beersResponse = await fetch(url);
  const beers = await beersResponse.json();

  if (page == 1) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }

  if (beers.length < 25) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  let html = '';

  for (beer of beers) {
    html += `
      <div class='beer-wrapper card'>
        <div class='beer'>
            <img class='beer__img' src="${beer.image_url}">
            <h3>${beer.name}</h3>
            <span class='beer__info'>
                <span>ABV: ${beer.abv}%</span>
                <span>IBU: ${beer.ibu}</span>
            </span>
        </div>
        <div class='beer__content'>
            <div class='beer__name'>${beer.name}</div>
            <div class='beer__tagline'>${beer.tagline}</div>
            <div class='beer__description'>${beer.description}</div>
            <div class='beer__food-pairing'>
                Pair with: ${beer.food_pairing.join(', ')}
            </div>
        </div>
      </div>
    `;
  }

  beerDiv.innerHTML = html;
  pageNumber.textContent = page;
}

getBeers();

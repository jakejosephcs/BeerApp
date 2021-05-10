const beersUrl = 'https://api.punkapi.com/v2/beers?';
const beerDiv = document.querySelector('.beers');

const filterABVForm = document.getElementById('filterABV');
let filterABV = '';

const filterIBUForm = document.getElementById('filterIBU');
let filterIBU = '';

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

  getBeers();
});

async function getBeers() {
  const url = beersUrl + filterABV + filterIBU;
  const beersResponse = await fetch(url);
  const beers = await beersResponse.json();

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
}

getBeers();

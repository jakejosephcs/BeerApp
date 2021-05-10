const beersUrl = 'https://api.punkapi.com/v2/beers';
const beerDiv = document.querySelector('.beers');

async function getBeers() {
  const beersResponse = await fetch(beersUrl);
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

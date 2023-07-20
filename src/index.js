import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
const { breedSelect, catInfo, loader, error } = elements;

breedSelect.style.display = 'none';
error.style.display = 'none';

fetchBreeds()
  .then(data => {
    breedSelect.hidden = false;
    breedSelect.insertAdjacentHTML(
      'afterbegin',
      `<option value="" disabled="disabled" selected="selected"  >Please, select cat</option`
    );
    data.map(breed =>
      breedSelect.insertAdjacentHTML(
        'beforeend',
        `<option value="${breed.id}">${breed.name}</option>`
      )
    );

    breedSelect.style.display = 'block';
    error.style.display = 'none';
    loader.style.display = 'none';
  })

  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

breedSelect.addEventListener('change', onChangeSelect);

function onChangeSelect(event) {
  loader.style.display = 'block';

  const breedId = event.currentTarget.value;
  catInfo.style.display = 'block';
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
      <div class="description">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p>
      </div>`;
    })

    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      catInfo.style.display = 'none';
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

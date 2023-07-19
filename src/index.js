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
    const markup = data
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    breedSelect.innerHTML = markup;
    breedSelect.style.display = 'block';
    error.style.display = 'none';
    loader.style.display = 'none';
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {});

breedSelect.addEventListener('change', onChangeSelect);

function onChangeSelect(event) {
  loader.style.display = 'block';
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      catInfo.classList.add('hidden');
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

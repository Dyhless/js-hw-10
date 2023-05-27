import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '.breed-select',
});

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loadingElement: document.querySelector('.loading'),
  errorElement: document.querySelector('.error'),
  catInfoContainer: document.querySelector('.cat-info'),
};

refs.breedSelect.addEventListener('change', handleBreedSelectChange);

function handleBreedSelectChange() {
  const selectedBreedId = this.value;

  fetchCatByBreed(selectedBreedId)
    .then(catInfo => {
      updateCatInfo(catInfo);
      showCatInfoContainer();
    })
    .catch(error => {
      console.error(error);
    });
}

function updateCatInfo(catInfo) {
  const catImage = document.createElement('img');
  catImage.src = catInfo.imageUrl;

  const breedName = document.createElement('p');
  breedName.textContent = `Breed: ${catInfo.breedName}`;

  const description = document.createElement('p');
  description.textContent = `Description: ${catInfo.description}`;

  const temperament = document.createElement('p');
  temperament.textContent = `Temperament: ${catInfo.temperament}`;

  refs.catInfoContainer.innerHTML = '';
  refs.catInfoContainer.appendChild(catImage);
  refs.catInfoContainer.appendChild(breedName);
  refs.catInfoContainer.appendChild(description);
  refs.catInfoContainer.appendChild(temperament);
}

function showCatInfoContainer() {
  refs.catInfoContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleDOMContentLoaded() {
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
      enableBreedSelect();
      hideLoadingElement();
    })
    .catch(error => {
      console.error(error);
      showErrorElement();
      hideLoadingElement();
    });
}

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    refs.breedSelect.appendChild(option);
  });
}

function enableBreedSelect() {
  refs.breedSelect.disabled = false;
}

function hideLoadingElement() {
  refs.loadingElement.style.display = 'none';
}

function showErrorElement() {
  refs.errorElement.style.display = 'block';
}

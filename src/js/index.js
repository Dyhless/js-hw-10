import Notiflix from 'notiflix';
import SlimSelect from 'slim-select/dist/slimselect.min';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loadingElement: document.querySelector('.loading'),
  errorElement: document.querySelector('.error'),
  catInfoContainer: document.querySelector('.cat-info'),
};

document.addEventListener('DOMContentLoaded', () => {
  new SlimSelect({
    select: '.breed-select',
  });

  refs.breedSelect.addEventListener('change', function () {
    const selectedBreedId = this.value;

    fetchCatByBreed(selectedBreedId)
      .then(catInfo => {
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

        refs.catInfoContainer.style.display = 'block';
      })
      .catch(error => {
        console.error(error);
      });
  });

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.breedSelect.appendChild(option);
      });

      refs.breedSelect.disabled = false;
      refs.loadingElement.style.display = 'none';
    })
    .catch(error => {
      console.error(error);
      refs.errorElement.style.display = 'block';
      refs.loadingElement.style.display = 'none';
    });
});

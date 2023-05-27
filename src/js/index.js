import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';


import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loadingElement: document.querySelector('.loading'),
  errorElement: document.querySelector('.error'),
  catInfoContainer: document.querySelector('.cat-info'),
  loaderElement: document.querySelector('.loader'), // Добавлено
};

document.addEventListener('DOMContentLoaded', () => {
  new SlimSelect({
    select: '#breed-select',
    searchable: false,
  });

  refs.breedSelect.addEventListener('change', function () {
    const selectedBreedId = this.value;

    // Показать загрузчик
    refs.loaderElement.classList.add('visible');

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

        // Скрыть загрузчик
        refs.loaderElement.classList.remove('visible');
      })
      .catch(error => {
        console.error(error);
        // Скрыть загрузчик
        refs.loaderElement.classList.remove('visible');
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

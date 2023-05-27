import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Определение ссылок на HTML-элементы
const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loadingElement: document.querySelector('.loading'),
  errorElement: document.querySelector('.error'),
  catInfoContainer: document.querySelector('.cat-info'),
  loaderElement: document.querySelector('.loader'),
};

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация SlimSelect для выбора породы
  new SlimSelect({
    select: '#breed-select',
    searchable: false,
  });

  // Обработчик события изменения выбора породы
  refs.breedSelect.addEventListener('change', function () {
    const selectedBreedId = this.value;

    // Показать загрузчик
    refs.loaderElement.classList.add('visible');

    // Получение информации о кошке по породе
    fetchCatByBreed(selectedBreedId)
      .then(catInfo => {
        // Создание элементов с информацией о кошке
        const catImage = document.createElement('img');
        catImage.src = catInfo.imageUrl;

        const breedName = document.createElement('p');
        breedName.textContent = `Порода: ${catInfo.breedName}`;

        const description = document.createElement('p');
        description.textContent = `Описание: ${catInfo.description}`;

        const temperament = document.createElement('p');
        temperament.textContent = `Характер: ${catInfo.temperament}`;

        // Очистка и заполнение контейнера с информацией о кошке
        refs.catInfoContainer.innerHTML = '';
        refs.catInfoContainer.appendChild(catImage);
        refs.catInfoContainer.appendChild(breedName);
        refs.catInfoContainer.appendChild(description);
        refs.catInfoContainer.appendChild(temperament);

        // Отображение контейнера с информацией о кошке
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

  // Получение списка пород и заполнение выбора породы
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.breedSelect.appendChild(option);
      });

      // Включение выбора породы и скрытие элемента загрузки
      refs.breedSelect.disabled = false;
      refs.loadingElement.style.display = 'none';
    })
    .catch(error => {
      console.error(error);
      // Отображение элемента ошибки и скрытие элемента загрузки
      refs.errorElement.style.display = 'block';
      refs.loadingElement.style.display = 'none';
    });
});

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import * as catApi from './cat-api.js';

// Определение ссылок на HTML-элементы
const breedSelect = document.querySelector('.breed-select');
const loadingElement = document.querySelector('.loading');
const errorElement = document.querySelector('.error');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация SlimSelect для выбора породы
  new SlimSelect({
    select: '#breed-select',
    searchable: false,
  });

  // Функция для получения информации о кошке по породе
  const getCatInfoByBreed = (selectedBreedId) => {
    return catApi.fetchCatByBreed(selectedBreedId)
      .then((catInfo) => {
        const catInfoHTML = `
          <img src="${catInfo.imageUrl}">
          <p>Breed: ${catInfo.breedName}</p>
          <p>Description: ${catInfo.description}</p>
          <p>Temperament: ${catInfo.temperament}</p>
        `;

        catInfoContainer.innerHTML = catInfoHTML;
        catInfoContainer.style.display = 'block';
        loaderElement.classList.remove('visible');
      })
      .catch((error) => {
        console.error(error);
        loaderElement.classList.remove('visible');
        Notiflix.Notify.failure('Произошла ошибка. Пожалуйста, повторите попытку позже.');
      });
  };

  // Обработчик события изменения выбора породы
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    loaderElement.classList.add('visible');

    getCatInfoByBreed(selectedBreedId);
  });

  // Получение списка пород и заполнение выбора породы
  catApi.fetchBreeds()
    .then((breeds) => {
      breeds.forEach((breed) => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      breedSelect.disabled = false; // Включение выбора породы
      loadingElement.style.display = 'none'; // Скрытие элемента загрузки
    })
    .catch((error) => {
      console.error(error);
      Notiflix.Notify.failure('Не удалось загрузить список пород. Пожалуйста, повторите попытку позже.');
      loadingElement.style.display = 'none';
    });
});

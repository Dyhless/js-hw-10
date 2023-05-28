// Импорт необходимых модулей
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import * as catApi from './cat-api.js';

// Определение ссылок на HTML-элементы
const breedSelect = document.querySelector('.breed-select');
const loadingElement = document.querySelector('.loading');
const errorElement = document.querySelector('.error');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

// Обработчик события загрузки контента страницы
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация SlimSelect для выбора породы
  new SlimSelect({
    select: '#breed-select',
    searchable: false,
  });

  // Функция для получения информации о кошке по породе
  const getCatInfoByBreed = (selectedBreedId) => {
    // Скрыть элемент с ошибкой при начале загрузки
    errorElement.style.display = 'none';

    return catApi.fetchCatByBreed(selectedBreedId)
      .then((catInfo) => {
        // Формирование HTML с информацией о кошке
        const catInfoHTML = `
          <img src="${catInfo.imageUrl}">
          <p>Breed: ${catInfo.breedName}</p>
          <p>Description: ${catInfo.description}</p>
          <p>Temperament: ${catInfo.temperament}</p>
        `;

        // Вставка HTML с информацией о кошке в контейнер и отображение контейнера
        catInfoContainer.innerHTML = catInfoHTML;
        catInfoContainer.style.display = 'block';

        // Скрытие элемента загрузки
        loaderElement.classList.remove('visible');
      })
      .catch((error) => {
        console.error(error);

        // Скрытие элемента загрузки и вывод уведомления об ошибке
        loaderElement.classList.remove('visible');
        Notiflix.Notify.failure('Произошла ошибка. Пожалуйста, повторите попытку позже.');

        // Показать элемент с ошибкой в случае ошибки загрузки
        errorElement.style.display = 'block';
      });
  };

  // Обработчик события изменения выбора породы
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    // Отображение элемента загрузки
    loaderElement.classList.add('visible');

    // Получение информации о кошке по выбранной породе
    getCatInfoByBreed(selectedBreedId);
  });

  // Получение списка пород и заполнение выбора породы
  catApi.fetchBreeds()
    .then((breeds) => {
      breeds.forEach((breed) => {
        // Создание и добавление элемента <option> в выбор породы
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      // Включение выбора породы и скрытие элемента загрузки после успешной загрузки списка пород
      breedSelect.disabled = false;
      loadingElement.style.display = 'none';
    })
    .catch((error) => {
      console.error(error);

      // Вывод уведомления об ошибке и скрытие элемента загрузки в случае ошибки при загрузке списка пород
      Notiflix.Notify.failure('Не удалось загрузить список пород. Пожалуйста, повторите попытку позже.');
      loadingElement.style.display = 'none';
    });
});

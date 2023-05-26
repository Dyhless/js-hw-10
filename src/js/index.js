import Notiflix from 'notiflix';

import SlimSelect from 'slim-select'
new SlimSelect({
  select: '#selectElement'
})

import { fetchBreeds } from "./cat-api.js";

fetchBreeds('Bengal').then((result) => console.log(result));
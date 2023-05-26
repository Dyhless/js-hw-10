import Notiflix from 'notiflix';

import SlimSelect from 'slim-select'
new SlimSelect({
  select: '#selectElement'
})

// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk


const URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk';

function fetchBreeds(query) {
   return fetch(`${URL}?api_key=${API_KEY}&q=${query}`).then((res) => res.json());
}

// fetchBreeds('Bengal').then((result) => console.log(result));

export { fetchBreeds }

// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk


const URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk';

async function fetchBreeds(query) {
   const res = await fetch(`${URL}?api_key=${API_KEY}&q=${query}`);
   return await res.json();
}

export { fetchBreeds }; 
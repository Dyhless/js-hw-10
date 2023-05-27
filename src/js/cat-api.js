// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk

const URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY = 'live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk';


export function fetchBreeds() {
  return fetch(URL, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      return response.json();
    })
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name
      }));
    });
}

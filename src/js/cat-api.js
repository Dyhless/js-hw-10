// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk


const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk';

export function fetchBreeds() {
  const endpoint = `${BASE_URL}/breeds`;

  return fetch(endpoint, {
    headers: {
      'x-api-key': API_KEY,
    },
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
        name: breed.name,
      }));
    });
}

export function fetchCatByBreed(breedId) {
  const endpoint = `${BASE_URL}/images/search?breed_ids=${breedId}`;

  return fetch(endpoint, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const catInfo = data[0].breeds[0];
        return {
          imageUrl: data[0].url,
          breedName: catInfo.name,
          description: catInfo.description,
          temperament: catInfo.temperament,
        };
      } else {
        throw new Error('No cat found for the selected breed');
      }
    });
}

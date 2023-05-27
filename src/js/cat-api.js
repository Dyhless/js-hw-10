// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_VhTrCGP65dIGzY8rmbUl7pgkAFfxbHetBgABGPGnLaQCFWyU5T7IvvATQNKs3Uhk';

export function fetchBreeds() {
  const endpoint = `${BASE_URL}/breeds`;

  return fetchWithApiKey(endpoint)
    .then(handleResponse)
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    });
}

export function fetchCatByBreed(breedId) {
  const endpoint = `${BASE_URL}/images/search?breed_ids=${breedId}`;

  return fetchWithApiKey(endpoint)
    .then(handleResponse)
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

function fetchWithApiKey(endpoint) {
  return fetch(endpoint, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error('Request failed');
  }
  return response.json();
}

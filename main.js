import { createFavoriteImage, createRandomImage } from "./js/render.js";

async function render() {
  let randomKitties = await fetchImages(`${API_URL}/images/search?limit=10`);
  let favoriteKitties = await fetchImages(`${API_URL}/favourites?api_key=${API_KEY}`);

  
  let elements = randomKitties.map(kittie => 
    createRandomImage(kittie.url, kittie.id, saveFavorites));
  randomCatsSection.append(...elements);

  elements = favoriteKitties.map(kittie => 
    createFavoriteImage(kittie.image.url, kittie.id, removeFavorites));
  favoriteCatsSection.append(...elements);
}

async function fetchImages(API) {
  return await fetch(API).then(res => res.json()).then(data => data);
}

async function saveFavorites(id) {
  const res = await fetch(`${API_URL}/favourites`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": API_KEY
    },
    body: JSON.stringify({"image_id": id, "sub_id":"user-123"})
  });

  if(res.status !== 200) console.error(res);
  else {
    let newImages = await fetchImages(`${API_URL}/favourites?api_key=${API_KEY}`)
    document.querySelectorAll(".favorite-cats .images-wrapper .random-cat")
      .forEach((element)=>{
        document.querySelector(".favorite-cats .images-wrapper").removeChild(element);
      });
    let elements = newImages.map(kittie => 
      createFavoriteImage(kittie.image.url, kittie.id, removeFavorites));
    favoriteCatsSection.append(...elements);
  };
}

async function removeFavorites(id) {
  const res = await fetch(`${API_URL}/favourites/${id}`, { 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": API_KEY
    },
  });

  if(res.status !== 200) console.error('Ha habido un error guardando tu imagen en favoritos');
  else {
    let newImages = await fetchImages(`${API_URL}/favourites?api_key=${API_KEY}`);
    document.querySelectorAll(".favorite-cats .images-wrapper .random-cat")
      .forEach((element)=>{
        document.querySelector(".favorite-cats .images-wrapper").removeChild(element);
      });
    let elements = newImages.map(kittie => 
      createFavoriteImage(kittie.image.url, kittie.id, removeFavorites));
    favoriteCatsSection.append(...elements);
  };
}

async function main() {
  await render()
}

const randomCatsSection = document.querySelector(".random-cats div");
const favoriteCatsSection = document.querySelector(".favorite-cats div");

const API_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_OQVYnUVcAQ0axTMr421RHTbAeEWZ2PesB54jYFnf0eSrBp0Q36iHvSNSLQwHWUUQ";

main();
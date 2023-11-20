function createRandomImage(src, id, saveFavorites) {
  const article = document.createElement("article");
  const image = document.createElement("img");
  const markFavorite = document.createElement("button");

  article.classList.add("random-cat");
  image.classList.add("random-cat_image");
  markFavorite.classList.add("random-cat_button");

  image.src = src;
  article.append(image, markFavorite);

  let eventListener = markFavorite
    .addEventListener('click', async ()=>{
      await saveFavorites(id);
      markFavorite.removeEventListener('click', eventListener);
    });

  return article;
}

function createFavoriteImage(src, id, removeFavorites) {
  const article = document.createElement("article");
  const image = document.createElement("img");
  const unmarkFavorite = document.createElement("button");

  article.classList.add("random-cat");
  image.classList.add("random-cat_image");
  unmarkFavorite.classList.add("random-cat_button");

  image.src = src;
  article.append(image, unmarkFavorite);

  unmarkFavorite
    .addEventListener('click', async ()=>{
      await removeFavorites(id);
    });

  return article;
}

export { createFavoriteImage, createRandomImage }; 
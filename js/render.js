function createRandomImage(src, id, saveFavorites) {
  const article = document.createElement("article");
  const image = document.createElement("img");
  const markFavorite = document.createElement("i");

  article.classList.add("random-cat");
  image.classList.add("random-cat_image");
  markFavorite.classList.add("random-cat_button");
  markFavorite.classList.add("fa-solid");
  markFavorite.classList.add("fa-star");

  image.src = src;
  article.append(image, markFavorite);

  markFavorite
    .addEventListener('click', async ()=>{
      await saveFavorites(id);
    });

  return article;
}

function createFavoriteImage(src, id, removeFavorites) {
  const article = document.createElement("article");
  const image = document.createElement("img");
  const unmarkFavorite = document.createElement("i");

  article.classList.add("random-cat");
  image.classList.add("random-cat_image");
  unmarkFavorite.classList.add("random-cat_button");
  unmarkFavorite.classList.add("fa-solid");
  unmarkFavorite.classList.add("fa-star");

  image.src = src;
  article.append(image, unmarkFavorite);

  unmarkFavorite
    .addEventListener('click', async ()=>{
      await removeFavorites(id);
    });

  return article;
}

export { createFavoriteImage, createRandomImage }; 
import { getEl } from ".";

export function renderGallery(galleryItems) {
  const galleryItemsArr = galleryItems.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      `
        <a class="gallery__link" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" width="360px" />
        <ul class="gallery__data">
            <li class="data__box">
                <p class="data__title">Likes</p>
                <p class="data__value">${likes}</p>
            </li>
            <li class="data__box">
                <p class="data__title">Views</p>
                <p class="data__value">${views}</p>
            </li>
            <li class="data__box">
                <p class="data__title">Comments</p>
                <p class="data__value">${comments}</p>
            </li>
            <li class="data__box">
                <p class="data__title">Downloads</p>
                <p class="data__value">${downloads}</p>
            </li>
          </ul>
          </a>
          `
  );
  getEl('.gallery').insertAdjacentHTML('beforeend', galleryItemsArr.join(''));
}

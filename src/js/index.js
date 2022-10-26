import { fetchImages } from './fetchImages.js';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';

const searchFormRef = document.querySelector('.search-form');
searchFormRef.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const response = await fetchImages(event.target.elements.searchQuery.value);
        const data = await response.json();
        console.log(data);
        renderGallery(data);
    } catch (error) {console.log(error);}
});


// Наповнюємо перелік елементів з масиву galleryItems;

function renderGallery(galleryItems) {
    if (galleryItems.hits.length < 1) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
    }
    Notify.success(`Hooray! We found ${galleryItems.totalHits} images.`);
  const galleryRef = document.querySelector('.gallery');
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
  galleryRef.innerHTML = galleryItemsArr.join('');
}

// створюємо галерею SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
//  додаємо опис (alt) внизу фото 
  captionsData: 'alt',
  captionDelay: 250,
});

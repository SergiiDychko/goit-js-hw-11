import { getEl, lightbox } from '.';
import { Notify } from 'notiflix';
import { renderGallery } from './render_utils.js';

let page;

async function fetchImages(query, page) {
  return await fetch(
    `https://pixabay.com/api/?key=30849691-d4b4d8699eb6bab45d758087e&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
}

export async function queryToPixabay(event) {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value;
  if (query === '') {
    return Notify.info('Sorry, Please enter a more specific query');
  }
  try {
    getEl('.load-more-wrap').classList.add('is-hidden');
    page = 1;
    const response = await fetchImages(query, page);
    const data = await response.json();
    getEl('.gallery').innerHTML = '';
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
      return; 
    }
    Notify.success(`Hooray! We found ${data.totalHits} images`);
    renderGallery(data);
    lightbox.refresh();
    if (data.totalHits > getEl('.gallery').children.length) {
      getEl('.load-more-wrap').classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getMoreImages() {
  event.preventDefault();
  page += 1;
  const query = getEl('#search-form').elements.searchQuery.value;
  const response = await fetchImages(query, page);
  const data = await response.json();
  renderGallery(data);
  lightbox.refresh();
  if (data.totalHits <= getEl('.gallery').children.length) {
    getEl('.load-more-wrap').classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results")
  }

  console.log(getEl('.gallery').children.length);
}

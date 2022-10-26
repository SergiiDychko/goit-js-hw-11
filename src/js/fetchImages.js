export async function fetchImages(request) {
    return await fetch(
      `https://pixabay.com/api/?key=30849691-d4b4d8699eb6bab45d758087e&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`
    );
}
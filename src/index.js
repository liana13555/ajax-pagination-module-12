import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';


const pagination = new Pagination('#tui-pagination-container', {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
});

const page = pagination.getCurrentPage();

fetchImages(page).then(data => {
  pagination.reset(data.total);
  renderImages(data.images);
});

pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  fetchImages(currentPage).then(data => renderImages(data.images));
});

function fetchImages(page) {
  return fetch(
    `https://pixabay.com/api/?key=22568340-3d930d703d1ad37110880a9ab&q=sun&page=${page}&per_page=20`
  )
    .then(res => res.json())
    .then(data => ({ images: data.hits, total: data.totalHits }));
}

function renderImages(images) {
  console.log('RENDER');
  console.log(images);
}

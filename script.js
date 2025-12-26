
let artworks = [];

fetch('artworks.json')
  .then(response => response.json())
  .then(data => {
    artworks = data;
    populateFilters();
    renderGallery(artworks);
  });

function populateFilters() {
    const years = [...new Set(artworks.map(a => a.year))].sort();
    const categories = [...new Set(artworks.map(a => a.category))];

    const yearFilter = document.getElementById('yearFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    yearFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    const year = document.getElementById('yearFilter').value;
    const category = document.getElementById('categoryFilter').value;

    let filtered = artworks;
    if (year) filtered = filtered.filter(a => a.year == year);
    if (category) filtered = filtered.filter(a => a.category == category);

    renderGallery(filtered);
}

function renderGallery(data) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    data.forEach(art => {
        const img = document.createElement('img');
        img.src = art.image;
        img.alt = art.title;
        img.title = `${art.title} (${art.year}) - ${art.category}`;
        img.onclick = () => openLightbox(img);
        gallery.appendChild(img);
    });
}

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgElement.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

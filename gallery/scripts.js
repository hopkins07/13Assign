let currentPage = 1;

// Main Page Functions
async function fetchCharacters(page = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await response.json();
  return data;
}

async function loadPage(direction) {
  if (direction === 'next') {
    currentPage++;
  } else if (direction === 'prev' && currentPage > 1) {
    currentPage--;
  }
  const data = await fetchCharacters(currentPage);
  renderCharacterGallery(data.results);
  togglePagination(data.info.pages);
}

function renderCharacterGallery(characters) {
  const gallery = document.getElementById('character-gallery');
  gallery.innerHTML = '';
  characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>${character.species}</p>
      <p>${character.status}</p>
    `;
    card.onclick = () => openCharacterDetail(character.id);
    gallery.appendChild(card);
  });
}

function togglePagination(totalPages) {
  document.getElementById('prev-btn').style.display = currentPage === 1 ? 'none' : 'inline-block';
  document.getElementById('next-btn').style.display = currentPage === totalPages ? 'none' : 'inline-block';
}

function openCharacterDetail(id) {
  window.open(`character-detail.html?id=${id}`, '_blank');
}

// Character Detail Page Functions
async function fetchCharacterDetail(id) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await response.json();
  return data;
}

async function loadCharacterDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const character = await fetchCharacterDetail(id);

  document.getElementById('character-name').textContent = character.name;
  document.getElementById('character-image').src = character.image;
  document.getElementById('status').textContent = character.status;
  document.getElementById('species').textContent = character.species;
  document.getElementById('type').textContent = character.type || 'N/A';
  document.getElementById('gender').textContent = character.gender;
  document.getElementById('origin').textContent = character.origin.name;
  document.getElementById('location').textContent = character.location.name;
  document.getElementById('episodes').textContent = character.episode.length;
}

// Footer Clock Function
function updateClock() {
  const now = new Date();
  const formattedTime = now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  document.getElementById('clock').textContent = formattedTime;
}

setInterval(updateClock, 1000);
loadPage('next');
loadCharacterDetail();
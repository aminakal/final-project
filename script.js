const form = document.getElementById('submit');
const search = document.getElementById('search');
const showAllBtn = document.getElementById('showAll');
const randomBtn = document.getElementById('random');
const clearBtn = document.getElementById('clear');
const resultHeading = document.getElementById('result-heading');
const mealsElement = document.getElementById('meals');

async function getBreeds() {
  try {
    const response = await fetch('breeds.json');
    const data = await response.json();
    return data.breeds;
  } catch (error) {
    console.error(error);
  }
}

function displayBreeds(breeds) {
  mealsElement.innerHTML = '';
  breeds.forEach(breed => {
    const breedElement = document.createElement('div');
    breedElement.classList.add('meal');
    breedElement.innerHTML = `
      <img src="${breed.image}" alt="${breed.name}">
      <div class="meal-info">
        <h3>${breed.name}</h3>
        <p>${breed.description}</p>
      </div>
    `;
    mealsElement.appendChild(breedElement);
  });
}

async function searchBreeds(e) {
  e.preventDefault();
  const term = search.value.trim().toLowerCase();
  const breeds = await getBreeds();
  const filteredBreeds = breeds.filter(breed =>
    breed.name.toLowerCase().includes(term)
  );
  displayBreeds(filteredBreeds);
  if (filteredBreeds.length === 0) {
    resultHeading.innerHTML = `<p>No results found for "${term}"</p>`;
  } else {
    resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;
  }
}

async function showAllBreeds() {
  const breeds = await getBreeds();
  displayBreeds(breeds);
  resultHeading.innerHTML = `<h2>All Cat Breeds:</h2>`;
}

function clearBreeds() {
  mealsElement.innerHTML = '';
  resultHeading.innerHTML = '';
}

async function getRandomBreed() {
  const breeds = await getBreeds();
  const randomIndex = Math.floor(Math.random() * breeds.length);
  const randomBreed = breeds[randomIndex];
  displayBreeds([randomBreed]);
  resultHeading.innerHTML = `<h2>Random Cat Breed:</h2>`;
}

form.addEventListener('submit', searchBreeds);
showAllBtn.addEventListener('click', showAllBreeds);
randomBtn.addEventListener('click', getRandomBreed);
clearBtn.addEventListener('click', clearBreeds);

// Initial load - clear breeds initially
clearBreeds();

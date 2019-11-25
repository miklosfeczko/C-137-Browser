const form = document.querySelector("form");
const input = document.getElementById("searchTerm");
const resultsSection = document.getElementById("results");

// NEXT PAGE BTN
const nextButton = document.getElementById("paging");
const backButton = document.getElementById("paging2");

// API URLS
const API_URL = `https://rickandmortyapi.com/api/character/`;
const ENDING_URL = `?page=`;

// ADDEVENTLISTENERS
form.addEventListener("submit", formSubmitted);
nextButton.addEventListener("click", nextPage);
backButton.addEventListener("click", backPage);

// GLOBAL VARIABLES
let pages = 1;
let currentPage = 1;
let searchParam;

async function formSubmitted(e) {
  e.preventDefault();
  searchParam = input.value;
  try {
    const results = await getResults();
    showResults(results);
  } catch (error) {
    showError(error);
  }
}

async function getResults() {
  pages = 1;
  currentPage = 1;
  const URL = `${API_URL}${ENDING_URL}${currentPage}&name=${searchParam}`;
  const response = await fetch(URL);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  pages = data.info.pages;
  document.getElementById("probatext").textContent = currentPage + "/" + pages;
  return data.results;
}

async function nextPage(e) {
  e.preventDefault();
  if (pages !== currentPage) {
    currentPage = currentPage + 1;
  }
  const URL = `${API_URL}${ENDING_URL}${currentPage}&name=${searchParam}`;
  const response = await fetch(URL);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  const results = data.results;
  document.getElementById("probatext").textContent = currentPage + "/" + pages;
  showResults(results);
}

async function backPage(e) {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage = currentPage - 1;
  }
  const URL = `${API_URL}${ENDING_URL}${currentPage}&name=${searchParam}`;
  const response = await fetch(URL);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  const results = data.results;
  document.getElementById("probatext").textContent = currentPage + "/" + pages;
  showResults(results);
}

function showResults(results) {
  resultsSection.innerHTML = "";
  let html = "";

  results.map(character => {
    html += `
    <div class="card">
      <img src="${character.image}" class="card-img-top" alt="${character.name}">
      <div class="card-body">
        <h5 class="card-title">${character.name}</h5>
        <p class="card-text">${character.location.name}</p>
        <p class="card-text">${character.species}</p>
        <p class="card-text">${character.status}</p>
      </div>
    </div>
    `;
  });
  resultsSection.innerHTML = html;
}

function showError(error) {
  resultsSection.innerHTML = `
  <div class="">
    ${error}
  </div>
  `;
}

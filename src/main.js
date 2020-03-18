import { pokemonCard, search } from './data.js';
import data from './data/pokemon/pokemon.js';
// Se crea una variable donde se va a insertar los resultados de las funciones.
const sectionContent = document.querySelector('.content');
//
//
// Obteniendo todos los pokemones y separando por generación
const allDataByGenerations = () => {
  //
  sectionContent.classList.remove('distribution-search');
  // Subtitulo Kanto
  const subKanto = document.createElement('div');
  subKanto.className = 'subtitles margin-bottom';
  subKanto.innerHTML = `
    <div class="arrow">
      <h2>Generacion I - Kanto</h2>
    </div>
    <div class="line hide"></div>
    `;
  sectionContent.appendChild(subKanto);
  // Subtitulo Johto
  const subJohto = document.createElement('div');
  subJohto.className = 'subtitles margin-bottom';
  subJohto.innerHTML = `
    <div class="arrow">
      <h2>Generacion II - Johto</h2>
    </div>
    <div class="line hide"></div>
    `;
  sectionContent.appendChild(subJohto);
  // Contenedor de pokemones Kanto
  const dataKanto = document.createElement('div');
  dataKanto.className = 'cards-distribution';
  // Contenedor de pokemones Kanto
  const dataJohto = document.createElement('div');
  dataJohto.className = 'cards-distribution';
  // Iterando la data, llamar a la funcion para crear las cards de cada pokemon e insertarlos al DOM
  for (let i = 0; i < data.pokemon.length; i += 1) {
    if (data.pokemon[i].generation.name === 'kanto') {
      dataKanto.innerHTML += pokemonCard(data.pokemon[i]);
    } else {
      dataJohto.innerHTML += pokemonCard(data.pokemon[i]);
    }
  }
  sectionContent.insertBefore(dataKanto, subJohto);
  sectionContent.appendChild(dataJohto);
};
//
//
//
// El evento que llama a la función que inserta todos los pokemones
window.addEventListener('load', () => {
  allDataByGenerations();
});
// Guardando input para buscar
const searchInput = document.querySelector('#filter-search');
//
// Evento del input que ejecuta la funcion search


searchInput.addEventListener('input', () => {
  const inputText = searchInput.value.toLowerCase();
  // Crear el contenedor con createElement para search
  const searchBox = document.createElement('div');
  // Agregar una clase a ese contenedor para que tenga su propio estilo.
  searchBox.classList.add('distribution-search');
  // Agrego el nuevo div al sctionContent con .appendChild 
  sectionContent.innerHTML = '';
  if (inputText === '') {
    allDataByGenerations();
  } else {
    data.pokemon.forEach((element) => {
      searchBox.innerHTML += search(element, inputText);
    });
  }
  // mensaje en caso que no se encuentre el pokemon
  if (searchBox.innerHTML === '') {
    searchBox.innerHTML += `
    No se ha encontrado el pokemon :(
  `;
  }
  sectionContent.appendChild(searchBox);
});
//
// Botón de subir
window.onscroll = () => {
  if (document.documentElement.scrollTop > 100) {
    document.querySelector('.go-top-container').classList.add('show');
  } else {
    document.querySelector('.go-top-container').classList.remove('show');
  }
};

document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

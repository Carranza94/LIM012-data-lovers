import {
  filterByGeneration,
  search,
  order,
  filterByType,
  stabMoves,
  dpsMoves,
  epsMoves,
  stabAttack,
  dpsAttack,
  epsAttack,
} from './data.js';
import data from './data/pokemon/pokemon.js';
//
const sectionContent = document.querySelector('.content');
const filterbox = document.getElementsByTagName('aside')[0];
const main = document.getElementsByTagName('main')[0];
// Barra de filtros
const btnFilter = document.getElementById('filter');
btnFilter.addEventListener('click', () => {
  if (btnFilter.checked === true) {
    main.classList.add('adapt');
    filterbox.classList.remove('hide-f');
  } else if (btnFilter.checked === false) {
    main.classList.remove('adapt');
    filterbox.classList.add('hide-f');
  }
});
const btnByType = document.getElementById('filter-by-type');
const subMenu = document.querySelector('.sub-menu');
btnByType.addEventListener('click', () => {
  if (btnByType.checked === true) {
    subMenu.classList.remove('hide-f');
  } else if (btnByType.checked === false) {
    subMenu.classList.add('hide-f');
  }
});
// Creando card de pokemon
const pokemonCards = (allPokemons) => {
  let dataPokemon = '';
  allPokemons.forEach((eachPokemon) => {
    const pokemon = `
    <div class="pokemon-card">
      <p class="pokemon-number left">${eachPokemon.num}</p>
      <img class="pokemon-image" src="${eachPokemon.img}">
      <p class="pokemon-name">${eachPokemon.name}</p> 
    </div>`;
    dataPokemon += pokemon;
  });
  return dataPokemon;
};

// Creando subtítulo de Generación
const generation = (geNumber, geName) => {
  const subtitle = document.createElement('div');
  subtitle.className = 'subtitles margin-bottom';
  subtitle.innerHTML = `
  <div class="arrow">
    <h2>Generacion ${geNumber} - ${geName}</h2>
  </div>
  <div class="line hide"></div>
  `;
  return subtitle;
};

// Obteniendo todos los pokemones y separando por generación
const allDataByGenerations = () => {
  sectionContent.innerHTML = '';
  // borrando el contenedor del filtrado
  sectionContent.classList.remove('show');
  // Creando sección Kanto
  sectionContent.appendChild(generation('I', 'Kanto'));
  const dataKanto = document.createElement('div');
  dataKanto.className = 'cards-distribution';
  // Creando e insertando cards de pokemones
  dataKanto.innerHTML += pokemonCards(filterByGeneration(data.pokemon, 'kanto'));
  sectionContent.appendChild(dataKanto);
  // Creando sección Johto
  sectionContent.appendChild(generation('II', 'Johto'));
  const dataJohto = document.createElement('div');
  dataJohto.className = 'cards-distribution';
  // Creando e insertando cards de pokemones
  dataJohto.innerHTML += pokemonCards(filterByGeneration(data.pokemon, 'johto'));
  sectionContent.appendChild(dataJohto);
};

// El evento que llama a la función que inserta todos los pokemones al iniciar la página
window.addEventListener('load', () => {
  allDataByGenerations();
});

// Guardando input para buscar
const searchInput = document.querySelector('#filter-search');

// Evento del input que ejecuta la funcion search
searchInput.addEventListener('input', () => {
  const inputText = searchInput.value.toLowerCase();
  // Crear el contenedor con createElement para search
  const searchBox = document.createElement('div');
  searchBox.classList.add('distribution-search');
  sectionContent.innerHTML = '';
  // Buscando pokemones
  const result = search(data.pokemon, inputText);
  if (inputText.length > 0 && result.length > 0) {
    searchBox.innerHTML += pokemonCards(result);
    sectionContent.appendChild(searchBox);
  } else if (inputText.length > 0 && result.length === 0) {
    searchBox.innerHTML += 'No se ha encontrado el pokemon :(';
    sectionContent.appendChild(searchBox);
  } else {
    allDataByGenerations();
  }
});

const selection = document.getElementById('selection');
selection.addEventListener('change', () => {
  const chosenOrder = selection.value;
  sectionContent.innerHTML = '';
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-distribution';
  // Llamando a la función para ordenar y crear las cards
  cardsContainer.innerHTML += pokemonCards(order(data.pokemon, chosenOrder));
  sectionContent.appendChild(cardsContainer);
  // Mostrando la data completo por generaciones como defecto
  if (chosenOrder === 'default') {
    allDataByGenerations();
  }
});

const filterBox = document.querySelector('.sub-menu');
filterBox.addEventListener('click', (e) => {
  const typeChose = e.target.id;
  sectionContent.innerHTML = '';
  const filterContainer = document.createElement('div');
  filterContainer.className = 'cards-distribution';
  // Llamar a la función para filtrar por tipo elegido
  filterContainer.innerHTML += pokemonCards(filterByType(data.pokemon, typeChose));
  sectionContent.appendChild(filterContainer);
});
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

const iconSearch = document.querySelector('.flaticon-lupa');
iconSearch.addEventListener('click', () => {
  searchInput.focus();
});

// searchInput.addEventListener('focusout', () => {
//   sectionContent.innerHTML = '';
//   allDataByGenerations();
// });
const attackModal = document.querySelector('.attacks');
const attackCard = (pokemon) => {
  let quickMovesContainer = '';
  let specialAttackContainer = '';
  pokemon['quick-move'].forEach((quickMoves, index) => {
    quickMovesContainer += `
      <ul>
        <li>Name: ${quickMoves.name}</li>
        <li>Type: ${quickMoves.type}</li>
        <li>Base-damage: ${quickMoves['base-damage']}</li>
        <li>${stabMoves(pokemon['quick-move'], pokemon.type, quickMoves.type)[index]}</li>
        <li>${dpsMoves(pokemon['quick-move'], stabMoves(pokemon['quick-move'], pokemon.type, quickMoves.type)[index])[index].toFixed(1)}</li>
        <li>${epsMoves(pokemon['quick-move'], pokemon['move-duration-seg'])[index].toFixed(1)}</li>
      </ul>
   `;
  });
  pokemon['special-attack'].forEach((attack, index) => {
    specialAttackContainer += `
      <ul>
        <li>${attack.name}</li>
        <li>${stabAttack(pokemon['special-attack'], pokemon.type, attack.type)[index]}</li>
        <li>${dpsAttack(pokemon['special-attack'], stabAttack(pokemon['special-attack'], pokemon.type, attack.type)[index])[index].toFixed(2)}</li>
        <li>${epsAttack(pokemon['special-attack'])[index].toFixed(2)}</li>
      </ul>
        `;
  });
  attackModal.innerHTML = `
    <div class="allAttack">
        <section class="pokemonId">${pokemon.num} - ${pokemon.name}</section>
        <div class="pokemon-screen">
            <div class="screen-border"></div>              
            <img src="${pokemon.img}">
        </div>
        <div class="stats-container">
            <h3>Stats</h3>
            <ul class= "name-stats">
                <li>Base-attack</li>
                <li>Base-defense</li>
                <li>Base-stamina</li>
                <li>max-cp</li>
                <li>max-hp</li>
            </ul>
            <ul class= "number-stats">
                <li>${pokemon.stats['base-attack']}</li>
                <li>${pokemon.stats['base-defense']}</li>
                <li>${pokemon.stats['base-stamina']}</li>
                <li>${pokemon.stats['max-cp']}</li>
                <li>${pokemon.stats['max-hp']}</li>
            </ul>
        </div>
        <div>
            <p class="subtitle">Resistant</p>
            <div id="resistant-container">
            </div>
            <p class="subtitle">Weakness</p>
            <div id="weaknesses-container">
            </div>
        </div>
        <div>
            <h3>Quick-moves</h3>
            ${quickMovesContainer}
        </div>
        <div>
            <h3>Special-attacks</h3>
            <div id="special-attacks">
                <div>Name</div>
                <div>Type</div>
                <div>Base-damage</div>
                <div>Energy</div>
                <div>move-duration-seg</div>
            </div>
            ${specialAttackContainer}
        </div>
  </div>
`;
  const resistant = document.getElementById('resistant-container');
  const weaknesses = document.getElementById('weaknesses-container');
  const quickMoves = document.getElementById('quick-move');
  const specialAttack = document.getElementById('special-attacks');

  pokemon.resistant.forEach((resist) => {
    resistant.innerHTML += `<span> ${resist}</span>`;
  });

  pokemon.weaknesses.forEach((weakness) => {
    weaknesses.innerHTML += `<span> ${weakness}</span>`;
  });
  /*
  pokemon['quick-move'].forEach((quick) => {
    quickMoves.innerHTML += `<span> ${quick.name}</span>`;
  });
  pokemon['quick-move'].forEach((quick) => {
    quickMoves.innerHTML += `<span> ${quick.type}</span>`;
  });
  pokemon['quick-move'].forEach((quick) => {
    quickMoves.innerHTML += `<span> ${quick['base-damage']}</span>`;
  });
  pokemon['quick-move'].forEach((quick) => {
    quickMoves.innerHTML += `<span> ${quick.energy}</span>`;
  });
  pokemon['quick-move'].forEach((quick) => {
    quickMoves.innerHTML += `<span> ${quick['move-duration-seg']}</span>`;
  });
  */
};
attackCard(data.pokemon[2]);
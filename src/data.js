const pokedex = {
  iteringByGenerations: (pokemons, generation) => {
    const generationArray = [];
    for (let i = 0; i < pokemons.length; i += 1) {
      if (pokemons[i].generation.name === generation) {
        generationArray.push(pokemons[i]);
      }
    }
    return generationArray;
  },
  // Creando card de pokemon
  pokemonCards: (allPokemons) => {
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
  },
  search: (dataP, inputText) => {
    const result = [];
    // buscando pokemones con las letras ingresadas
    dataP.forEach((eachPokemon) => {
      const namePokemon = eachPokemon.name;
      const lengthText = inputText.length;
      if (namePokemon.slice(0, lengthText) === inputText) {
        result.push(eachPokemon);
      }
    });
    return result;
  },
};
export default pokedex;

/*
// Obteniendo todos los pokemones y separando por generación
const pokedex = {
  showByGenerations: (pokemons, pokemonCard) => {
    const newArray = [];
  // Iterando la data, llamar a la funcion para crear las cards de cada pokemon e insertarlos al DOM
    for (let i = 0; i < pokemons.length; i += 1) {
      if (pokemons[i].generation.name === 'kanto') {
      dataKanto.innerHTML += pokemonCard(pokemons[i]);
      } else {
      dataJohto.innerHTML += pokemonCard(pokemons[i]);
      }
    }},

  showSearch: (inputText) => {
    sectionContent.innerHTML = '';
    if (inputText === '') {
      allDataByGenerations();
      sectionContent.removeChild(searchBox);
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
  return
  },
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
*/

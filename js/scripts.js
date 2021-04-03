/* eslint-disable no-undef */
/* eslint-disable no-console */
// IIFE for pokemonRepository
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  const searchInputSelection = document.querySelector('#search-option');
  
  searchInputSelection.addEventListener('input', () => {
    const allPokemonList = document.querySelectorAll('.list-group-item');
    const filterValue = searchInputSelection.value.toUpperCase();
    console.log(allPokemonList);

    allPokemonList.forEach((item) => {
      console.log(item.innerText);
      if (item.innerText.toUpperCase().indexOf(filterValue) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  function add(pokemon) {
    if (
      typeof pokemon === 'object'
        && 'name' in pokemon
        && 'urlDetail' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  // This functions allows interaction to take place on the web.
  function addListItem(pokemon) {
    const pokemonList = document.querySelector('.list-group');
    const listpokemon = document.createElement('li');
    listpokemon.classList.add('list-group-item');
    const button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-light');
    button.classList.add('btn-block');
    button.classList.add('btn-lg');
    button.classList.add('bg-link');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokedexModal');
    pokemonList.appendChild(listpokemon);
    listpokemon.appendChild(button);
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }
  // We are fetching information to all the pokemon listed.
  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            urlDetail: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
  // we are fetching formation from loadList
  function loadDetails(item) {
    const url = item.urlDetail;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        details.types.forEach((itemType) => {
          item.types.push(itemType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach((itemAbilities) => {
          item.abilities.push(itemAbilities.ability.name);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // Function is linked to AddListItem & called on addEventListner 'click'
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      const modalBody = $('.modal-body');
      const modalTitle = $('.modal-title');
      // let modalHeader = $('modal-header');

      // modalHeader.empty();
      modalTitle.empty();
      modalBody.empty();

      const pokemonName = $(`<h1>${pokemon.name}</h1>`);

      const pokemonImage = $('<img class="modal-img" style="width: 50%">');
      pokemonImage.attr('src', pokemon.imageUrl);

      const pokemonHeight = $(`${'<p>' + 'Height: '}${pokemon.height}</p>`);

      const pokemonAbility = $(`${'<p>' + 'ability: '}${pokemon.abilities}</p>`);

      const pokemonType = $(`${'<p>' + 'type: '}${pokemon.types}</p>`);

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonAbility);
      modalBody.append(pokemonType);
    });
  }

  // return is necessary in order push the resullts
  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
  };
}());
  // This generates the result from the code.
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemonOne) => {
    pokemonRepository.addListItem(pokemonOne);
  });
});

//IIFE for pokemonRepository
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let searchInputSelection = document.querySelector('#search-option');
    //console.log(searchInputSelection);
    searchInputSelection.addEventListener('input', function() {
      let allPokemonList = document.querySelectorAll('.group-list-item');
      let filterValue = searchInputSelection.value.toUpperCase();
      console.log(allPokemonList);
      
      allPokemonList.forEach(function(item){
        console.log(item.innerText);
        if(item.innerText.toUpperCase().indexOf(filterValue) > -1){
          item.style.display = '';
        }else{
          item.style.display = 'none';
        }
      })
    });
  
    function add(pokemon) {
      if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'urlDetail' in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log('pokemon is not correct');
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    //This functions allows interaction to take place on the web.
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.list-group');
      let listpokemon = document.createElement('li');
      listpokemon.classList.add('group-list-item');
      let button = document.createElement('button');
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
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }
    //We are fetching information to all the pokemon listed.
    function loadList() {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              urlDetail: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }
    //we are fetching formation from loadList
    function loadDetails(item) {
      let url = item.urlDetail;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = [];
          details.types.forEach(function(itemType){
            item.types.push(itemType.type.name);
          });
          item.abilities = [];
          details.abilities.forEach(function(itemAbilities){
            item.abilities.push(itemAbilities.ability.name);
          })
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    // Function is linked to AddListItem & called on addEventListner 'click'
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        //let modalHeader = $('modal-header');

        //modalHeader.empty();
        modalTitle.empty();
        modalBody.empty();
  
        let pokemonName = $('<h1>' + pokemon.name + '</h1>');
  
        let pokemonImage = $('<img class="modal-img" style="width: 50%">');
         pokemonImage.attr('src', pokemon.imageUrl);
       
  
        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');


        let pokemonAbility = $('<p>' + 'ability: ' + pokemon.abilities + '</p>');

        let pokemonType = $('<p>' + 'type: ' + pokemon.types + '</p>');

       modalTitle.append(pokemonName);
       modalBody.append(pokemonImage);
       modalBody.append(pokemonHeight);
       modalBody.append(pokemonAbility);
       modalBody.append(pokemonType);

      });
      
    }
  
    // return is necessary in order push the resullts
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  // This generates the result from the code.
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemonOne) {
      pokemonRepository.addListItem(pokemonOne);
    });
  });








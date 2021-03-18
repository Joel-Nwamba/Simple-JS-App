//IIFE for pokemonRepository
let pokemonRepository = (function(){
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
   
   function add(pokemon){
    if (typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
    ) {
     pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  } 
    }

    function getAll() {
        return pokemonList
    }


//This functions allows interaction to take place on the web.
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('class-button');
        pokemonList.appendChild(pokemonlist);
        listpokemon.appendChild(button);
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        })
     }
     function loadList() {
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json) {
           json.results.forEach(function(item){
               let pokemon = {
                   name: item.name,
                   urlDetail: item.url
               }
               add(pokemon);
               console.log(pokemon);
           });
        }).catch(function(e){
            console.error(e);
        })
    }
function loadDetails(){

}


// Function is linked to AddListItem & called on addEventListner 'click'
     function showDetails(pokemonOne) {
        console.log(pokemonOne);
     }

// return is necessary in order push the resullts
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList
    }
    

})();
// This generates the result from the code.
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemonOne){
        pokemonRepository.addListItem(pokemonOne);
    });
});








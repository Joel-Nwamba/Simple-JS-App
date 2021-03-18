//IIFE for pokemonRepository
let pokemonRepository = (function(){
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList
    }
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


//This functions allows interaction to take place on the web.
    function addListItem(pokemonOne){
        let pokemon = document.querySelector('.pokemon-list');
        let pokemonlist = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemonOne.name;
        button.classList.add('class-button');
        pokemon.appendChild(pokemonlist);
        pokemonlist.appendChild(button);
        button.addEventListener('click', function(event){
            showDetails(pokemonOne);
        })
     }
     function loadList() {
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json) {
           json.results.forEach(function(item){
               let pokemonApp = {
                   name: item.name,
                   urlDetail: item.url
               }
               add(pokemon)
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








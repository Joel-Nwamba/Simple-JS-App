//IIFE for pokemonRepository
let pokemonRepository = (function(){
   let pokemonList = [{
        name: 'Bulbasaur',
        height: 0.7,
        types:['grass', 'poison']
    },
    {
        name: 'Charizard',
        height: 1.7,
        types: ['Fire', 'Flying']
    },
    {
        name: 'Pikachu',
        height: 0.4,
        types: ['Electric']
    }];

    function getAll() {
        return pokemonList
    }
    function add(item){
        pokemonList.push(item)
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
// Function is linked to AddListItem & called on addEventListner 'click'
     function showDetails(pokemonOne) {
        console.log(pokemonOne);
     }
// return is necessary in order push the resullts
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
    

})();
// This generates the result from the code.
pokemonRepository.getAll().forEach(function(pokemonOne){
    pokemonRepository.addListItem(pokemonOne);
})







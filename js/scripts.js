//IIFE for pokemonRepository
let pokemonRepository = (function(){
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
   
   function add(pokemon){
    if (typeof pokemon === "object" &&
    "name" in pokemon &&
    "urlDetail" in pokemon
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
        pokemonList.appendChild(listpokemon);
        listpokemon.appendChild(button);
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        })
     }
     //We are fetching information to all the pokemon listed.
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
    //we are fetching formation from loadList
function loadDetails(item){
    let url = item.urlDetail;
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details){
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.type = details.types;
    }).catch(function(e){
        console.error(e);
    })
}

// Function is linked to AddListItem & called on addEventListner 'click'
     function showDetails(pokemon) {
         
        loadDetails(pokemon).then(function(){
             
            let modalContainer = document.querySelector('#modal-container');
             //clear modal
             modalContainer.innerHTML = '';

             //build modal by section 

             let detailModal = document.createElement('div');
             detailModal.classList.add('detail_modal');


             let pokemonName = document.createElement('h1');
             pokemonName.classList.add('modal_details--pokemon');
             pokemonName.innerText = pokemon.name;

             let pokemonImage = document.createElement('img');
             pokemonImage.classList.add('modal_image');
             pokemonImage.src = pokemon.imageUrl;

             let pokemonHeight = document.createElement('p');
             pokemonHeight.classList.add('modal_details--pokemon');
             pokemonHeight.innerText = 'height: ' + pokemon.height + ' m';

             let pokemonWeight = document.createElement('p');
             pokemonWeight.classList.add('modal_details--pokemon');
             pokemonWeight.innerText = 'weight: ' + pokemon.weight + ' kg';

             let pokemonType = document.createElement('p');
             pokemonType.classList.add('modal_details--pokemon');
             pokemonType.innerText = pokemon.types;

             let pokemonAbility = document.createElement('p');
             pokemonAbility.classList.add('modal_details--pokemon');
             pokemonAbility.innerText = pokemon.abilities

             let closeButton = document.createElement('button');
             closeButton.classList.add('modal-close');
             closeButton.innerText = 'Close';
             closeButton.addEventListener('click', hideModal);

             detailModal.appendChild(pokemonName);
             detailModal.appendChild(pokemonImage);
             detailModal.appendChild(pokemonHeight);
             detailModal.appendChild(pokemonWeight);
             detailModal.appendChild(pokemonWeight);
             detailModal.appendChild(pokemonType);
             detailModal.appendChild(pokemonAbility);
             detailModal.appendChild(closeButton);
             modalContainer.appendChild(detailModal);



             modalContainer.classList.add('is-visible');
             function hideModal() {
                let modalContainer = document.querySelector('#modal-container');
                modalContainer.classList.remove('is-visible');
            }
            window.addEventListener('keydown', (e) => {
                let modalContainer = document.querySelector('#modal-container');
                if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
                    hideModal();
                }
            });
            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                  hideModal();
                }
              });

         });
     };


    

// return is necessary in order push the resullts
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }
    

})();
// This generates the result from the code.
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemonOne){
        pokemonRepository.addListItem(pokemonOne);
    });
});








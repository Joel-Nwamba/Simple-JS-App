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

    return {
        getAll: getAll,
        add: add
    }
    

})();

pokemonRepository.getAll().forEach(function(list){
    document.write(list.name +  ' (' +  'height:' + list.height + ' )');
    if(list.height > 0.7 && list.height > 0.4){
        document.write('  -' + 'Wow that is big!');
    }
  document.write('<br />' + '<br />')
})







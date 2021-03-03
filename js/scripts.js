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

for(let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name +  ' (' +  'height:' + pokemonList[i].height + ' )');
    if(pokemonList[i].height > 0.7 && pokemonList[i].height > 0.4){
        document.write('  -' + 'Wow that is big!');
    }
  document.write('<br />' + '<br />')
}




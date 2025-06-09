function convertPokemonTypesToList(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToList(pokemon) {
    return `
    <li class="pokemon">
        <span class="number">${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
            ${convertPokemonTypesToList(pokemon.types).join('')}       
            </ol>

            <img src="${pokemon.sprites.other.dream_world.front_default}" 
            alt="${pokemon.name}">

        </div>                
    </li>
    `
}

const pokemonList = document.getElementById('PokemonList')

pokeApi.getPokemons().then((pokemons = []) => {

    const newHtml = pokemons.map(convertPokemonToList).join('')
    pokemonList.innerHTML = newHtml
})



const pokemonList = document.getElementById('PokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecord = 151
const limit = 16
let offset = 0;
let number = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" >
                <span class="number"><span class="number">#${pokemon.number.toString().padStart(3, '0')}</span></span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class ="type ${type}">${type}</li>`).join('')}       
                    <button class="buttonInfo" data-number="${pokemon.number}">Info</button>
                    
                    </ol>

                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">

                </div>                
            </li>
            `
        ).join('')
        pokemonList.innerHTML += newHtml
    })
}
loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () => { 
   
    const qtdRecordNextPage = offset + limit
    
    if (qtdRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)
        console.log(loadPokemonItens(offset, newLimit))

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

    
})

document.addEventListener('click',function(event){
    if(event.target.classList.contains('buttonInfo')) {
        pokeApi.getPokemonByNumber(number).then((pokemon)=>{
            console.log(pokemon)

            alert(
                `Nome: ${pokemon.name}\n`
                `Número: ${pokemon.number}\n`
                `Tipos(s): ${pokemon.type.join(',')}\n`
            )
        })
            
        }
    })


    



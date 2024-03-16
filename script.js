const pokemonList = document.getElementById('listagemPokemon') ;


const pokeApi = {}

var componentePokedex = (pokemon)=>{
  const [types, _ ] = pokemon.tipos;
  
  return( `<li class="pokemon ${types}">
              <div class="header">
                <h1 class="nome">${pokemon.nome}</h1>
                <span class="id">${pokemon.id}</span>
              </div>
              <div class="boxInfo">
                  <ul class="tipos">
                  ${pokemon.tipos.map(tipo=>`<li class="type">${tipo}</li>`).join('')}
                  </ul>
                  <img src="${pokemon.foto}" alt='>${pokemon.nome}'>
                </div>
              </div>
            </li> `
    )
}

pokeApi.dadosValidosPokemon = (dados)=>{
  const dadosValidado = {
    nome : dados.name,
    id : dados.id,
    foto : dados.sprites.other.dream_world.front_default,
    tipos : dados.types.map((typeSlot) => typeSlot.type.name)
  }
  pokemonList.innerHTML += componentePokedex(dadosValidado);
  console.log(dadosValidado);
}
 
 
let buscarPokemon = (pokemon) => {
   fetch(pokemon.url)
        .then((response) => response.json())
        .then(resultado=> pokeApi.dadosValidosPokemon(resultado))
        .catch(err => console.error(err))
}

 
pokeApi.getPokemon =  (offset = 0,limit = 50 )=>{
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

   fetch(URL)
        .then((response) => response.json())
        .then(pokemon => pokemon.results)
        .then(pokemonDados=>{ 
          pokemonDados.map(dados=>buscarPokemon(dados))
         })
        
        .catch(err => console.error(err))  
       
 }
 
  pokeApi.getPokemon();
 
 
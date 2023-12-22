const nomePokemon = document.querySelector('.nome-pokemon');
const numPokemon = document.querySelector('.numero-pokemon');
const gifPokemon = document.querySelector('.pokemon-image');
const tipoPokemon = document.querySelector('.tipo-pokemon');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const botao_prev = document.querySelector('.botao-prev');
const botao_next = document.querySelector('.botao-next');

let searchPokemon = 1;

const procurarPokemon = async(pokemon) => {
    const APIresposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIresposta.status == 200){
       const dados = await APIresposta.json()
       return dados; 
    }
}

const renderizarPokemon = async(pokemon) => {
    nomePokemon.innerHTML = 'Searching...'
    numPokemon.innerHTML = ''
    tipoPokemon.innerHTML = ''

    const dados = await procurarPokemon(pokemon);

    if(dados){
        gifPokemon.style.display = 'block'
        nomePokemon.innerHTML = dados.name;
        numPokemon.innerHTML = dados.id;
        tipoPokemon.innerHTML = dados.types.map(typeInfo => typeInfo.type.name);
        gifPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = '';
        searchPokemon = dados.id
        
    }

    else{
        gifPokemon.style.display = 'none'
        nomePokemon.innerHTML = 'Sorry, not found'
        numPokemon.innerHTML = ''

    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderizarPokemon(inputSearch.value);
})

botao_prev.addEventListener('click', (event) => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderizarPokemon(searchPokemon)
    }
})

botao_next.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderizarPokemon(searchPokemon) 

})
renderizarPokemon(searchPokemon)
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('DOMContentLoaded', (event) => {
    loadTrainers();
});

function loadTrainers(){
    fetch("http://localhost:3000/trainers")
    .then(resp => resp.json())
    .then (resp => {
        Array.from(resp).forEach( el => addTrainersToDOM(el))
        })
}

function addTrainersToDOM(trainer){
    const mainEl = document.getElementsByTagName("main")[0]

    const div = document.createElement("div")
    div.setAttribute("data-id",`${trainer.id}`)
    div.setAttribute("class","card")
    div.innerHTML = `<p>${trainer.name}</p>`

    const button = document.createElement("button")
    button.setAttribute("data-trainer-id",`${trainer.id}`)
    button.innerText= "Add Pokemon"
    button.addEventListener("click", e => {
        e.stopPropagation
        addPokemon(trainer)}) ;
    div.appendChild(button)

    addPokemonToTrainer(div,trainer)

    mainEl.appendChild(div);
}

function addPokemonToTrainer(div, trainer){
    const ul = document.createElement("ul")
    trainer.pokemons.forEach ( pokemon => addPokemonToList(ul , pokemon))
    div.appendChild(ul)
}

function addPokemonToList(ul ,pokemon){
    const li = document.createElement("li")
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    const button = document.createElement("button")
    button.innerText = "Release"
    button.addEventListener("click", e => {
        e.stopPropagation
        removePokemon(pokemon)
        e.target.parentElement.remove()
    }) ;
    button.setAttribute("class","release")
    button.setAttribute("data-pokemon-id",`${pokemon.id}`)
    li.appendChild(button)
    ul.appendChild(li)
} 

function addPokemon(trainer){

    let formData = {
        trainer_id: trainer.id
      };
       
    let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
    };
       
    fetch("http://localhost:3000/pokemons",configObj)
    .then(function(response) {
        return response.json();
    })
      .then(function(object) {
          if (object.message) { 
            alert (object.message.custom_error)
          } else {
            const ul = document.querySelector(`div[data-id="${trainer.id}"] ul`)
            addPokemonToList(ul ,object)}
        })
}

function removePokemon(pokemon){
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
method: "DELETE"
})
}
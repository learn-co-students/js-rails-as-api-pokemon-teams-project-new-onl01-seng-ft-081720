const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function () {
    loadTrainersAndPokemons();

});

function loadTrainersAndPokemons() {
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(results => results.forEach(trainer => createTrainerCard(trainer)))
};

function createTrainerCard(trainer) {
    // Select main div
    let mainDiv = document.querySelector("main");

    // Create trainer div and append to main div
    let newTrainerDiv = document.createElement('div');
    newTrainerDiv.classList.add("card");
    newTrainerDiv.setAttribute("data-id", `${trainer.id}`);
    mainDiv.appendChild(newTrainerDiv);

    // Create paragraph and append to trainer div
    let newTrainerParagraph = document.createElement('p');
    newTrainerParagraph.innerText = `${trainer.name}`;
    newTrainerDiv.appendChild(newTrainerParagraph);

    // Create add pokemon button
    let newAddButton = document.createElement('button');
    newAddButton.addEventListener('click', function(event){
        createRandomPokemonFor(event);
    })
    newAddButton.setAttribute("data-trainer-id", `${trainer.id}`);
    newAddButton.innerText = "Add Pokemon";
    newTrainerDiv.appendChild(newAddButton);

    // List all trainer pokemon
    let newPokemonList = document.createElement('ul');
    newTrainerDiv.appendChild(newPokemonList);
    trainer.pokemons.forEach(function(pokemon) {
        let newListItem = document.createElement('li');
        newListItem.innerHTML = `${pokemon.nickname} (${pokemon.species}) `;
        newPokemonList.appendChild(newListItem);

        let releaseButton = document.createElement('button');
        releaseButton.classList.add('release');
        releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`);
        releaseButton.innerText = "Release";
        releaseButton.addEventListener('click', function(event) {
            deletePokemon(event);
        })
        newListItem.appendChild(releaseButton)
    });
}

function createRandomPokemonFor(event) {
    let trainerId = parseInt(event.target.parentElement.attributes[1].value)
    let pokemonList = event.target.nextElementSibling
    fetch(`http://localhost:3000/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
      })
      .then(res => res.json())
      .then((pokemon) => {
        let newListItem = document.createElement('li');
        newListItem.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`;
        pokemonList.appendChild(newListItem);
      })
      .catch(function(error) {
          console.log(error)
      })
}

function deletePokemon(event) {
    let pokemonId = parseInt(event.target.attributes[1].value);
    fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
    })
    event.target.parentElement.remove();
};
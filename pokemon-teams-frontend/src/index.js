const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainElem = document.getElementsByTagName('main')[0]

window.addEventListener('DOMContentLoaded', () => {
    displayTrainers()
})

function addPokemonBtnListener(button, trainer) {
    button.addEventListener("click", function(e) {
        e.preventDefault()
        if (trainer.pokemons.length < 6) {
            addPokemon(trainer)
        } else {
            console.log('no pokemon for you!')
        }
        
        
    })
}

function addReleaseBtnListener(button) {
    button.addEventListener('click', function(e) {
        e.preventDefault()
        const id = parseInt(button.dataset.pokemonId)
        const li = button.parentElement
        removePokemon(id)
        li.remove()
    })
}

function removePokemon(id) {
    fetch(`http://localhost:3000/pokemons/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: id,
    })
}

function addPokemon(trainer) {
    fetch('http://localhost:3000/pokemons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainer),
    })
    .then(resp => resp.json())
    .then(data => {
        renderPokemon(data)
    })
}

function renderPokemon(pokemon) {
    const card = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
    const ul = card.querySelector('UL')

    const li = document.createElement("LI")
    const button = document.createElement("BUTTON")

    setAttributes(button, {"class": "release", "data-pokemon-id": `${pokemon.id}`})
    addReleaseBtnListener(button)
    
    button.innerText = "Release"
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    li.appendChild(button)
    ul.appendChild(li)
}

function displayTrainers() {
    fetch(`${TRAINERS_URL}`)
        .then(resp => resp.json())
        .then(json => {
            renderTrainer(json)
        })
}

function renderTrainer(trainers) {
    for(const trainer of trainers) {
        const card = createTrainerCard(trainer)
        const ul = card.children[1]
        for(const pokemon of trainer.pokemons) {
            const li = document.createElement("LI")
            const button = document.createElement("BUTTON")

            setAttributes(button, {"class": "release", "data-pokemon-id": `${pokemon.id}`})
            addReleaseBtnListener(button)
            
            button.innerText = "Release"
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            li.appendChild(button)
            ul.appendChild(li)
        }
        card.appendChild(ul)
        mainElem.appendChild(card)
    }
}

function createTrainerCard(trainer) {
    const card = document.createElement('DIV')
    const button = document.createElement('BUTTON')
    const ul = document.createElement('UL')

    setAttributes(card, {"class": "card", "data-id": `${trainer.id}`})
    card.innerText = `${trainer.name}`
    setAttributes(button, {"data-trainer-id": `${trainer.id}`})
    button.innerText = 'Add Pokemon'
    addPokemonBtnListener(button, trainer)

    card.appendChild(button)
    card.appendChild(ul)
    return card
}

function setAttributes(elem, attrs) {
    for(var key in attrs) {
      elem.setAttribute(key, attrs[key]);
    }
}
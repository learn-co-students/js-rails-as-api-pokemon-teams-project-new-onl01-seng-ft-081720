const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainContainer = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
    getTrainers()
})

function getTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
        for (const trainer of trainers) {
            renderTrainers(trainer)
        }
    })
}

function renderTrainers(trainer) {
    let div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', `${trainer.id}`)

    let p = document.createElement('p')
    p.innerText = `${trainer.name}`

    let addBtn = document.createElement('button')
    addBtn.setAttribute('data-trainer-id', `${trainer.id}`)
    addBtn.innerText = "Add Pokemon"
    addBtn.addEventListener('click', (e) => {
        addPokemon(e)
    })

    let ul = document.createElement('ul')

        for (const pokemon of trainer.pokemon) {
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    let releaseBtn = document.createElement('button')
    releaseBtn.innerText = "Release"
    releaseBtn.setAttribute('class', 'release')
    releaseBtn.setAttribute('data-pokemon-id', `${pokemon.id}`)
    releaseBtn.addEventListener('click', (e) => {
        removePokemon(e)
    })
    li.appendChild(releaseBtn)
    ul.appendChild(li)
    }

    div.appendChild(p)
    div.appendChild(addBtn)
    div.appendChild(ul)
    mainContainer.appendChild(div)
}

function removePokemon(e) {
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
        method: 'DELETE'
    })
    .then(window.location.reload())
}

function addPokemon(e) {
    const trainerId = e.target.dataset.trainerId
    data = {trainer_id: trainerId}
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(window.location.reload())
        
    }


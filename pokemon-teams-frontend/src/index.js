const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => loadTrainers())

const loadTrainers = () => {
    fetch (TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))
    })
}

const renderTrainer = (trainerHash) => {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const btn = document.createElement("button")
    const ul = document.createElement("ul")

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerHash.id)
    p.innerHTML = trainerHash.name
    btn.setAttribute("data-trainer-id", trainerHash.id)
    btn.innerHTML = "Add Pokemon"
    btn.addEventListener("click", createPokemon)

    div.appendChild(p)
    div.appendChild(btn)
    div.appendChild(ul)

    main.appendChild(div)
    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const btn = document.createElement("button")

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    btn.setAttribute("button", "release")
    btn.setAttribute("data-pokemon-id", pokemon.id)
    btn.innerHTML = "Release"
    btn.addEventListener("click", deletePokemon)

    li.appendChild(btn)
    ul.appendChild(li)
}

const createPokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
        if (json.message) {
            alert(json.message)
        } else {
            renderPokemon(json)
        }
    })
}

const deletePokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
    e.target.parentElement.remove()
}
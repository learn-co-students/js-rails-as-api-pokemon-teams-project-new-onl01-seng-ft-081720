const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
    console.log("Hey Hey")
    // pokemonFetch = fetchDataWithBaseUrl(POKEMONS_URL)
    fetchDataWithBaseUrl(TRAINERS_URL)

})



function teamFull(num){
    if (num >=7){
        return true
    } else {
        return false
    }
}

function fetchDataWithBaseUrl(url){
    fetch(url)
    .then(resp => resp.json())
    .then(obj => renderTeamCards(obj))
}

function renderTeamCards(trainers){
    const container = document.querySelector("main")

    trainers.forEach(function(trainer){
        const div = document.createElement("div")
        const addBtn = document.createElement("button")
        addBtn.className = "add-button"
        addBtn.addEventListener("click", function(e){
            addPokemon(e)

        })
        addBtn.innerText = "Add Pokemon"
        div.appendChild(addBtn)
        const ul = document.createElement("ul")
        
        div.classList.add("card")
        div.id = trainer.id
        container.appendChild(div)
        div.appendChild(ul)

        trainer.pokemons.forEach(function(pokemon){
            const li = document.createElement("li")
            const rlsBtn = document.createElement("button")
            rlsBtn.innerText = "Release"
            rlsBtn.className = "release"

            
            li.innerText = pokemon.nickname
            li.appendChild(rlsBtn)
            document.getElementById(`${trainer.id}`).children[1].appendChild(li)
            
            rlsBtn.addEventListener("click", function(e){
                // How else to get the event params over to a helper function?
                releasePokemon(e)
            })
        })
    })
}

function releasePokemon(event){

    event.currentTarget.parentNode.remove()
    // event.currentTarget.parentNode.removeChild(event.currentTarget)
    console.log(event)
}

function addPokemon(event){
    
    const trainer_id = event.currentTarget.parentElement.id
    fetch(POKEMONS_URL).then(resp => resp.json()).then(obj => console.log(obj))
    
    
}



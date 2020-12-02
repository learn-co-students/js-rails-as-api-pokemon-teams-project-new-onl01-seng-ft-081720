// fetch urls
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName('main')
// get elements


window.addEventListener('DOMContentLoaded', () => {
  retrieveTrainers();
})

function retrieveTrainers() {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    // .then(trainer => {
    //   for (const trainers of trainer) {
    //     debugger
    //     showTrainers(trainers)
    //   }
    // })
    .then(trainer => {
      showTrainers(trainer)
    })
}

function showTrainers(trainer) {
  
  let p = document.createElement('p')
  p.innerText = `${trainer.name}`

  let addBtn = document.createElement('button')
  addBtn.setAttribute('data-trainer-id', `${trainer.id}`)
  addBtn.innerText = "Add Pokemon"
  addBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (trainer.pokemons.length < 6) {
      addPokemon(event)
    } else {
      console.log("You don't have any Pokemon!")
    }
    
  })

  let ul = document.createElement('ul')

  for(const pokemon of trainer.pokemons) {
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} - ${pokemon.species}`

    let releaseButton = document.createElement('button')
    releaseButton.setAttribute('class', 'release')
    releaseButton.setAttribute('data-pokemon-id', pokemon.id )
    releaseButton.innerText = 'Release'
    releaseButton.addEventListener('click', (event) => {
      removePokemon(event)
    })
    li.appendChild(releaseButton)
    ul.appendChild(li)
  }

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.setAttribute('data-id', `${trainer.id}`)
  divCard.appendChild(p, addBtn, ul)
  main.appendChild(divCard)
  return divCard
}

function addPokemon(event) {
  const trainerId = event.target.dataset.trainerId
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

function removePokemon(event) {
  fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
      method: 'DELETE'
  })
  .then(window.location.reload())
}

// used to trouble shoot 500 error
// (response) => {
//   // console.log(resp)
//   // if(resp.ok) {
//   //   return resp.json();
//   // }
//   if (response.status === 500) {
//     return response.json() // return the result of the inner promise, which is an error
//     .then((json) => {
//       const { message, stackTrace } = json;
//       throw new ServerException(message, stackTrace);
//     });
//   } else {
//     return response.json();
//   }
// })
// function displayTrainers(trainer_data) {
//   fetch(TRAINERS_URL, {
//     method: 'POST',
//     headers: {
//       "Content-Type": 'application/json',
//       "Accept": 'application/json'
//     },
//     body: JSON.stringify({
//       'name': `${trainer_data}`
//     })
//   })
//   .then(resp => resp.json())
//   // .then(trainer_obj => {
//   //   let new_trainer = showTrainers(trainer_obj)
//   //   main.append(new_trainer)
//   // })
// }

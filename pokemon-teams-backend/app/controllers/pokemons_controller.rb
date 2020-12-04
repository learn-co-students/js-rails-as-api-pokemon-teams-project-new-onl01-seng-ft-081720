class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        # render json: pokemons, except: [:created_at, :updated_at]
        render json: pokemons, except: [:created_at, :updated_at], include: [:trainer]
    end

    def show
        pokemon = Pokemon.find_by(params[:id])
        # render json: {id: pokemon.id, species: pokemon.species, nickname: pokemon.nickname, trainer_id: pokemon.trainer_id}
        render json: pokemon, except: [:created_at, :updated_at]
    end


end

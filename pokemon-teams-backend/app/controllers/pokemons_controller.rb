class PokemonsController < ApplicationController

    def index
        pokemon = Pokemon.all 
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def create
        pokemon = Pokemon.create(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
            trainer: Trainer.find(params[:trainer_id])
        )
        
    end

    def destroy
        @pokemon = Pokemon.find_by(id: params[:id])
        @pokemon.destroy
    end
end

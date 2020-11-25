class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon.to_json(:include => {
          :trainer => {:only => [:name]}
        }, :except => [:updated_at, :created_at])
    end

    def create 
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.length < 6
            trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
            trainer.save
            new_pokemon = trainer.pokemons.last
            render json: new_pokemon.to_json(:except => [:updated_at, :created_at])
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        head :no_content
    end
end

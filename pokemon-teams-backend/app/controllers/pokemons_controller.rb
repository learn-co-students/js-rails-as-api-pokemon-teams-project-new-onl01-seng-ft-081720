class PokemonsController < ApplicationController

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params['id'])
        if pokemon.save
            render json: pokemon
        else
            'NOPE!'
        end
    end

    def destroy
        id = params['id'].to_i
        pokemon = Pokemon.find_by(id: id)
        pokemon.destroy
    end
end

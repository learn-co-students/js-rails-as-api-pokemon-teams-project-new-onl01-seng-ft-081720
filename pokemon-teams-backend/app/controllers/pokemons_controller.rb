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
    if pokemon.save
      render json: pokemon
    else
      'Sorry not today!'
    end

  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def destroy
    @pokemon = Pokemon.find_by(id: params[:id])
    @pokemon.destroy
  end

end

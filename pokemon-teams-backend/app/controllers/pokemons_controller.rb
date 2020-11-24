class PokemonsController < ApplicationController
  def create
    data = {
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name,
      trainer_id: params[:trainer_id],
    }
    pokemon = Pokemon.new(data)
    if pokemon.save && pokemon.valid?
      render json: pokemon
    else
      render json: { message: pokemon.errors.messages }
    end
  end

  def destroy
    pokemon = Pokemon.find_by_id(params[:id])
    pokemon.destroy
  end
end

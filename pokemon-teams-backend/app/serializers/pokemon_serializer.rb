class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :species
  belongs_to :trainer

  def initilize(pokemon_object)
    @pokemon = pokemon_object
  end

  def to_serialized_json
    options = {
             except: [:created_at, :updated_at]
         }
    @pokemon.to_json(options)
  end
end

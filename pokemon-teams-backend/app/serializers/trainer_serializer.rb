class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :updated_at
  @trainer = []
  
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
      options = {
          include: {
              pokemons: {
                  except: [:created_at, :updated_at]
              }
          },
          except: [:created_at, :updated_at]
      }
      @trainer.to_json(options)
  end
end

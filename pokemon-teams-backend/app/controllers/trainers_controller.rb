class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end

  # def create

  # end
  
  def show
    trainer = Trainer.find(params[:id])
    options = {
      include: [:pokemons]
    }
    render json: TrainerSerializer.new(trainer, options)
  end

end

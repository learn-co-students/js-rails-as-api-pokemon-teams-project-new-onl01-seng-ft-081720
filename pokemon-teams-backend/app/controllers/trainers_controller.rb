class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers.to_json(include: { pokemons: { except: [:updated_at, :created_at] } }, except: [:updated_at, :created_at])
  end
end

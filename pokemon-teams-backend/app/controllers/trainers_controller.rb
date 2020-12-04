class TrainersController < ApplicationController



    def index
        trainers = Trainer.all
        # render json: {id: trainer.id, name: trainer.name, pokemons: trainer.pokemons}
        render json: trainers, include: [:pokemons]
    end

    def show
        trainer = Trainer.find_by_id(params[:id])
        pokemons = trainer.pokemons
        render json: {trainer: trainer, team: pokemons}
    end


end

class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    fix_number
  end

  def fix_number
    errors.add(:custom_error, "Sorry! You can only have 6 pokemon") if self.trainer.pokemons.size >= 6
  end
end

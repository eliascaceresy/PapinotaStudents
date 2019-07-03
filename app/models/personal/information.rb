class Personal::Information < ApplicationRecord
  belongs_to :student

  validates :student, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :identification_number, presence: true, uniqueness: true

  def full_name
    "#{first_name} #{last_name}"
  end
end

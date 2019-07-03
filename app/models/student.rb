class Student < ApplicationRecord
  include StudentSearchable

  has_one :personal_information,
          class_name: "Personal::Information",
          foreign_key: "student_id",
          dependent: :destroy,
          inverse_of: :student

  accepts_nested_attributes_for :personal_information,
                                reject_if: :all_blank,
                                allow_destroy: false

  validates :personal_information, presence: true
  validates :list_number, presence: true, uniqueness: true, numericality: { only_integer: true }
end

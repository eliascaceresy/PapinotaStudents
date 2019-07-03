class CreatePersonalInformation < ActiveRecord::Migration[5.2]
  def change
    create_table :personal_information do |t|
      t.string :first_name
      t.string :last_name
      t.string :identification_number
      t.references :student, foreign_key: true

      t.timestamps
    end
  end
end

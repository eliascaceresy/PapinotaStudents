require 'rails_helper'

RSpec.describe Student, type: :model do
  describe "Associations" do
    it "should have one personal_information" do
      should have_one(:personal_information).class_name("Personal::Information").with_foreign_key("student_id")
    end
    it "should accepts nested attributes for personal_information" do
      should accept_nested_attributes_for(:personal_information)
    end
  end

  describe "Validations" do
    it "should validate presence of list_number" do
      should validate_presence_of(:list_number)
    end
    it "should validate uniqueness of list_number" do
      should validate_uniqueness_of(:list_number)
    end
    it "should validate numericality of list_number" do
      should validate_numericality_of(:list_number).only_integer
    end
  end
end

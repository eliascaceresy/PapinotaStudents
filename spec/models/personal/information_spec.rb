require 'rails_helper'

RSpec.describe Personal::Information, type: :model do
  describe "Associations" do
    it "should belong to student" do
      should belong_to(:student)
    end
  end

  describe "Validations" do
    it "should validate presence of student" do
      should validate_presence_of(:student)
    end
    it "should validate presence of first_name" do
      should validate_presence_of(:first_name)
    end
    it "should validate presence of last_name" do
      should validate_presence_of(:last_name)
    end
    it "should validate presence of identification_number" do
      should validate_presence_of(:identification_number)
    end
    it "should validate uniqueness of identification_number" do
      should validate_uniqueness_of(:identification_number)
    end
  end
end

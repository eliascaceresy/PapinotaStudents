FactoryBot.define do
  factory :student do
    list_number { Random.rand(10000) }
    personal_information_attributes { FactoryBot.attributes_for(:personal_information) }
  end
end

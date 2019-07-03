FactoryBot.define do
  factory :student do
    list_number { Random.rand(10000) }
  end
end

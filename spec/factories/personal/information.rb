FactoryBot.define do
  factory :personal_information, class: 'Personal::Information' do
    first_name { "MyString" }
    last_name { "MyString" }
    identification_number { "MyString" }
    student { nil }
  end
end

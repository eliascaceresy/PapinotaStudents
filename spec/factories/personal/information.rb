FactoryBot.define do
  factory :personal_information, class: 'Personal::Information' do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    identification_number { FFaker::IdentificationESCL.rut }
  end
end

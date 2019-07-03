module StudentSearchable
  extend ActiveSupport::Concern

  included do
    include Searchable

    settings ELASTIC_SETTINGS_OPTIONS do
      mappings dynamic: "false" do
        indexes :id, type: :integer
        indexes :list_number, type: :integer
        indexes :personal_information, type: :object do
          indexes :first_name, type: :text, analyzer: :full_name
          indexes :last_name, type: :text, analyzer: :full_name
          indexes :full_name, type: :text, analyzer: :full_name
          indexes :identification_number, type: :text, analyzer: :rut
        end
      end
    end
  end

  def as_indexed_json(*)
    student = {
      id: id,
      list_number: list_number,
      personal_information: {
        first_name: personal_information&.first_name,
        last_name: personal_information&.last_name,
        full_name: personal_information&.full_name,
        identification_number: personal_information&.identification_number
      }
    }

    student.as_json
  end
end

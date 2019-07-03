require "elasticsearch/model"
require "elasticsearch/transport"
require 'active_record'

# ActiveRecord::Base.logger = ActiveSupport::Logger.new(STDOUT)
ActiveRecord::Base.establish_connection( adapter: 'postgresql', database: "papinotas_students_#{Rails.env}" )

Elasticsearch::Model.settings[:inheritance_enabled] = true

Elasticsearch::Model::Indexing::ClassMethods.module_eval do
  def update_mapping!(options={})
    # target_index = options.delete(:index) || self.index_name
    self.create_index! force: true unless index_exists?(index: self.index_name)
    self.client.indices.put_mapping index: self.index_name,
                                    type: self.document_type,
                                    body: self.mappings.to_hash
  end
end

ELASTIC_SETTINGS_OPTIONS = {
  analysis: {
    char_filter: {
      remove_points: { type: "mapping", mappings: [".=>"] }
    },
    analyzer: {
      full_name: { type: "standard", filter: ["lowercase", "asciifolding"]},
      rut: { tokenizer: "standard", char_filter: ["remove_points"], filter: ["lowercase"] }
    }
  }
}

Elasticsearch::Model.client = Elasticsearch::Client.new({
  host: Rails.application.config.elastic_server,
  log: false
})

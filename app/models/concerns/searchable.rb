module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model

    # ES callbacks
    after_commit on: :create do
      index_document if !respond_to?(:should_index?) || should_index?
    end

    after_commit on: :update do
      index_document
    end

    after_commit on: :destroy do
      delete_document
    end

    def self.format_class_name
      base_class.name.downcase.gsub("::", "-")
    end

    def self.index_name
      "#{base_class.name.downcase.gsub('::', '-').pluralize}-#{Rails.env}"
    end

    def self.create_index
      __elasticsearch__.create_index! force: true
    end

    def self.inrefresh
      __elasticsearch__.update_mapping!
      __elasticsearch__.import type: format_class_name, batch_size: 100
    end

    def self.query(query)
      __elasticsearch__.search(query)
    end

    def self.delete_index!
      __elasticsearch__.delete_index!
    end

    base_class.__elasticsearch__.document_type format_class_name
    base_class.__elasticsearch__.index_name index_name
  end

  def base_object
    if respond_to?(:type)
      becomes(type.constantize.base_class)
    else
      self
    end
  end

  def delete_document
    base_object.__elasticsearch__.delete_document
  end

  def index_document
    base_object.__elasticsearch__.index_document
  end
end

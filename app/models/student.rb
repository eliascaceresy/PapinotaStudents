class Student < ApplicationRecord
  include StudentSearchable

  has_one :personal_information,
          class_name: "Personal::Information",
          foreign_key: "student_id",
          dependent: :destroy,
          inverse_of: :student

  accepts_nested_attributes_for :personal_information, allow_destroy: false

  validates :list_number, presence: true, uniqueness: true, numericality: { only_integer: true }

  def self.import(file_path)
    students_errors = []
    spreadsheet = Roo::Spreadsheet.open(file_path)
    header = spreadsheet.row(7)
    (8..spreadsheet.last_row).map do |i|
      student_attributes = {
        list_number: spreadsheet.row(i)[0],
        personal_information_attributes: {
          first_name: spreadsheet.row(i)[1],
          last_name: spreadsheet.row(i)[2],
          identification_number: spreadsheet.row(i)[3]
        }
      }
      student = Student.new(student_attributes)
      unless student.save
        students_errors << {student: student_attributes, errors: student.errors}
      end
    end

    return students_errors
  end

  def self.valid_file?(file)
    extension = File.extname(file.original_filename)
    return false unless [".csv", ".xls", ".xlsx"].include?(extension)
    return true
  end
end

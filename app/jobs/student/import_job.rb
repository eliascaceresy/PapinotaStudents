class Student::ImportJob < ApplicationJob
  queue_as :high_priority

  def perform(file_path, user_email)
    students = Student.import(file_path)
    FileUtils.rm file_path
    StudentMailer.notify_result_import(user_email, students).deliver_now
  end
end

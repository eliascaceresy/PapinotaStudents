class Student::ExportJob < ApplicationJob
  queue_as :high_priority

  def perform(*args)
    StudentMailer.send_report_to_user(args[0]).deliver_later
  end
end

require 'rails_helper'

RSpec.describe Student::ImportJob, type: :job do
  describe "#perform_later" do
    it "import students" do
      ActiveJob::Base.queue_adapter = :test
      expect {
        Student::ImportJob.perform_later("spec/tmp/Nomina Estudiantes.xlsx", FFaker::Internet.email)
      }.to have_enqueued_job.on_queue("high_priority")
    end
  end
end

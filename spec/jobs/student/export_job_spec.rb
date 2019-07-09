require 'rails_helper'

RSpec.describe Student::ExportJob, type: :job do

  describe "#perform_later" do
    it "export students" do
      ActiveJob::Base.queue_adapter = :test
      expect {
        Student::ExportJob.perform_later(FFaker::Internet.email)
      }.to have_enqueued_job.on_queue("high_priority")
    end
  end

end

require 'rails_helper'

RSpec.describe Api::StudentsController, type: :controller do
  describe "POST #create" do
    context "when student is valid" do
      let(:student_attributes) { FactoryBot.attributes_for(:student)}
      let(:expected_response) {
        expect(response).to have_http_status 201
      }

      it "should create student and respond with success" do
      end
    end

    after :each do
      post :create, format: :json, params: { student: student_attributes }
      expected_response
    end
  end

end

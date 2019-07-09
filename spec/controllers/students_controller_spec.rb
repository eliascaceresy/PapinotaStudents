require 'rails_helper'

RSpec.describe StudentsController, type: :controller do
  describe "GET #index" do
    context "when user access to index" do
      let(:expected_response) {
        expect(response).to have_http_status 200
        expect(response).to render_template "index"
      }

      it "should respond with success" do
      end
    end

    after :each do
      get :index
      expected_response
    end
  end
end

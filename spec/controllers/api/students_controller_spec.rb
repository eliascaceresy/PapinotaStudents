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

  describe "PATCH #update" do
    context "when student is valid" do
      let(:student) { FactoryBot.create(:student) }
      let(:new_student_attributes) { FactoryBot.attributes_for(:student)}
      let(:expected_response) {
        student.reload
        expect(response).to have_http_status 200
        expect(student.list_number).to eq new_student_attributes[:list_number]
      }

      it "should create student and respond with success" do
      end
    end

    after :each do
      patch :update, format: :json, params: { id: student.id, student: new_student_attributes }
      expected_response
    end
  end

  describe "POST #export_students" do
    let(:expected_response) {
      response_body = JSON.parse(response.body)
      expect(response).to have_http_status 422
      expect(response_body["errors"]).to eq ["Ingrese un email válido"]
    }

    context "when user email is not present" do
      let(:user_email) { "" }
      it "should respond with 422" do
      end
    end
    context "when user email is present" do
      context "and email is not valid" do
        let(:user_email) { "asd.asd.asd.cl" }
        it "should respond with 422" do
        end
      end
      context "and email is valid" do
        let(:user_email) { FFaker::Internet.email }
        let(:expected_response) {
          expect(response).to have_http_status 200
        }
        it "should respond with 200" do
        end
      end
    end

    after :each do
      post :export_students, params: { user_email: user_email }
      expected_response
    end
  end

  describe "POST #import_students" do
    context "when user does not enter email and file" do
      let(:user_email) { "" }
      let(:students_document) { "" }
      let(:expected_response) {
        response_body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(response_body["students_document"]).to eq ["Debe adjuntar un documento válido"]
        expect(response_body["user_email"]).to eq ["Ingrese un email válido"]
      }

      it "should respond with 422" do
      end
    end
    context "when user enters all data" do
      let(:user_email) { FFaker::Internet.email }
      let(:students_document) { Rack::Test::UploadedFile.new(Rails.root.join("spec/tmp/Nomina Estudiantes.xlsx"), "file/xlsx") }
      let(:expected_response) {
        response_body = JSON.parse(response.body)
        expect(response).to have_http_status 200
        expect(response_body["message"]).to eq "Se notificará via email cuando el archivo se procese"
      }

      it "should respond with success" do
      end
    end

    after :each do
      post :import_students, params: { user_email: user_email, students_document: students_document }
      expected_response
    end
  end

end

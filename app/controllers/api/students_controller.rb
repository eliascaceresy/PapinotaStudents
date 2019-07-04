class Api::StudentsController < ApplicationController

  def _search
    atts = params.except(:student, :action, :controller, :format).permit!
    response_elastic = Student.query(atts)
    render json: response_elastic.response
  end

  def index
  end

  def create
    @student = Student.new(student_params)
    if @student.save
      render json: @student.as_json, status: 201
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  private

    def student_params
      params.require(:student).permit(
        :list_number,
        personal_information_attributes: [
          :id,
          :first_name,
          :last_name,
          :identification_number
        ]
      )
    end

end

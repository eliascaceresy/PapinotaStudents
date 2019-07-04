class Api::StudentsController < ApplicationController
  before_action :set_student, only: [:update]
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
      render json: @student.as_indexed_json, status: 201
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  def update
    if @student.update(student_params)
      render json: @student.as_indexed_json, status: 200
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

    def set_student
      @student = Student.find(params[:id])
    end

end

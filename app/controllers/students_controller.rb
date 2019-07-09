class StudentsController < ApplicationController

  def index
    @route = api_students_path
  end

end

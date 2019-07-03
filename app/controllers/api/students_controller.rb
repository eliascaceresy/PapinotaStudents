class Api::StudentsController < ApplicationController

  def _search
    atts = params.except(:student, :action, :controller, :format).permit!
    response_elastic = Student.query(atts)
    render json: response_elastic.response
  end

  def index
  end

end

class StudentMailer < ApplicationMailer

  def send_report_to_user(user_email)
    students = Student.all.order(list_number: :asc)
    xlsx = render_to_string layout: false, handlers: [:axlsx], formats: [:xlsx], template: "students/export_report", locals: {students: students}
    attachment = Base64.encode64(xlsx)
    attachments["Nomina Estudiantes.xlsx"] = {mime_type: Mime[:xlsx], content: attachment, encoding: 'base64'}
    mail(to: user_email, subject: 'Nomina de Estudiantes')
  end

  def notify_result_import(user_email, students)
    @students = students
    if @students.any?
      xlsx = render_to_string layout: false, handlers: [:axlsx], formats: [:xlsx], template: "students/result_import", locals: {students: @students}
      attachment = Base64.encode64(xlsx)
      attachments["Resultado Importación Nómina Estudiantes.xlsx"] = {mime_type: Mime[:xlsx], content: attachment, encoding: 'base64'}
    end
    mail(to: user_email, subject: 'Resultado Importación Nómina Estudiantes')
  end
end

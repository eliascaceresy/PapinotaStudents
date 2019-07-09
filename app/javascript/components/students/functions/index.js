import { saveStudent, exportStudents, importStudents } from "./axios";

export function toggle() {
  this.setState({
    modal: !this.state.modal
  });
}

export function syncField(ev, fieldName) {
  let element = null;
  if (ev.target) {
    element = ev.target;
  } else {
    element = ev;
  }
  let value = element.value;
  let { student } = this.state;

  student[fieldName]["value"] = value;
  student[fieldName]["errors"] = [];
  this.setState({ student: student });
}

export function serializeData() {
  var formData = new FormData();
  const { student } = this.state;

  if (this.props.student) {
    formData.append(
      "student[personal_information_attributes][id]",
      this.props.student.personal_information.id
    );
  }

  formData.append("student[id]", student.id.value);
  formData.append("student[list_number]", student.list_number.value);
  formData.append(
    "student[personal_information_attributes][first_name]",
    student.first_name.value
  );
  formData.append(
    "student[personal_information_attributes][last_name]",
    student.last_name.value
  );
  formData.append(
    "student[personal_information_attributes][identification_number]",
    student.identification_number.value
  );

  return formData;
}

export function setErrors(errors) {
  let { student } = this.state;
  student.list_number.errors = errors["list_number"];
  student.first_name.errors = errors["personal_information.first_name"];
  student.last_name.errors = errors["personal_information.last_name"];
  student.identification_number.errors =
    errors["personal_information.identification_number"];

  this.setState({ student });
}

export function handleSubmit() {
  const _this = this;
  const data = this.serializeData();
  saveStudent(data, response => {
    if (response.status === 201) {
      _this.toggle();
      _this.props.reloadSearch();
    } else if (response.status === 200) {
      _this.toggle();
      _this.props.updateHit(response.data);
    } else if (response.status === 422) {
      _this.setErrors(response.data);
    }
  });
}

export function reloadSearch() {
  let searchkit = this.state.searchkit;
  setTimeout(function() {
    searchkit.reloadSearch();
  }, 1000);
}

export function updateHit(hit) {
  this.setState({ student: hit });
}

export function handleExport() {
  const _this = this;
  let { user_email } = this.state;
  var formData = new FormData();
  formData.append("user_email", user_email.value);
  exportStudents(formData, response => {
    if (response.status === 200) {
      _this.toggle();
    } else if (response.status === 422) {
      user_email.errors = response.data.errors;
      _this.setState({ user_email });
    }
  });
}

export function handleEmail(e) {
  let { user_email } = this.state;
  user_email.value = e.target.value;
  user_email.errors = [];
  this.setState({ user_email });
}

export function handleImport() {
  const _this = this;
  let { user_email, students_document } = this.state;
  var formData = new FormData();
  formData.append("user_email", user_email.value);
  if (students_document.value) {
    formData.append("students_document", students_document.value);
  }
  importStudents(formData, response => {
    if (response.status === 200) {
      _this.toggle();
    } else if (response.status === 422) {
      console.log(response);
      user_email.errors = response.data.user_email;
      students_document.errors = response.data.students_document;
      _this.setState({ user_email, students_document });
    }
  });
}

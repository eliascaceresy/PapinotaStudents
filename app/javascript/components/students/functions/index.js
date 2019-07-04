import { saveStudent } from "./axios";

export function toggle() {
  let { student } = this.state;

  if (!this.state.modal) {
    student.list_number.value = "";
    student.list_number.errors = [];
    student.first_name.value = "";
    student.first_name.errors = [];
    student.last_name.value = "";
    student.last_name.errors = [];
    student.identification_number.value = "";
    student.identification_number.errors = [];
  }

  this.setState({
    modal: !this.state.modal,
    student: student
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

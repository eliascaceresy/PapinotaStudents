import axios from "axios";

export function saveStudent(data, callback) {
  if (data.get("student[id]")) {
    var promise = axios({
      method: "patch",
      url: "/api/students/" + data.get("student[id]"),
      data: data,
      headers: {
        "X-CSRF-TOKEN": window.PapinotasStudents.token
      }
    });
  } else {
    var promise = axios({
      method: "post",
      url: "/api/students/",
      data: data,
      headers: {
        "X-CSRF-TOKEN": window.PapinotasStudents.token
      }
    });
  }
  promise
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback(err.response);
    });
}

export function exportStudents(data, callback) {
  var promise = axios({
    method: "post",
    url: "/api/students/export_students",
    data: data,
    headers: {
      "X-CSRF-TOKEN": window.PapinotasStudents.token
    }
  });
  promise
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback(err.response);
    });
}

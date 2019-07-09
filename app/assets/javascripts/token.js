//= require jquery
$(document).ready(function() {
  (function() {
    window.PapinotasStudents || (window.PapinotasStudents = {});
    window.PapinotasStudents.token = document.querySelector(
      'meta[name="csrf-token"]'
    ).content;
  }.call(this));
});

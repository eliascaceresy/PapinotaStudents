import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput
} from "mdbreact";
import FieldWrapper from "../../commons/field_wrapper";
import {
  toggle,
  syncField,
  handleSubmit,
  serializeData,
  setErrors
} from "../functions";

class StudentsForm extends Component {
  constructor(props) {
    super(props);

    const { student } = this.props;

    this.state = {
      modal: false,
      student: {
        id: {
          value: student ? student.id : ""
        },
        list_number: {
          value: student ? student.list_number : "",
          errors: []
        },
        first_name: {
          value: student ? student.personal_information.first_name : "",
          errors: []
        },
        last_name: {
          value: student ? student.personal_information.last_name : "",
          errors: []
        },
        identification_number: {
          value: student
            ? student.personal_information.identification_number
            : "",
          errors: []
        }
      }
    };

    this.toggle = toggle.bind(this);
    this.syncField = syncField.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.serializeData = serializeData.bind(this);
    this.setErrors = setErrors.bind(this);
  }

  render() {
    const { student } = this.state;
    return (
      <div>
        <div>
          <MDBBtn
            color={this.props.color}
            size="sm"
            outline={this.props.outline}
            onClick={this.toggle}
            disabled={this.props.disabled}
          >
            {this.props.buttonLabel}
          </MDBBtn>
        </div>
        <MDBModal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader
            toggle={this.toggle}
            className={"white-text bg-success"}
          >
            {this.props.title}
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol md="6">
                <FieldWrapper errors={student.first_name.errors}>
                  <MDBInput
                    label="Nombres"
                    type="text"
                    value={student.first_name.value}
                    onChange={e => this.syncField(e, "first_name")}
                  />
                </FieldWrapper>
              </MDBCol>
              <MDBCol md="6">
                <FieldWrapper errors={student.last_name.errors}>
                  <MDBInput
                    label="Apellidos"
                    type="text"
                    value={student.last_name.value}
                    onChange={e => this.syncField(e, "last_name")}
                  />
                </FieldWrapper>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <FieldWrapper
                  errors={student.identification_number.errors}
                  styleMargin={{ marginTop: "-20px" }}
                >
                  <MDBInput
                    label="RUT"
                    type="text"
                    value={student.identification_number.value}
                    onChange={e => this.syncField(e, "identification_number")}
                  />
                  <p
                    style={{
                      marginTop: "-23px",
                      fontSize: "10px",
                      color: "grey",
                      textAlign: "left"
                    }}
                  >
                    Formato: 11222333-4 (sin puntos)
                  </p>
                </FieldWrapper>
              </MDBCol>
              <MDBCol md="6">
                <FieldWrapper errors={student.list_number.errors}>
                  <MDBInput
                    label="N° Lista"
                    type="number"
                    value={student.list_number.value}
                    onChange={e => this.syncField(e, "list_number")}
                  />
                </FieldWrapper>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn size="sm" color="danger" onClick={this.toggle}>
              Cancelar
            </MDBBtn>
            <MDBBtn
              size="sm"
              color="success"
              onClick={this.handleSubmit}
              className="ml-2"
            >
              Guardar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default StudentsForm;

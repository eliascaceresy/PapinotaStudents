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
import Files from "react-butterfiles";
import FieldWrapper from "../../commons/field_wrapper";
import { toggle, handleImport, handleEmail } from "../functions";

class StudentsImport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      user_email: {
        value: "",
        errors: []
      },
      students_document: {
        value: "",
        errors: []
      }
    };

    this.toggle = toggle.bind(this);
    this.handleImport = handleImport.bind(this);
    this.handleEmail = handleEmail.bind(this);
  }

  render() {
    let { user_email, students_document } = this.state;
    return (
      <div>
        <div>
          <MDBBtn
            color="primary"
            size="sm"
            outline
            onClick={this.toggle}
            disabled={this.props.disabled}
          >
            Importar Estudiantes
          </MDBBtn>
        </div>
        <MDBModal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader
            toggle={this.toggle}
            className={"white-text bg-primary"}
          >
            Importar Nómina de Estudiantes
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol md="6">
                <FieldWrapper
                  errors={user_email.errors}
                  styleMargin={{ marginTop: "-15px" }}
                >
                  <MDBInput
                    label="Email"
                    type="email"
                    value={user_email.value}
                    onChange={e => this.handleEmail(e)}
                  />
                  <p
                    style={{
                      marginTop: "-25px",
                      fontSize: "12px",
                      color: "grey"
                    }}
                  >
                    Ingrese su email para notificar una vez procesado el
                    Documento
                  </p>
                </FieldWrapper>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Files
                  multiple={false}
                  onSuccess={files => {
                    students_document.value = files[0].src.file;
                    students_document.errors = [];
                    this.setState({
                      students_document
                    });
                  }}
                >
                  {({ browseFiles, getDropZoneProps }) => {
                    return (
                      <div className="grey-text">
                        <label>Nómina</label>
                        <div
                          {...getDropZoneProps({
                            style: {
                              width: 370,
                              minHeight: 40,
                              border: "2px lightgray dashed"
                            }
                          })}
                        >
                          <ol>
                            <li>{students_document.value.name}</li>
                          </ol>
                        </div>
                        <p
                          style={{
                            marginTop: "px",
                            fontSize: "12px",
                            color: "grey"
                          }}
                        >
                          Formatos permitidos: .csv, .xls, .xlsx
                        </p>
                        <FieldWrapper
                          errors={students_document.errors}
                          styleMargin={{ marginTop: "-20px" }}
                        />
                        <div className="mt-2">
                          <MDBBtn size="sm" color="info" onClick={browseFiles}>
                            Agregar Archivo
                          </MDBBtn>
                        </div>
                      </div>
                    );
                  }}
                </Files>
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
              onClick={this.handleImport}
              className="ml-2"
            >
              Importar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default StudentsImport;

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
import { toggle, handleExport, handleEmail } from "../functions";

class StudentsExport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      user_email: {
        value: "",
        errors: []
      }
    };

    this.toggle = toggle.bind(this);
    this.handleExport = handleExport.bind(this);
    this.handleEmail = handleEmail.bind(this);
  }

  render() {
    let { user_email } = this.state;
    return (
      <div>
        <div className={this.props.buttonPosition}>
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
            className={"white-text " + this.props.bg}
          >
            {this.props.title}
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol md="6">
                <p>Ingrese su email para enviar la Nómina de Estudiantes</p>
                <FieldWrapper errors={user_email.errors}>
                  <MDBInput
                    label="Email"
                    type="email"
                    value={user_email.value}
                    onChange={e => this.handleEmail(e)}
                  />
                </FieldWrapper>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn size="sm" color="danger" onClick={this.toggle}>
              Cancelar
            </MDBBtn>
            <MDBBtn size="sm" color="success" onClick={this.handleExport}>
              Enviar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default StudentsExport;

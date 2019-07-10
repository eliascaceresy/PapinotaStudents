import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import PropTypes from "prop-types";
import StudentsForm from "./form";
import { updateHit } from "../functions";

class StudentsHit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: this.props.hit._source
    };

    this.updateHit = updateHit.bind(this);
  }

  render() {
    const { student } = this.state;
    return (
      <MDBCol xs="6" sm="6" md="4" lg="3">
        <MDBCard className="mt-3 card-hover-shadow">
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="12">
                <h4>{student.personal_information.full_name}</h4>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                RUT: {student.personal_information.identification_number}
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">N° Lista: {student.list_number}</MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <StudentsForm
                  color="warning"
                  outline={true}
                  buttonLabel="Editar"
                  bg="bg-warning"
                  title="Editar Estudiante"
                  student={student}
                  updateHit={this.updateHit}
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

StudentsHit.propTypes = {
  hit: PropTypes.object.isRequired
};

export default StudentsHit;

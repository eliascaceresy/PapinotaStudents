import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import PropTypes from "prop-types";

class StudentsHit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: this.props.hit._source
    };
  }

  render() {
    const { student } = this.state;
    return (
      <MDBCol md="4" lg="4" xs="6">
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

import React, { Component } from "react";
import { MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import _ from "lodash";
import StudentsHit from "./hit";

class StudentsHits extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MDBRow className="text-center">
        {_.map(this.props.hits, hit => (
          <StudentsHit key={hit._id} hit={hit} />
        ))}
      </MDBRow>
    );
  }
}

StudentsHits.propTypes = {
  hits: PropTypes.array
};

export default StudentsHits;

import React, { Component } from "react";
import {
  SearchkitManager,
  SearchkitProvider,
  NoHits,
  Hits,
  Pagination,
  SearchBox
} from "searchkit";
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import StudentsHits from "./hits";

class StudentsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchkit: new SearchkitManager(this.props.route, {
        httpHeaders: { "X-CSRF-TOKEN": window.PapinotasStudents.token }
      })
    };
  }
  render() {
    return (
      <SearchkitProvider searchkit={this.state.searchkit}>
        <MDBContainer className="mt-5">
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  <h3>Listado de Estudiantes</h3>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="12" md="8">
                      <SearchBox
                        autofocus={true}
                        searchOnChange={true}
                        translations={{ "searchbox.placeholder": "Buscar" }}
                        queryFields={[
                          "personal_information.first_name",
                          "personal_information.last_name"
                        ]}
                        prefixQueryFields={[
                          "personal_information.identification_number",
                          "personal_information.first_name",
                          "personal_information.last_name",
                          "personal_information.full_name"
                        ]}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <Hits hitsPerPage={12} listComponent={<StudentsHits />} />
          <NoHits
            translations={{
              "NoHits.NoResultsFound":
                "No se encontraron resultados para {query}",
              "NoHits.DidYouMean": "Busqueda para {suggestion}",
              "NoHits.SearchWithoutFilters":
                "Busqueda para {query} sin filtros",
              "NoHits.NoResultsFoundDidYouMean":
                "No se encontraron resultados para {query}. Quisiste decir {suggestion} ?"
            }}
          />
          <MDBRow className="mt-3">
            <MDBCol md="12">
              <Pagination
                showNumbers={true}
                translations={{
                  "pagination.previous": "Anterior",
                  "pagination.next": "Siguiente"
                }}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </SearchkitProvider>
    );
  }
}

StudentsIndex.propTypes = {
  route: PropTypes.string.isRequired
};

export default StudentsIndex;

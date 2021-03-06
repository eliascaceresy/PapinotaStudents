import React, { Component } from "react";
import {
  SearchkitManager,
  SearchkitProvider,
  NoHits,
  Hits,
  Pagination,
  SearchBox,
  SortingSelector,
  HitsStats
} from "searchkit";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtnGroup,
  MDBBtn
} from "mdbreact";
import PropTypes from "prop-types";
import StudentsHits from "./hits";
import StudentsForm from "./form";
import StudentsExport from "./export";
import StudentsImport from "./import";
import Notifications from "../../commons/notifications";
import { reloadSearch, showNotifications } from "../functions";

class StudentsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchkit: new SearchkitManager(this.props.route, {
        httpHeaders: { "X-CSRF-TOKEN": window.PapinotasStudents.token }
      })
    };

    this.reloadSearch = reloadSearch.bind(this);
    this.showNotifications = showNotifications.bind(this);
  }
  render() {
    return (
      <SearchkitProvider searchkit={this.state.searchkit}>
        <MDBContainer className="mt-5">
          <Notifications ref="notifications" />
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="12" md="8">
                      <h3>Listado de Estudiantes</h3>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="8" md="8">
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
                      <HitsStats
                        translations={{
                          "hitstats.results_found":
                            "{hitCount} resultados encontrados en {timeTaken}ms"
                        }}
                      />
                    </MDBCol>
                    <MDBCol sm="1" md="1" />
                    <MDBCol sm="3" md="2">
                      <SortingSelector
                        options={[
                          {
                            label: "Fecha creación reciente",
                            field: "created_at",
                            order: "desc"
                          },
                          {
                            label: "Fecha creación antigua",
                            field: "created_at",
                            order: "asc"
                          }
                        ]}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol ms="12">
              <MDBCard>
                <MDBCardBody>
                  <MDBBtnGroup>
                    <StudentsForm
                      color="success"
                      outline={true}
                      buttonLabel="Agregar Estudiante"
                      bg="bg-warning"
                      title="Agregar Estudiante"
                      reloadSearch={this.reloadSearch}
                      showNotifications={this.showNotifications}
                    />
                    <StudentsExport
                      showNotifications={this.showNotifications}
                    />
                    <StudentsImport
                      showNotifications={this.showNotifications}
                    />
                  </MDBBtnGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <Hits hitsPerPage={16} listComponent={<StudentsHits />} />
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

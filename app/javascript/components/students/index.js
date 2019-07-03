import React, { Component } from "react";
import {
  SearchkitManager,
  SearchkitProvider,
  NoHits,
  Hits,
  Pagination
} from "searchkit";
import PropTypes from "prop-types";

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
        <div>
          <Hits hitsPerPage={9} />
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
          <Pagination
            showNumbers={true}
            translations={{
              "pagination.previous": "Anterior",
              "pagination.next": "Siguiente"
            }}
          />
        </div>
      </SearchkitProvider>
    );
  }
}

StudentsIndex.propTypes = {
  route: PropTypes.string.isRequired
};

export default StudentsIndex;

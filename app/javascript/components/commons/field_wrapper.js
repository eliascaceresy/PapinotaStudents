import React, { Component } from "react";

class FieldWrapper extends Component {
  render() {
    const { errors, children, isVisible } = this.props;
    let display = isVisible ? "block" : isVisible == false ? "none" : "block";

    if (errors && errors.length > 0) {
      return (
        <div style={{ display }}>
          {this.props.children}
          <ul className="errors_list clearfix" style={this.props.styleMargin}>
            {errors.map(function(error, index) {
              return <li key={index}>{error}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div style={{ display }}>{this.props.children}</div>;
    }
  }
}

export default FieldWrapper;

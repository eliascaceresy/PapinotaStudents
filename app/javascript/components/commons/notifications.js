import React, { Component } from "react";
import ReactNotification from "react-notifications-component";
import PropTypes from "prop-types";

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification(title, message, type) {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 5000 },
      dismissable: { click: true }
    });
  }

  render() {
    return <ReactNotification ref={this.notificationDOMRef} />;
  }
}

Notifications.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string
};

export default Notifications;

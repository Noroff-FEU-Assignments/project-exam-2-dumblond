import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function DisplayMessage({ messageType, message }) {
  return <Alert variant={messageType}>{message}</Alert>;
}

DisplayMessage.propTypes = {
  messageType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default DisplayMessage;

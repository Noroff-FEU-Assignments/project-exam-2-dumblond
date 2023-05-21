import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

function Loading({ animation = "grow" }) {
  return (
    <Spinner animation={animation} role="status">
      <span className="visually-hidden">The page is loading</span>
    </Spinner>
  );
}

Loading.defaultProps = {
  animation: "grow",
};

Loading.propTypes = {
  animation: PropTypes.oneOf(["grow", "border"]),
};

export default Loading;

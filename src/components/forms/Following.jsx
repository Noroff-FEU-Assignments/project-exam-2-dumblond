import { useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Following({ buttonText, title, people }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          {people.map(function (person) {
            return (
              <div
                key={person.name}
                className="my-3 border p-2 rounded bg-light"
              >
                <Link to={`/profile/${person.name}`} reloadDocument>
                  <Image className="card-img me-4" src={person.avatar} />
                  {person.name}
                </Link>
              </div>
            );
          })}
          <Button variant="secondary" onClick={handleClose} className="m-2">
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Following;

Following.propTypes = {
  buttonText: PropTypes.string,
  title: PropTypes.string,
  people: PropTypes.array,
};

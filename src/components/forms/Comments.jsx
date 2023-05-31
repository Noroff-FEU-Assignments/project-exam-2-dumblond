import { Form } from "react-bootstrap";

function Comments() {
  return (
    <Form.Control
      className="my-3"
      type="text"
      placeholder="Make a comment to the post"
    />
  );
}

export default Comments;

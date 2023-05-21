import { Card, CloseButton, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function PostDetailItem({ post }) {
  const navigate = useNavigate();
  return (
    <Col>
      <Card>
        <Card.Img variant="top"></Card.Img>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <CloseButton
            aria-label="Close detail page"
            className="mb-3"
            onClick={function () {
              navigate("/");
            }}
          />
          <Card.Img
            variant="top"
            src={post.author.avatar}
            alt={`${post.author.name}'s avatar`}
          ></Card.Img>
          <p> {post.body}</p>
          <p> {post.author.name}</p>
          <p> {post.author.email}</p>
        </Card.Body>
      </Card>
    </Col>
  );
}

PostDetailItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default PostDetailItem;

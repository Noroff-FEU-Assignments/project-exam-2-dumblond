import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Post({ post }) {
  return (
    <Col>
      <Card>
        <Card.Img variant="top"></Card.Img>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Img
            variant="top"
            src={post.author.avatar}
            alt={`${post.author.name}'s avatar`}
          ></Card.Img>
          <h3> {post.body}</h3>
          <h3> {post.author.name}</h3>
          <h3> {post.author.email}</h3>
          <Link to={`/detail/${post.id}`} className="stretched-link" />
        </Card.Body>
      </Card>
    </Col>
  );
}

Post.propTypes = {
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

export default Post;

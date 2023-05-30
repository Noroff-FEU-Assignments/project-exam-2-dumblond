import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";

function Posts({ post }) {
  const avatar = post.author.avatar ? post.author.avatar : userAvatar;

  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Img
            src={avatar}
            alt={`${post.author.name}'s avatar`}
          ></Card.Img>
          <h2> {post.author.name}</h2>
          <Card.Title>{post.title}</Card.Title>
          <p> {post.body}</p>
          <Image fluid src={post.media}></Image>
          <p>Created: {post.created}</p>
          <Link
            to={`/post/${post.id}`}
            className="btn btn-primary text-light my-3"
            type="button"
          >
            View post
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

Posts.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    body: PropTypes.string,
    media: PropTypes.string,
    created: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default Posts;

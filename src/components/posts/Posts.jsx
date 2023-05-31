import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import { formatDistance } from "date-fns";
import Comments from "../forms/Comments";

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
          {post.media && (
            <Image fluid src={post.media} alt={`${post.title}'s image`} />
          )}
          <p>
            Created:{" "}
            {formatDistance(new Date(post.created), new Date(), {
              addSuffix: true,
            })}
          </p>
          <Link
            to={`/post/${post.id}`}
            className="btn btn-primary text-light"
            type="button"
          >
            View post
          </Link>
          <Comments />
          {post.comments.length > 0 && (
            <Card.Footer>
              {post.comments.map(function (comment) {
                return (
                  <div key={comment.id} className="border-bottom mb-4">
                    <div className="d-flex">
                      <Card.Img src={comment.author.avatar} />
                      <p className="m-3">{comment.author.name}</p>
                    </div>
                    <p> {comment.body}</p>
                  </div>
                );
              })}
            </Card.Footer>
          )}
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
    comments: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      map: PropTypes.string,
      length: PropTypes.number,
    }),
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default Posts;

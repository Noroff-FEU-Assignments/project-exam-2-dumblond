import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import { formatDistance } from "date-fns";
import Comments from "../forms/Comments";
import Reaction from "../forms/Reaction";

function Posts({ post, refreshPosts }) {
  const avatar = post.author.avatar ? post.author.avatar : userAvatar;

  return (
    <Col>
      <Card>
        <Card.Body>
          <Link to={`/profile/${post.author.name}`}>
            <Card.Img
              src={avatar}
              alt={`${post.author.name}'s avatar`}
            ></Card.Img>
            <h2> {post.author.name}</h2>
          </Link>
          <Card.Title>{post.title}</Card.Title>
          <div className="d-flex mb-3">
            {post.reactions.length > 0 &&
              post.reactions.map((reaction) => (
                <div key={reaction.symbol}>
                  {reaction.symbol}
                  {reaction.count}
                </div>
              ))}
          </div>
          <p> {post.body}</p>
          {post.media && (
            <Image
              className="post-media"
              src={post.media}
              alt={`${post.title}'s image`}
            />
          )}
          <p>
            Created:{" "}
            {formatDistance(new Date(post.created), new Date(), {
              addSuffix: true,
            })}
          </p>
          <Link
            to={`/post/${post.id}`}
            className="btn btn-primary text-light mb-3"
            type="button"
          >
            View post
          </Link>
          <div className="d-flex justify-content-between">
            <Reaction post={post} getPosts={refreshPosts} />
          </div>
          <Comments id={post.id} refreshPosts={refreshPosts} />

          {post.comments.length > 0 && (
            <Card.Footer>
              {post.comments.map(function (comment) {
                return (
                  <div key={comment.id} className="border-bottom mb-4">
                    <div>
                      <Link to={`/profile/${comment.author.name}`}>
                        <Card.Img
                          src={comment.author.avatar}
                          alt={`${comment.author.avatar}'s avatar`}
                        />
                        <p className="mt-2">{comment.author.name}</p>
                      </Link>
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
    comments: PropTypes.array,
    reactions: PropTypes.array,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  refreshPosts: PropTypes.func,
};

export default Posts;

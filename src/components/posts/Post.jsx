import { Breadcrumb, Card, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import userBanner from "../../assets/banner.svg";
import Header from "../common/Header";
import Comments from "../forms/Comments";
import Reaction from "../forms/Reaction";
import { Link } from "react-router-dom";

function Post({ post, getPost }) {
  const avatar = post.author.avatar ? post.author.avatar : userAvatar;
  const banner = post.author.banner ? post.author.banner : userBanner;

  return (
    <Col>
      <Breadcrumb className="pt-3">
        <Breadcrumb.Item href="/posts">Latest Posts</Breadcrumb.Item>
        <Breadcrumb.Item active className="text-dark">
          {post.author.name}`s post
        </Breadcrumb.Item>
      </Breadcrumb>
      <Header title={`${post.author.name}'s post`} />
      <Card>
        <Card.Img
          variant="top"
          src={banner}
          className="profile-banner"
        ></Card.Img>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Link to={`/profile/${post.author.name}`}>
              <Card.Img
                src={avatar}
                alt={`${post.author.name}'s avatar`}
              ></Card.Img>
              <p> {post.author.name}</p>
            </Link>
          </div>

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
            ></Image>
          )}
          <p> {post.author.email}</p>
          <div className="d-flex">
            <Reaction post={post} getPosts={getPost} />
          </div>

          <Comments id={post.id} refreshPosts={getPost} />
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

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    body: PropTypes.string,
    media: PropTypes.string,
    comments: PropTypes.array,
    reactions: PropTypes.array,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      email: PropTypes.string,
      banner: PropTypes.string,
    }),
  }),
  getPost: PropTypes.func,
};

export default Post;

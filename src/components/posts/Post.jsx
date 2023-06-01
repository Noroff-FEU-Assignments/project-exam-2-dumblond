import { Breadcrumb, Card, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import userBanner from "../../assets/banner.svg";
import Header from "../common/Header";
import Comments from "../forms/Comments";
import Reaction from "../forms/Reaction";

function Post({ post, getPost }) {
  const avatar = post.author.avatar ? post.author.avatar : userAvatar;
  const banner = post.author.banner ? post.author.banner : userBanner;

  return (
    <Col>
      <Breadcrumb className="pt-3">
        <Breadcrumb.Item href="/posts">Latest Posts</Breadcrumb.Item>
        <Breadcrumb.Item active>{post.author.name}`s post</Breadcrumb.Item>
      </Breadcrumb>
      <Header title={`${post.author.name}'s post`} />
      <Card>
        <Card.Img variant="top" src={banner}></Card.Img>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Img
              src={avatar}
              alt={`${post.author.name}'s avatar`}
            ></Card.Img>
          </div>
          <Card.Title>{post.title}</Card.Title>
          <p> {post.body}</p>
          {post.media && (
            <Image fluid src={post.media} alt={`${post.title}'s image`}></Image>
          )}
          <p> {post.author.name}</p>
          <p> {post.author.email}</p>
          <div className="d-flex justify-content-end">
            <Reaction post={post} getPosts={getPost} />
          </div>

          <Comments id={post.id} refreshPosts={getPost} />
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

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    body: PropTypes.string,
    media: PropTypes.string,
    comments: PropTypes.array,
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

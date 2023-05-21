import { Card, CloseButton, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import userBanner from "../../assets/banner.svg";

function PostDetailItem({ post }) {
  const avatar = post.author.avatar ? post.author.avatar : userAvatar;
  const banner = post.author.banner ? post.author.banner : userBanner;
  const navigate = useNavigate();

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={banner}></Card.Img>
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
            src={avatar}
            alt={`${post.author.name}'s avatar`}
          ></Card.Img>
          <p> {post.body}</p>
          <Image fluid src={post.media}></Image>
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
    media: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      email: PropTypes.string,
      banner: PropTypes.string,
    }),
  }),
};

export default PostDetailItem;

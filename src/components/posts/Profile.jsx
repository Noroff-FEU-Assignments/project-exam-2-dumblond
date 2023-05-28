import { Card, CloseButton, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import userBanner from "../../assets/banner.svg";

function Profile({ profile }) {
  const avatar = profile.avatar ? profile.avatar : userAvatar;
  const banner = profile.banner ? profile.banner : userBanner;
  const navigate = useNavigate();

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={banner}></Card.Img>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Img src={avatar} alt={`${profile.name}'s avatar`}></Card.Img>
            <CloseButton
              aria-label="Close detail page"
              className="mb-3"
              onClick={function () {
                navigate("/");
              }}
            />
          </div>
          <Card.Title>{profile.title}</Card.Title>
          <p> {profile.body}</p>
          <Image fluid src={profile.media}></Image>
          <p> {profile.name}</p>
          <p> {profile.email}</p>
        </Card.Body>
      </Card>
    </Col>
  );
}

Profile.propTypes = {
  profile: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    body: PropTypes.string,
    media: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
    banner: PropTypes.string,
  }),
};

export default Profile;

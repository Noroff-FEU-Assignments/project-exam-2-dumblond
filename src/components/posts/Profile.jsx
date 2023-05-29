import { Card, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import userBanner from "../../assets/banner.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import EditProfile from "../forms/EditProfile";

function Profile({ profile, displayButton, getProfile }) {
  const [auth] = useContext(AuthContext);
  const avatar = profile.avatar ? profile.avatar : userAvatar;
  const banner = profile.banner ? profile.banner : userBanner;

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={banner}></Card.Img>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Img src={avatar} alt={`${profile.name}'s avatar`}></Card.Img>
          </div>
          <Card.Title>{profile.title}</Card.Title>
          <p> {profile.body}</p>
          <Image fluid src={profile.media}></Image>
          <p> {profile.name}</p>
          <p> {profile.email}</p>
          {displayButton && (
            <Link
              to={`/profile/${profile.name}`}
              className="btn btn-primary text-light my-3"
              type="button"
            >
              View profile
            </Link>
          )}
          {auth.name === profile.name && (
            <EditProfile profile={profile} getProfile={getProfile} />
          )}
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
  displayButton: PropTypes.bool,
  getProfile: PropTypes.func,
};

export default Profile;

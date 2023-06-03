import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import userAvatar from "../../assets/avatar.svg";
import userBanner from "../../assets/banner.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import EditProfile from "../forms/EditProfile";
import Follow from "../forms/Follow";

function Profile({ profile, displayButton, getProfile }) {
  const [auth] = useContext(AuthContext);
  const avatar = profile.avatar ? profile.avatar : userAvatar;
  const banner = profile.banner ? profile.banner : userBanner;

  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          src={banner}
          alt={`${profile.name}'s image`}
        ></Card.Img>

        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Img src={avatar} alt={`${profile.name}'s avatar`}></Card.Img>
          </div>
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
          {auth.name !== profile.name && !displayButton && (
            <Follow profile={profile} />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
    banner: PropTypes.string,
    posts: PropTypes.array,
  }),
  displayButton: PropTypes.bool,
  getProfile: PropTypes.func,
};

export default Profile;

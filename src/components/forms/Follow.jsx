import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { profileAPI } from "../../constants/api";
import { Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import DisplayMessage from "../common/DisplayMessage";

function Follow({ profile, getProfile }) {
  const [auth] = useContext(AuthContext);
  let URL;
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(
    profile.followers.find(function (user) {
      return user.name === auth.name;
    })
  );

  if (following) {
    URL = `${profileAPI}/${profile.name}/unfollow`;
  } else {
    URL = `${profileAPI}/${profile.name}/follow`;
  }

  async function toggleFollow() {
    try {
      await axios.put(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setFollowing(!following);
      getProfile();
    } catch (error) {
      setError(error.toString());
    }
  }

  if (error) {
    return <DisplayMessage messageType="danger" message={error} />;
  }

  return (
    <Button variant="secondary text-light" onClick={() => toggleFollow()}>
      {following ? "Unfollow" : "+ Follow"}
    </Button>
  );
}

export default Follow;

Follow.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    followers: PropTypes.array,
  }),
  getProfile: PropTypes.func,
};

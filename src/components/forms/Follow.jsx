import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { profileAPI } from "../../constants/api";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import DisplayMessage from "../common/DisplayMessage";

function Follow({ profile }) {
  const { param } = useParams();
  const [auth] = useContext(AuthContext);
  let URL = profileAPI + "/" + `${param}/follow`;
  const [error, setError] = useState(null);

  const following = profile.followers.find((user) => {
    return user.name === auth.name;
  });

  if (following) {
    URL = `${profileAPI}/${profile.name}/unfollow`;
  } else {
    URL = `${profileAPI}/${profile.name}/follow`;
  }

  async function toggleFollow() {
    try {
      await axios({
        method: "put",
        url: URL,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        data: {},
      });
    } catch (error) {
      setError(error.toString());
    }
  }

  if (error) {
    return <DisplayMessage messageType="danger" message={error} />;
  }

  return (
    <Button variant="secondary" onClick={() => toggleFollow()}>
      {following ? "Unfollow" : "+ Follow"}
    </Button>
  );
}

export default Follow;

Follow.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    followers: PropTypes.any,
  }),
};

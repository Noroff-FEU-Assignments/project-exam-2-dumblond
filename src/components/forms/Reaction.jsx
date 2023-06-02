import { API } from "../../constants/api";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useState } from "react";
import DisplayMessage from "../common/DisplayMessage";
import AuthContext from "../../context/AuthContext";
import { GithubSelector } from "@charkour/react-reactions";

function Reaction({ post, getPosts }) {
  const [auth] = useContext(AuthContext);
  const URL = API + "posts/" + post.id + "/react/";
  const [error, setError] = useState(null);

  function likePost(icon) {
    try {
      axios.put(
        URL + icon,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      getPosts();
    } catch (error) {
      setError(error.toString());
    }
  }

  if (error) {
    return <DisplayMessage messageType="danger" message={error} />;
  }

  return (
    <>
      <div className="d-flex">
        <GithubSelector
          reactions={["👋", "👌", "😊", "🎉", "😅", "❤️"]}
          onSelect={function (icon) {
            likePost(icon);
          }}
        />
      </div>
    </>
  );
}

export default Reaction;

Reaction.propTypes = {
  getPosts: PropTypes.func,
  post: PropTypes.shape({
    _count: PropTypes.shape({
      reactions: PropTypes.number,
      comments: PropTypes.number,
    }),
    id: PropTypes.number,
  }),
};

import { Button } from "react-bootstrap";
import { API } from "../../constants/api";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useState } from "react";
import DisplayMessage from "../common/DisplayMessage";
import AuthContext from "../../context/AuthContext";

function Reaction({ post, getPosts }) {
  const [auth] = useContext(AuthContext);
  const URL = API + "posts/" + post.id + "/react/👏";
  const [error, setError] = useState(null);

  function likePost() {
    try {
      axios.put(
        URL,
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
    <Button variant="light" onClick={likePost}>
      &#x1F44F; {post._count.reactions > 0 ? post._count.reactions : ""}
    </Button>
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

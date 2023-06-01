import { useContext, useEffect, useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import Loading from "../common/Loading";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import PostDetailItem from "../posts/Post";
import DisplayMessage from "../common/DisplayMessage";

function PostDetail() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  let navigate = useNavigate();

  const { param } = useParams();

  if (!param) {
    navigate("/");
  }

  const URL =
    API + `posts/${param}?_reactions=true&_author=true&_comments=true`;

  const getPost = async function () {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (response.status === 200) {
        setPost(response.data);
      } else {
        setError("Faen!");
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(function () {
    getPost();
  }, []);

  if (loading) {
    return <Loading animation="border" />;
  }

  if (error) {
    return <DisplayMessage messageType="danger" message="Helvete" />;
  }

  return <PostDetailItem post={post} getPost={getPost} />;
}

export default PostDetail;

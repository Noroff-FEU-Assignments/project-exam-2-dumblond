import { Container, Row } from "react-bootstrap";
import Header from "../common/Header";
import { useContext, useEffect, useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import Loading from "../common/Loading";
import DisplayMessage from "../common/DisplayMessage";
import Post from "../posts/Post";
import AuthContext from "../../context/AuthContext";

function LatestPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  useEffect(function () {
    const URL = API + "posts?_reactions=true&_author=true&_comments=true";
    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        console.log(response);
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          setError("Faen!");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading animation="border" />;
  }

  if (error) {
    return <DisplayMessage messageType="danger" message="Helvete" />;
  }

  return (
    <>
      <Container>
        <Header title="Latest posts" />
        <Row xs={1} md={3} className="g-4">
          {posts.map(function (post) {
            return <Post key={post.id} post={post} />;
          })}
        </Row>
      </Container>
    </>
  );
}

export default LatestPosts;

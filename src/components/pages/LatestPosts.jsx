import { Col, Container, Row } from "react-bootstrap";
import Header from "../common/Header";
import { useContext, useEffect, useState } from "react";
import { API } from "../../constants/api";
import axios from "axios";
import Loading from "../common/Loading";
import DisplayMessage from "../common/DisplayMessage";
import Posts from "../posts/Posts";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function LatestPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  const URL = API + "posts?_reactions=true&_author=true&_comments=true";
  const fetchPosts = async function () {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (response.status === 200) {
        setPosts(response.data);
      } else {
        setError("Something is wrong");
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };
  useEffect(
    function () {
      fetchPosts();
    },
    [auth.accessToken]
  );

  if (loading) {
    return <Loading animation="border" />;
  }

  if (error) {
    return <DisplayMessage messageType="danger" message="Something is wrong" />;
  }

  return (
    <>
      <Container>
        <Header title="Latest posts" />
        <Row>
          <Col className="d-grid col-8 col-md-6 mx-auto">
            <Link
              to="/makepost"
              className="btn btn-primary text-light m-3"
              type="button"
            >
              Make a post
            </Link>
          </Col>
        </Row>
        <Row xs={1} className="g-4">
          {posts.map(function (post) {
            return (
              <Posts key={post.id} post={post} refreshPosts={fetchPosts} />
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default LatestPosts;

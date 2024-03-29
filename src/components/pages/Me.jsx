import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import Loading from "../common/Loading";
import DisplayMessage from "../common/DisplayMessage";
import { API, profileAPI } from "../../constants/api";
import Profile from "../posts/Profile";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import Header from "../common/Header";
import EditPost from "../forms/EditPost";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import Following from "../forms/Following";

function Me() {
  const [auth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL =
    profileAPI +
    "/" +
    auth.name +
    "?_posts=true&_following=true&_followers=true";

  function deletePost(id) {
    const deleteButton = confirm("Are you sure you want to delete the post?");

    if (deleteButton) {
      try {
        axios.delete(API + "posts/" + id, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        getProfile();
      } catch (error) {
        setError(error.toString());
      }
    }
  }

  const getProfile = async function () {
    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          setProfile(response.data);
        } else {
          setError("Something is wrong");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  };

  useEffect(function () {
    getProfile();
  }, []);

  if (loading) {
    return <Loading animation="border" />;
  }

  if (error) {
    return <DisplayMessage messageType="danger" message="Something is wrong" />;
  }

  return (
    <>
      <Breadcrumb className="pt-3">
        <Breadcrumb.Item href="/profiles">Profiles</Breadcrumb.Item>
        <Breadcrumb.Item active className="text-dark">
          My profile
        </Breadcrumb.Item>
      </Breadcrumb>
      <Header title="My profile" />
      <div className="mb-4 d-flex gap-4 justify-content-center">
        <Following
          buttonText={` ${profile._count.followers} Followers`}
          title="My Followers"
          people={profile.followers}
        />
        <Following
          buttonText={`Following ${profile._count.following}`}
          title="I Follow"
          people={profile.following}
        />
      </div>
      <Profile profile={profile} getProfile={getProfile} />
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
      <Container>
        {profile.posts.length > 0 ? (
          <h2 className="text-center pt-4">{profile.name}&apos;s posts</h2>
        ) : (
          <></>
        )}
        {profile.posts.map(function (post) {
          return (
            <div key={post.id}>
              <Card className="my-3">
                <Card.Body>
                  <Link to={`/post/${post.id}`}>
                    <h3>{post.title} </h3>
                  </Link>
                  <p>{post.body}</p>
                  {post.media && (
                    <Image
                      fluid
                      src={post.media}
                      className="mb-3"
                      alt={`${post.title}'s image`}
                    ></Image>
                  )}
                  <p>
                    Created:{" "}
                    {formatDistance(new Date(post.created), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                  <div className="d-flex justify-content-between">
                    <EditPost post={post} getPost={getProfile} />
                    <Button
                      variant="danger"
                      onClick={function () {
                        deletePost(post.id);
                      }}
                    >
                      Delete post
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Container>
    </>
  );
}

export default Me;

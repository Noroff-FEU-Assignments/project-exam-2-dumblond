import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import Loading from "../common/Loading";
import DisplayMessage from "../common/DisplayMessage";
import { profileAPI } from "../../constants/api";
import Profile from "../posts/Profile";
import { Breadcrumb, Card, Container, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Header from "../common/Header";
import Following from "../forms/Following";

function ProfileDetail() {
  const [auth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { param } = useParams();

  const URL =
    profileAPI + "/" + `${param}?_posts=true&_followers=true&_following=true`;

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

  useEffect(function () {
    fetchData();
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
          {profile.name}`s profile
        </Breadcrumb.Item>
      </Breadcrumb>
      <Header title={`${profile.name}'s profile`} />
      <div className="mb-4 d-flex gap-4 justify-content-center">
        <Following
          buttonText={` ${profile._count.followers} Followers`}
          title={` ${profile.name} followers`}
          people={profile.followers}
        />
        <Following
          buttonText={`Following ${profile._count.following}`}
          title={` ${profile.name} following`}
          people={profile.following}
        />
      </div>
      <Profile profile={profile} getProfile={fetchData} />
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
                      className="post-media mb-3"
                      src={post.media}
                      alt={`${post.title}'s image`}
                    ></Image>
                  )}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Container>
    </>
  );
}

export default ProfileDetail;
